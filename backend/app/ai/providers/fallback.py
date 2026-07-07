import logging
from typing import Any, AsyncGenerator, List, Optional
from .base import BaseProvider
from .models import Prompt, AIResponse, ModelConfig, GenerationConfig, SafetyConfig, RetryConfig, TimeoutConfig

logger = logging.getLogger(__name__)

class RobustFallbackProvider(BaseProvider):
    """
    Tries a sequence of providers in order. If the primary provider fails
    (e.g., due to a 429 Rate Limit), it seamlessly falls back to the next provider.
    """
    
    provider_name = "robust_fallback"

    def __init__(self, providers: List[BaseProvider]):
        super().__init__()
        if not providers:
            raise ValueError("RobustFallbackProvider requires at least one provider.")
        self.providers = providers

    async def generate(
        self, 
        prompt: Prompt, 
        model_config: Optional[ModelConfig] = None, 
        gen_config: Optional[GenerationConfig] = None, 
        safety_config: Optional[SafetyConfig] = None, 
        retry_config: Optional[RetryConfig] = None, 
        timeout_config: Optional[TimeoutConfig] = None
    ) -> AIResponse:
        last_exception = None
        for provider in self.providers:
            try:
                logger.info(f"Attempting generation with provider: {provider.provider_name}")
                return await provider.generate(
                    prompt, model_config, gen_config, safety_config, retry_config, timeout_config
                )
            except Exception as e:
                logger.warning(f"Provider {provider.provider_name} failed: {e}. Attempting next fallback...")
                last_exception = e
                
        # If all providers fail, raise the last exception
        raise last_exception

    async def generate_structured(
        self, 
        prompt: Prompt, 
        schema: Any, 
        model_config: Optional[ModelConfig] = None, 
        gen_config: Optional[GenerationConfig] = None, 
        safety_config: Optional[SafetyConfig] = None, 
        retry_config: Optional[RetryConfig] = None, 
        timeout_config: Optional[TimeoutConfig] = None
    ) -> AIResponse:
        last_exception = None
        for provider in self.providers:
            try:
                logger.info(f"Attempting structured generation with provider: {provider.provider_name}")
                return await provider.generate_structured(
                    prompt, schema, model_config, gen_config, safety_config, retry_config, timeout_config
                )
            except Exception as e:
                logger.warning(f"Provider {provider.provider_name} failed: {e}. Attempting next fallback...")
                last_exception = e
                
        raise last_exception

    async def stream(self, prompt: Prompt, model_config: ModelConfig) -> AsyncGenerator[str, None]:
        # Fallback for streaming is harder to implement seamlessly since it yields.
        # We will attempt the first provider only for streaming.
        return await self.providers[0].stream(prompt, model_config)

    async def health_check(self) -> bool:
        # Healthy if at least one provider is healthy
        for provider in self.providers:
            if await provider.health_check():
                return True
        return False

    def count_tokens(self, prompt: Prompt, model_name: str) -> int:
        return self.providers[0].count_tokens(prompt, model_name)

    def estimate_cost(self, prompt_tokens: int, completion_tokens: int, model_name: str) -> float:
        return self.providers[0].estimate_cost(prompt_tokens, completion_tokens, model_name)

    def validate_request(self, prompt: Prompt, model_config: ModelConfig) -> bool:
        return self.providers[0].validate_request(prompt, model_config)

    async def embed(self, texts: list[str], model_name: str) -> list[list[float]]:
        # Find the first provider that supports embedding
        for provider in self.providers:
            try:
                return await provider.embed(texts, model_name)
            except NotImplementedError:
                continue
            except Exception as e:
                logger.warning(f"Embed failed on {provider.provider_name}: {e}")
                
        raise NotImplementedError("No fallback provider supports embeddings.")
