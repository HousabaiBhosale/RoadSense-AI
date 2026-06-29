from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime, Text, JSON
from sqlalchemy.orm import relationship
from connection import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="user")  # 'user' or 'admin'
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    predictions = relationship("Prediction", back_populates="user", cascade="all, delete-orphan")
    feedbacks = relationship("Feedback", back_populates="user", cascade="all, delete-orphan")
    sessions = relationship("Session", back_populates="user", cascade="all, delete-orphan")


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    image_filename = Column(String, nullable=False)
    predicted_class_id = Column(Integer, nullable=False)
    predicted_class_name = Column(String, nullable=False)
    confidence_score = Column(Float, nullable=False)
    top_5_predictions = Column(JSON, nullable=False)  # List of dicts: class_id, class_name, probability
    processing_time_ms = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="predictions")
    feedbacks = relationship("Feedback", back_populates="prediction", cascade="all, delete-orphan")


class ModelVersion(Base):
    __tablename__ = "models"

    id = Column(Integer, primary_key=True, index=True)
    version_name = Column(String, unique=True, index=True, nullable=False)
    architecture = Column(String, default="Pure ANN (64x64 -> Dense 512 -> 256 -> 128)")
    accuracy = Column(Float, nullable=False)
    loss = Column(Float, nullable=False)
    total_params = Column(Integer, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class Feedback(Base):
    __tablename__ = "feedbacks"

    id = Column(Integer, primary_key=True, index=True)
    prediction_id = Column(Integer, ForeignKey("predictions.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    rating = Column(Integer, nullable=False)  # 1 to 5 stars
    comment = Column(Text, nullable=True)
    corrected_class_id = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    prediction = relationship("Prediction", back_populates="feedbacks")
    user = relationship("User", back_populates="feedbacks")


class Log(Base):
    __tablename__ = "logs"

    id = Column(Integer, primary_key=True, index=True)
    level = Column(String, default="INFO")  # INFO, WARNING, ERROR
    endpoint = Column(String, nullable=True)
    message = Column(Text, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    ip_address = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class Session(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    token = Column(String, unique=True, index=True, nullable=False)
    expires_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="sessions")
