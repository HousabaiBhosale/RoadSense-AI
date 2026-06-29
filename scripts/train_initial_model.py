import os
import sys
from pathlib import Path

# Add project root and ai-model directory to Python path
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.append(str(BASE_DIR))
sys.path.append(str(BASE_DIR / "ai-model"))

from trainer import Trainer
from evaluator import Evaluator
from config import BEST_MODEL_PATH, EVALUATION_METRICS_PATH

def main():
    print("=== RoadSense AI Model & Data Initialization ===")
    trainer = Trainer()
    
    # If model artifacts don't exist yet, run initial training run (3 epochs for fast setup)
    if not os.path.exists(BEST_MODEL_PATH) or not os.path.exists(EVALUATION_METRICS_PATH):
        print("Training baseline pure ANN model on GTSRB sample data...")
        trainer.train(epochs=3, batch_size=32)
        print("Running evaluation suite...")
        evaluator = Evaluator(model=trainer.model)
        evaluator.evaluate_model()
        print("=== AI Model Initialization Completed Successfully ===")
    else:
        print("Model artifacts already exist. Skipping training.")

if __name__ == "__main__":
    main()
