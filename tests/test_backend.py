import sys
import os
import pytest
import io
from fastapi.testclient import TestClient

# Ensure project root is in sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.main import app

@pytest.fixture
def client():
    with TestClient(app) as c:
        yield c

def test_health_check(client):
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "online"
    assert data["service"] == "RoadSense AI Backend Web Service"

import uuid

def test_register_user(client):
    unique_email = f"driver_{uuid.uuid4().hex[:8]}@roadsense.ai"
    payload = {
        "email": unique_email,
        "password": "secretpassword123",
        "full_name": "Test Driver"
    }
    response = client.post("/api/v1/auth/register", json=payload)
    assert response.status_code in [200, 201]
    data = response.json()
    assert "access_token" in data
    assert data["user"]["email"] == unique_email

def test_login_user(client):
    payload = {
        "email": "test_driver@roadsense.ai",
        "password": "secretpassword123"
    }
    response = client.post("/api/v1/auth/login", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data

def test_dashboard_endpoint(client):
    response = client.get("/api/v1/dashboard")
    assert response.status_code == 200
    data = response.json()
    assert "cards" in data
    assert "charts" in data
    assert "model_accuracy" in data["cards"]

def test_analytics_endpoint(client):
    response = client.get("/api/v1/analytics")
    assert response.status_code == 200
    data = response.json()
    assert "metrics" in data
    assert "confidence_distribution" in data

def test_model_endpoint(client):
    response = client.get("/api/v1/model")
    assert response.status_code == 200
    data = response.json()
    assert "architecture_summary" in data
    assert data["architecture_summary"]["name"] == "RoadSense_Pure_ANN"

def test_dataset_endpoint(client):
    response = client.get("/api/v1/dataset")
    assert response.status_code == 200
    data = response.json()
    assert data["total_classes"] == 43

def test_history_endpoint(client):
    response = client.get("/api/v1/history")
    assert response.status_code == 200
    data = response.json()
    assert "data" in data

def test_dataset_upload_and_retrain(client):
    # Test upload
    dummy_img = io.BytesIO(b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\x0cIDATx\x9cc\xf8\xcf\xc0\x00\x00\x03\x01\x01\x00\x18\xdd\x8d\xb0\x00\x00\x00\x00IEND\xaeB`\x82")
    files = {"file": ("test_upload.png", dummy_img, "image/png")}
    data = {"class_id": 14}
    response = client.post("/api/v1/dataset/upload", files=files, data=data)
    assert response.status_code == 200
    res_json = response.json()
    assert res_json["status"] == "success"

    # Test retrain
    retrain_res = client.post("/api/v1/model/retrain")
    assert retrain_res.status_code == 200
    assert retrain_res.json()["status"] == "success"

def test_zip_upload_and_download(client):
    dummy_zip = io.BytesIO(b"PK\x03\x04dummyzipcontent")
    files = {"file": ("dataset.zip", dummy_zip, "application/zip")}
    res = client.post("/api/v1/dataset/zip-upload", files=files)
    assert res.status_code == 200
    assert res.json()["status"] == "success"

    dl_res = client.get("/api/v1/model/download")
    assert dl_res.status_code == 200
