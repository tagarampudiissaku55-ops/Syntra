import logging
import asyncio
from typing import Dict, Any
from app.ai.providers.manager import provider_manager
from app.templates.employee_onboarding.prompts import (
    WELCOME_EMAIL_PROMPT,
    EMPLOYEE_CHECKLIST_PROMPT,
    FIRST_WEEK_PLAN_PROMPT,
    EQUIPMENT_REQUEST_PROMPT,
    HR_APPROVAL_SUMMARY_PROMPT
)

logger = logging.getLogger(__name__)

class DocumentGenerationService:
    """
    Generic service to generate formatted documents using the AI Provider layer.
    """
    def __init__(self):
        self.provider = provider_manager.get()

    async def generate_document(self, template: str, context: str) -> str:
        """
        Generate a single document using the provided template and context.
        """
        prompt = template.format(context=context)
        try:
            response = await self.provider.generate(prompt=prompt)
            return response.content
        except Exception as e:
            logger.error(f"Failed to generate document: {e}")
            return f"Error generating document: {e}"

    async def generate_onboarding_package(self, context: str) -> Dict[str, str]:
        """
        Generate the full suite of onboarding documents.
        """
        logger.info("Generating onboarding package documents...")
        
        # Running concurrently for massive speedup
        results = await asyncio.gather(
            self.generate_document(WELCOME_EMAIL_PROMPT, context),
            self.generate_document(EMPLOYEE_CHECKLIST_PROMPT, context),
            self.generate_document(FIRST_WEEK_PLAN_PROMPT, context),
            self.generate_document(EQUIPMENT_REQUEST_PROMPT, context),
            self.generate_document(HR_APPROVAL_SUMMARY_PROMPT, context)
        )
        
        return {
            "welcome_email": results[0],
            "checklist": results[1],
            "first_week_plan": results[2],
            "equipment_request": results[3],
            "hr_summary": results[4]
        }

document_generation_service = DocumentGenerationService()
