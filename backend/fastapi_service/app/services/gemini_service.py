import os
from google import genai
from google.genai import types
from typing import Dict, Any
from fastapi import HTTPException
import dotenv

class GeminiGeneratorService:
    def __init__(self,):
        dotenv.load_dotenv()
        self.api_key = os.getenv("GEMINI_API_KEY")
        self.model = os.getenv("GENERATIVE_MODEL")
        pass

    def generateEmailContent(self, structured_prompt: Dict[str, Any]) -> Dict[str, Any]:
        """
        Calls Google GenAI to generate an email body based on a structured JSON prompt.

        Args:
            structured_prompt: A dictionary containing the full prompt structure (API_SIMULATION format).

        Returns:
            A dictionary containing the generated text content.
        """
        
        client = genai.Client(api_key=self.api_key)

        import json
        prompt_string = json.dumps(structured_prompt, indent=2)

        # 3. Define a system instruction to guide the model to follow the prompt rules strictly
        system_instruction = (
            "You are an expert Event Communications AI. "
            "Generate a friendly, visually appealing, modern event reminder email using Markdown formatting. "
            "RULES:\n"
            "1. Do NOT include 'Subject:' at the start.\n"
            "2. Use bold headings instead of #, short paragraphs, bullet points, and emojis to make it engaging.\n"
            "3. Personalize the greeting using the participant's name from the payload.\n"
            "4. Include sections: Event Details, Logistics, Prep List.\n"
            "5. End the email strictly with:\n\n"
            "Best regards,\n\nEvent Match Hub Team\n\n"
            "6. Ignore optional fields if missing or null. No JSON or code fences.\n"
            "7. Output only the complete formatted email body text."
        )

        # 4. Generate content
        response = client.models.generate_content(
            model=self.model,
            contents=[prompt_string],
            config=types.GenerateContentConfig(
                system_instruction=system_instruction
            ),
        )
        generated_text = response.text
        
        if( not generated_text):
            raise HTTPException(
                status_code=500,
                detail="Gemini API returned empty content."
            )
        
        return HTTPException(
            status_code=200,
            detail={
                "success": True,
                "data": generated_text,
            }
        )

        
# if __name__ == '__main__':
#     payload_data = {
#         "event_description": "A 2-day hands-on coding workshop focusing on building and deploying full-stack applications using Node.js and Next JS.",
#         "event_type": "workshop",
#         "event_date": "2025-03-10 00:00:00",
#         "event_time": "08:30:00",
#         "event_location": "Russian Blvd, Room 204, Phnom Penh",
#         "participant_name": "Sophea Lim",
#         "participant_email": "sophea.lim@aquaideas.org",
#         "participant_data": {
#           "What is your full name?": "Sophea Lims",
#           "What is your preferred session time?": "Morning Session (9 AM - 12 PM)",
#           "Do you have any dietary restrictions?": "Vegetarian,Vegan"
#         }
#     }
    
#     # Construct the full structured prompt object
#     prompt = {
#       "request_type": "API_SIMULATION",
#       "method": "POST",
#       "instructions": "Generate a friendly event reminder email body. Customize the content using the participant data provided in the payload. Ignore optional fields if they are missing or null. The output must be the complete, formatted email body only",
#       "payload": payload_data
#     }
    
#     # Initialize the service (pass your key here or rely on env variable)
#     generator = GeminiGeneratorService() 
    
#     print("--- Sending Request to Gemini ---")
#     try:
#         email_result = generator.generateEmailContent(prompt)
#     except Exception as e:
#         print(f"An error occurred (Did you set the GEMINI_API_KEY?): {e}")