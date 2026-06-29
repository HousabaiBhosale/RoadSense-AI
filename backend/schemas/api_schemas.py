from datetime import datetime
from typing import List, Optional, Any, Dict
from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    email: EmailStr
    full_name: str = Field(..., min_length=2, max_length=100)
    password: str = Field(..., min_length=6, max_length=100)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    role: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class TopPredictionItem(BaseModel):
    class_id: int
    class_name: str
    probability: float

class PredictionResponse(BaseModel):
    id: int
    image_url: str
    predicted_class_id: int
    predicted_class_name: str
    confidence_score: float
    top_5_predictions: List[Dict[str, Any]]
    processing_time_ms: float
    created_at: datetime
    road_sign_description: str
    driver_recommendation: str

    class Config:
        from_attributes = True

class FeedbackCreate(BaseModel):
    prediction_id: int
    rating: int = Field(..., ge=1, le=5)
    comment: Optional[str] = None
    corrected_class_id: Optional[int] = None
