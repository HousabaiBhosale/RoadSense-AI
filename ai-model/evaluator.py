import os
import json
import time
import numpy as np
from sklearn.metrics import accuracy_score, precision_recall_fscore_support, confusion_matrix, classification_report
from config import EVALUATION_METRICS_PATH, CONFUSION_MATRIX_PATH, TRAINING_HISTORY_PATH, NUM_CLASSES, GTSRB_CLASSES
from dataset_loader import GTSRBDatasetLoader
from trainer import load_saved_model

class Evaluator:
    def __init__(self, model=None):
        self.model = model if model else load_saved_model()
        self.loader = GTSRBDatasetLoader()

    def evaluate_model(self):
        if self.model is None:
            raise ValueError("No model loaded for evaluation!")

        print("Loading test dataset for evaluation...")
        X_test, y_test = self.loader.load_dataset("test")
        if len(X_test) == 0:
            print("Test set empty, falling back to validation set for evaluation...")
            X_test, y_test = self.loader.load_dataset("val")
            if len(X_test) == 0:
                X_test, y_test = self.loader.load_dataset("train")

        print(f"Running inference on {len(X_test)} samples...")
        start_time = time.time()
        y_probs = self.model.predict(X_test, verbose=0)
        prediction_time = (time.time() - start_time) / max(1, len(X_test))

        y_pred = np.argmax(y_probs, axis=1)

        # Global Metrics
        accuracy = float(accuracy_score(y_test, y_pred))
        precision, recall, f1, _ = precision_recall_fscore_support(y_test, y_pred, average='macro', zero_division=0)

        # Confusion Matrix
        cm = confusion_matrix(y_test, y_pred, labels=list(range(NUM_CLASSES)))
        cm_list = cm.tolist()

        # Per-class Accuracy and Classification Report
        per_class_acc = {}
        for cls_id in range(NUM_CLASSES):
            mask = (y_test == cls_id)
            if np.sum(mask) > 0:
                acc = float(np.mean(y_pred[mask] == cls_id))
            else:
                acc = 0.0
            per_class_acc[GTSRB_CLASSES[cls_id]] = acc

        # Misclassified Samples
        misclassified = []
        for i in range(len(y_test)):
            if y_test[i] != y_pred[i] and len(misclassified) < 10:
                misclassified.append({
                    "sample_index": int(i),
                    "true_class": GTSRB_CLASSES[int(y_test[i])],
                    "predicted_class": GTSRB_CLASSES[int(y_pred[i])],
                    "confidence": float(y_probs[i][y_pred[i]])
                })

        # Confidence Distribution
        confidences = np.max(y_probs, axis=1)
        conf_dist = {
            "90-100%": int(np.sum(confidences >= 0.90)),
            "80-90%": int(np.sum((confidences >= 0.80) & (confidences < 0.90))),
            "70-80%": int(np.sum((confidences >= 0.70) & (confidences < 0.80))),
            "50-70%": int(np.sum((confidences >= 0.50) & (confidences < 0.70))),
            "<50%": int(np.sum(confidences < 0.50))
        }

        training_time = 0.0
        training_history = {}
        if os.path.exists(TRAINING_HISTORY_PATH):
            try:
                with open(TRAINING_HISTORY_PATH, "r") as f:
                    training_history = json.load(f)
                    training_time = training_history.get("training_time_seconds", 0.0)
            except Exception:
                pass

        evaluation_data = {
            "accuracy": round(accuracy * 100, 2),
            "precision": round(float(precision) * 100, 2),
            "recall": round(float(recall) * 100, 2),
            "f1_score": round(float(f1) * 100, 2),
            "avg_prediction_time_ms": round(prediction_time * 1000, 3),
            "total_training_time_s": round(training_time, 2),
            "per_class_accuracy": per_class_acc,
            "misclassified_samples": misclassified,
            "confidence_distribution": conf_dist,
            "training_curves": training_history
        }

        with open(EVALUATION_METRICS_PATH, "w") as f:
            json.dump(evaluation_data, f, indent=4)

        with open(CONFUSION_MATRIX_PATH, "w") as f:
            json.dump({"matrix": cm_list, "classes": [GTSRB_CLASSES[i] for i in range(NUM_CLASSES)]}, f, indent=4)

        print("Evaluation artifacts successfully generated and saved.")
        return evaluation_data
