# RoadSense AI – Intelligent Road Sign Recognition Platform

![RoadSense AI Banner](https://images.unsplash.com/photo-1508873696983-2df529a3c882?auto=format&fit=crop&w=1200&q=80)

RoadSense AI is a next-generation AI SaaS platform designed for high-accuracy road sign classification using purely Artificial Neural Networks (ANN) trained on the **German Traffic Sign Recognition Benchmark (GTSRB)**. Built following strict clean architecture and solid enterprise engineering standards, it delivers real-time inference, predictive analytics, driver safety recommendations, and comprehensive explainability metrics.

---

## Key Features

- **Modern SaaS UI**: Glassmorphism, smooth animations (Framer Motion), dark & light modes, responsive layout, and professional typography.
- **Pure ANN Inference Pipeline**: 64x64 normalization, multi-layer Dense architecture with Dropout regularization, trained with Adam and Sparse Categorical Crossentropy.
- **Explainable AI & Evaluation**: Real-time confidence distributions, top-5 probability breakdowns, confusion matrix visualization, training & loss curves, and per-class accuracy stats.
- **Driver Safety Insights**: Automated road sign descriptions and actionable driver recommendations.
- **Full Auth & Profile Security**: JWT-based authentication, bcrypt password hashing, input validation, and secure session management.
- **Interactive Dashboards**: Live predictions monitoring, scan history filtering, search, pagination, and data export (CSV/PDF reports).

---

## Technology Stack

### Frontend
- **Framework**: React 18 with Vite & TypeScript
- **Styling**: Tailwind CSS & custom design tokens
- **UI Components**: Shadcn-inspired modern design, Lucide Icons, Recharts
- **Animations**: Framer Motion

### Backend & AI
- **Framework**: FastAPI (Python 3.10+) with RESTful APIs
- **Database ORM**: SQLAlchemy with async support & Alembic migrations
- **Database**: PostgreSQL (with automatic local SQLite fallback for dev)
- **Machine Learning**: TensorFlow / Keras (Pure Artificial Neural Network)

---

## Project Structure

```bash
RoadSense AI/
├── ai-model/          # ANN architecture, dataset loaders, training & evaluation pipelines
├── backend/           # FastAPI routers, schemas, core security, and models
├── database/          # Database connection manager and ORM schemas
├── docs/              # Comprehensive technical architecture and API guides
├── frontend/          # Modern React + Vite + Tailwind CSS SaaS web application
├── scripts/           # Automation scripts for model initialization and testing
└── tests/             # Backend unit and integration test suite
```

---

## Getting Started

### 1. Backend Setup

```bash
# Navigate to project root
cd "RoadSense AI"

# Create virtual environment
python -m venv venv
venv\Scripts\activate

# Install dependencies
pip install -r backend/requirements.txt

# Initialize demo model & database
python scripts/train_initial_model.py

# Start FastAPI server
uvicorn backend.main:app --reload --port 8000
```

### 2. Frontend Setup

```bash
cd frontend

# Install packages
npm install

# Start Vite dev server
npm run dev
```

Visit `http://localhost:5173` to experience the RoadSense AI platform!

---

## Deployment

RoadSense AI is pre-configured for automated deployment on **Render** via `render.yaml`. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for step-by-step instructions.
