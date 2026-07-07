import asyncio
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from app.services.document_generation.service import document_generation_service

async def main():
    docs = await document_generation_service.generate_workflow_documents("Customer Complaint", "User is angry about late delivery.")
    print(docs)

asyncio.run(main())
