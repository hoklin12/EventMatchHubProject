from fastapi import APIRouter, HTTPException
from app.models.gemini_model import EmailGenerationInput 
from app.services.gemini_service import GeminiGeneratorService 
from typing import Dict, Any
import requests

router = APIRouter()
gemini_service = GeminiGeneratorService()

@router.post("/generate-email")
def generate_email(user_input: EmailGenerationInput):
    """
    Receives user input, fetches the form registration data,
    and calls the Gemini service only if the URL request succeeds.
    """
    try:
        response = requests.get(user_input.formRegisterID, timeout=5)
        response.raise_for_status()  # Raises HTTPError for bad responses (4xx, 5xx)
    except requests.RequestException as e:
        # Fail early: do NOT call the AI service
        raise HTTPException(
            status_code=400,
            detail=f"Failed to fetch user data from URL: {e}"
        )

    try:
        userData = response.json()
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Response from URL is not valid JSON."
        )

    if not userData:
        raise HTTPException(
            status_code=400,
            detail="No data found at the provided formRegisterID."
        )

    structured_prompt_dict: Dict[str, Any] = {"payload": userData}

    try:
        result = gemini_service.generateEmailContent(structured_prompt_dict)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Gemini API call failed: {e}"
        )
