import os
import time
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
sys.path.append(str(BASE_DIR))
sys.path.append(str(BASE_DIR.parent / "database"))

from connection import engine, Base
from routers import auth, inference, dashboard

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="RoadSense AI API",
    description="Production-Ready Intelligent Road Sign Recognition Platform Using Pure Artificial Neural Networks (ANN)",
    version="1.0.0"
)

# CORS Middleware
origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for seamless development and live SaaS integration
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Logging & Latency Measurement Middleware
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(round(process_time * 1000, 2)) + "ms"
    return response

# Mount Static Uploads directory for image previews
STATIC_DIR = BASE_DIR.parent / "static" / "uploads"
os.makedirs(STATIC_DIR, exist_ok=True)
app.mount("/static/uploads", StaticFiles(directory=str(STATIC_DIR)), name="static")

# Include Routers
app.include_router(auth.router, prefix="/api/v1/auth")
app.include_router(inference.router, prefix="/api/v1")
app.include_router(dashboard.router, prefix="/api/v1")

@app.get("/health", tags=["System"])
def health_check():
    return {
        "status": "online",
        "service": "RoadSense AI Backend Web Service",
        "version": "1.0.0",
        "ai_engine": "Pure Artificial Neural Network (64x64 -> 512 -> 256 -> 128)"
    }

@app.get("/", tags=["System"])
def root():
    return {
        "message": "Welcome to RoadSense AI API. Visit /docs for OpenAPI swagger documentation."
    }
