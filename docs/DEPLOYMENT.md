# RoadSense AI – Deployment & Production Guide

RoadSense AI is configured for one-click deployment on cloud platforms such as Render, AWS, or Docker/Kubernetes.

---

## 1. Cloud Deployment via Render (`render.yaml`)

The project root contains a ready-to-deploy `render.yaml` blueprint configuring three synchronized services:

1. **PostgreSQL Database (`roadsense-db`)**: Enterprise managed database instance storing users, scan logs, and session tokens.
2. **Backend API (`roadsense-backend`)**: Python 3.10 FastAPI service booted with Uvicorn (`uvicorn backend.main:app --host 0.0.0.0 --port $PORT`). Automatically executes initial model training/weights generation during build (`python scripts/train_initial_model.py`).
3. **Frontend Web App (`roadsense-frontend`)**: Node/Vite static site built via `npm run build` inside the `frontend/` directory and routed to the backend API.

### Deployment Steps:
1. Connect your GitHub repository to Render Dashboard.
2. Click **New Blueprint Instance** and select the repository.
3. Render will automatically parse `render.yaml`, provision the PostgreSQL database, build the backend AI dependencies, and publish the frontend SaaS application.

---

## 2. Local Environment Execution

To run RoadSense AI locally on Windows, macOS, or Linux:

### Step 1: Bootstrap AI Pipeline
```bash
python scripts/train_initial_model.py
```
*Generates baseline GTSRB model weights and evaluation artifacts in `ai-model/saved_models/`.*

### Step 2: Start FastAPI Backend
```bash
uvicorn backend.main:app --reload --port 8000
```
*API Gateway accessible at `http://localhost:8000`. Swagger docs at `http://localhost:8000/docs`.*

### Step 3: Launch React Frontend
```bash
cd frontend
npm install
npm run dev
```
*Frontend SaaS platform live at `http://localhost:5173`.*
