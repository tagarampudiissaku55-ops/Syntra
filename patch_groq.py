import re

with open('/Users/onepiece/CODE/SYNTRA/backend/app/ai/providers/groq.py', 'r') as f:
    content = f.read()

content = content.replace(
    'async def generate(self, prompt: Prompt, model_config: ModelConfig, gen_config: GenerationConfig, safety_config: SafetyConfig, retry_config: RetryConfig, timeout_config: TimeoutConfig) -> AIResponse:',
    'async def generate(self, prompt: Prompt | str, model_config: Optional[ModelConfig] = None, gen_config: Optional[GenerationConfig] = None, safety_config: Optional[SafetyConfig] = None, retry_config: Optional[RetryConfig] = None, timeout_config: Optional[TimeoutConfig] = None) -> AIResponse:'
)
content = content.replace(
    'async def generate_structured(self, prompt: Prompt, schema: Any, model_config: ModelConfig, gen_config: GenerationConfig, safety_config: SafetyConfig, retry_config: RetryConfig, timeout_config: TimeoutConfig) -> AIResponse:',
    'async def generate_structured(self, prompt: Prompt | str, schema: Any, model_config: Optional[ModelConfig] = None, gen_config: Optional[GenerationConfig] = None, safety_config: Optional[SafetyConfig] = None, retry_config: Optional[RetryConfig] = None, timeout_config: Optional[TimeoutConfig] = None) -> AIResponse:'
)

content = content.replace(
    'if prompt.system:',
    'if isinstance(prompt, Prompt) and prompt.system:'
)
content = content.replace(
    'full_user_content = prompt.user',
    'full_user_content = prompt.user if isinstance(prompt, Prompt) else prompt'
)
content = content.replace(
    'if prompt.context:',
    'if isinstance(prompt, Prompt) and prompt.context:'
)
content = content.replace(
    'system_instruction = prompt.system or "You are a helpful API that outputs only valid JSON."',
    'system_instruction = (prompt.system if isinstance(prompt, Prompt) else "") or "You are a helpful API that outputs only valid JSON."'
)
content = content.replace(
    '{"role": "user", "content": prompt.user}',
    '{"role": "user", "content": prompt.user if isinstance(prompt, Prompt) else prompt}'
)

content = content.replace(
    'from typing import AsyncGenerator, Any',
    'from typing import AsyncGenerator, Any, Optional\nfrom .models import Prompt, AIResponse, ModelConfig, GenerationConfig, SafetyConfig, RetryConfig, TimeoutConfig'
)

# Also fix the temperature, max_tokens lookups because model_config and gen_config might be None
content = content.replace(
    'model = model_config.model_name if "llama" in model_config.model_name.lower() or "mixtral" in model_config.model_name.lower() else "llama-3.3-70b-versatile"',
    'model = "llama-3.3-70b-versatile" if not model_config else (model_config.model_name if "llama" in model_config.model_name.lower() or "mixtral" in model_config.model_name.lower() else "llama-3.3-70b-versatile")'
)

content = content.replace(
    'temperature=gen_config.temperature,',
    'temperature=gen_config.temperature if gen_config else 0.7,'
)
content = content.replace(
    'max_tokens=gen_config.max_output_tokens,',
    'max_tokens=None,'
)
content = content.replace(
    'top_p=gen_config.top_p,',
    'top_p=gen_config.top_p if gen_config else 1.0,'
)

with open('/Users/onepiece/CODE/SYNTRA/backend/app/ai/providers/groq.py', 'w') as f:
    f.write(content)
