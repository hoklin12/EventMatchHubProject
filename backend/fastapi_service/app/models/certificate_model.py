from pydantic import BaseModel
from typing import Dict, Any, Optional

class CertificateInput(BaseModel):
    metadata: Dict[str, Any]
    userData: Dict[str, Any]
