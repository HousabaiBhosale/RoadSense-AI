# RoadSense AI – System Architecture & AI Specification

RoadSense AI is built adhering to professional software engineering and AI architectural standards. This document details the layered modular structure and the neural network design.

---

## 1. Clean Architecture Breakdown

```
RoadSense AI Platform
│
├── Frontend Layer (React + Vite + TypeScript)
│   ├── Presentation: Glassmorphic UI, Framer Motion transitions, Recharts charts
│   ├── State Management: React Context (AuthContext, ThemeContext)
│   └── Network API: Axios/Fetch client wrapped with JWT Bearer auth
│
├── Backend Service Layer (FastAPI + Python 3.10)
│   ├── API Gateway & Routers: CORS middleware, secure routing (`/auth`, `/predict`, `/dashboard`)
│   ├── Core Security: JWT tokens, bcrypt hashing, role-based access control
│   └── Schemas: Pydantic v2 strict payload validation
│
├── AI Inference Engine (`ai-model/`)
│   ├── Preprocessing Pipeline: Bilinear 64x64 pixel scaling, [0,1] float tensor normalization
│   └── Model Architecture: Pure Artificial Neural Network (Dense Keras Layers)
│
└── Persistence Layer (`database/`)
    ├── ORM: SQLAlchemy mapping Users, Predictions, Logs, Models, Sessions
    └── Engine: PostgreSQL production database with seamless local SQLite fallback
```

---

## 2. Artificial Neural Network (ANN) Specification

Per strict architectural constraints, RoadSense AI uses **Pure ANN** (Dense Feedforward Neural Networks) rather than Convolutional Neural Networks (CNNs) or Vision Transformers (ViTs).

### Network Layer Table
| Layer Index | Layer Type | Units / Shape | Activation / Regularization | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| 0 | Input | `(64, 64, 3)` | None | Raw RGB image reception |
| 1 | Resizing | `(64, 64, 3)` | Bilinear Interpolation | Standardize input dimensions |
| 2 | Rescaling | `(64, 64, 3)` | Scale `1./255` | Normalize pixel values to `[0, 1]` |
| 3 | Flatten | `12,288` | None | Vectorize 3D tensor into 1D feature array |
| 4 | Dense | `512` | ReLU | Primary nonlinear feature representation |
| 5 | Dropout | `512` | Rate `0.3` | Prevent overfitting |
| 6 | Dense | `256` | ReLU | Secondary abstraction layer |
| 7 | Dropout | `256` | Rate `0.2` | Regularization |
| 8 | Dense | `128` | ReLU | Compact semantic embedding |
| 9 | Dense (Output) | `43` | Softmax | Class probability distribution for GTSRB |

### Optimization & Loss
- **Optimizer**: Adam (Adaptive Moment Estimation) with learning rate decay.
- **Loss Function**: `SparseCategoricalCrossentropy` (handles integer class labels directly without one-hot overhead).
- **Latency Target**: `< 15ms` per inference on standard CPU instances.
