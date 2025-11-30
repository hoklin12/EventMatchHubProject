from fastapi import FastAPI, APIRouter
from app.routers.certificate_router import router as cert_router

app = FastAPI()
api_router = APIRouter(prefix="/api/v1")
api_router.include_router(cert_router, prefix="/certificate", tags=["Certificate"])
app.include_router(api_router)

@app.get("/")
def root():
    return {"message": "FastAPI Certificate Service Running"}
