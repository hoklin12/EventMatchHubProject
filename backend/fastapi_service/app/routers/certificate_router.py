from fastapi import APIRouter
from app.models.certificate_model import CertificateInput
from app.services.certificate_service import generate_certificate_service

router = APIRouter()

@router.post("/generate")
def generate_certificate(data: CertificateInput):
    image_base64 = generate_certificate_service(data.dict())
    return {"status": "success", "image": image_base64}
