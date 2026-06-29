# RoadSense AI – API Reference Documentation

RoadSense AI provides a production-grade FastAPI REST API for authentication, road sign inference, telemetry analytics, and dataset inspection.

Base URL: `http://localhost:8000/api/v1`

---

## 1. Authentication Endpoints (`/auth`)

### POST `/auth/register`
Registers a new SaaS platform user.
- **Request Body**:
  ```json
  {
    "email": "driver@roadsense.ai",
    "password": "strongpassword123",
    "full_name": "Alex Rivera"
  }
  ```
- **Response** (`201 Created`):
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1Ni...",
    "token_type": "bearer",
    "user": { "id": 1, "email": "driver@roadsense.ai", "full_name": "Alex Rivera", "role": "user" }
  }
  ```

### POST `/auth/login`
Authenticates user and issues a JWT token.
- **Request Body**:
  ```json
  {
    "email": "driver@roadsense.ai",
    "password": "strongpassword123"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1Ni...",
    "token_type": "bearer",
    "user": { "id": 1, "email": "driver@roadsense.ai", "full_name": "Alex Rivera", "role": "user" }
  }
  ```

---

## 2. AI Inference Endpoints (`/predict`)

### POST `/predict`
Accepts an uploaded image file, runs bilinear normalization and ANN forward pass, returns softmax probabilities and driver safety recommendations.
- **Headers**: `Authorization: Bearer <token>` (Optional / Recommended)
- **Content-Type**: `multipart/form-data`
- **Form Parameter**: `file` (Image binary: png/jpg/jpeg)
- **Response** (`200 OK`):
  ```json
  {
    "prediction_id": "89a23b14-...",
    "predicted_class_id": 2,
    "predicted_class_name": "Speed limit (50km/h)",
    "confidence_score": 98.42,
    "top_5_predictions": [
      { "class_id": 2, "class_name": "Speed limit (50km/h)", "probability": 98.42 },
      { "class_id": 1, "class_name": "Speed limit (30km/h)", "probability": 1.12 }
    ],
    "processing_time_ms": 11.4,
    "road_sign_description": "Maximum permitted speed is 50 km/h.",
    "driver_recommendation": "Standard urban speed limit. Adjust vehicle speed to 50 km/h max and scan intersections."
  }
  ```

---

## 3. Executive Dashboard & Telemetry (`/dashboard`, `/analytics`, `/model`, `/dataset`, `/history`)

### GET `/dashboard`
Returns KPI metrics, dataset stats, training loss curves, and recent scan logs.

### GET `/analytics`
Returns global macro precision/recall/F1 evaluation metrics and confidence distribution histogram data.

### GET `/model`
Returns layer-by-layer Keras neural network parameters, activation types, dropout ratios, and sample confusion matrix.

### GET `/dataset`
Returns metadata and sample distribution volumes across all 43 GTSRB traffic sign classes.

### GET `/history`
Returns paginated prediction scan logs. Supports filtering via query parameters (`?page=1&limit=10&search=Yield`).

### DELETE `/history`
Clears user prediction logs. Requires JWT authorization.
