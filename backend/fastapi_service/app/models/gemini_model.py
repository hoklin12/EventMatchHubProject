# app/models/gemini_model.py (Updated)
from pydantic import BaseModel, Field
from typing import Dict, Any

# This model defines EXACTLY what the user must send in the request body.
class EmailGenerationInput(BaseModel):
    """Defines the structure of the data the user sends to the API."""
    formRegisterID: str = Field(..., description="Unique identifier for the participant's registration.")