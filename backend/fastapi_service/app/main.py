from fastapi import FastAPI, APIRouter
from app.routers.certificate_router import router as cert_router
from app.routers.gemini_router import router as gemini_router

app = FastAPI()
api_router = APIRouter(prefix="/api/v1")
api_router.include_router(cert_router, prefix="/certificate", tags=["Certificate"])
api_router.include_router(gemini_router, prefix="/gemini", tags=["Gemini"])

app.include_router(api_router)

@app.get("/")
def root():
    return {"message": "FastAPI Certificate Service Running"}
