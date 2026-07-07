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
            error_str = str(e)
            if "429" in error_str or "quota" in error_str.lower():
                return "### ⚠️ AI Rate Limit Exceeded\n\nThe Google Gemini API is currently enforcing a rate limit (Error 429 - Quota Exceeded).\n\n**Action Required:** Please wait 30 seconds before running another workflow, or upgrade your API tier."
            return f"### ⚠️ Generation Failed\n\nAn unexpected error occurred while communicating with the AI Provider:\n\n`{error_str}`"

    async def generate_workflow_documents(self, request: str, context: str) -> Dict[str, str]:
        """
        Dynamically generate visually structured markdown documents based on the actual request.
        """
        logger.info(f"Generating dynamic workflow documents for: {request}")
        
        main_prompt = f"""
        You are an expert AI enterprise assistant.
        
        Task Description:
        "{request}"
        
        Retrieved Enterprise Context:
        {context}
        
        Instructions:
        1. Fully address the task description using the provided context.
        2. Format your response beautifully using Markdown. Use clear headings (##, ###), bulleted lists, and bold text for emphasis.
        3. Make it look perfectly aligned, highly structured, and visually friendly.
        """
        
        summary_prompt = f"""
        You are an expert AI summarizer.
        
        Task Description:
        "{request}"
        
        Retrieved Enterprise Context:
        {context}
        
        Instructions:
        Create a very short, punchy executive summary for a human manager to review and approve.
        Highlight key decisions, extracted data points, or actions taken.
        Format beautifully using Markdown (bolding, short bullet points).
        """
        
        slack_prompt = f"""
        You are an API formatting assistant.
        Task: "{request}"
        Generate a JSON mock payload representing a Slack incoming webhook notification summarizing the task completion.
        Do NOT wrap in markdown code blocks, just return raw JSON string representing the payload.
        Make it look like a real Slack blocks payload with headers and fields.
        """
        
        gmail_prompt = f"""
        You are an API formatting assistant.
        Task: "{request}"
        Generate a JSON mock payload representing a Gmail API `users.messages.send` request.
        Do NOT wrap in markdown code blocks, just return raw JSON string.
        Include 'to', 'subject', and 'body' fields.
        """
        
        results = await asyncio.gather(
            self.provider.generate(prompt=main_prompt),
            self.provider.generate(prompt=summary_prompt),
            self.provider.generate(prompt=slack_prompt),
            self.provider.generate(prompt=gmail_prompt)
        )
        
        return {
            "Main_Report": results[0].content,
            "Executive_Summary": results[1].content,
            "Slack_Integration_Payload": results[2].content,
            "Gmail_API_Payload": results[3].content
        }

    async def generate_onboarding_package(self, context: str) -> Dict[str, str]:
        """
        Generate the full suite of onboarding documents (Legacy/Milestone 15 hardcoded).
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
