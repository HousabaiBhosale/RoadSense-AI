import os
import json
import time
import numpy as np
import tensorflow as tf
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, LearningRateScheduler
from config import BEST_MODEL_PATH, TRAINING_HISTORY_PATH, BATCH_SIZE, EPOCHS
from dataset_loader import GTSRBDatasetLoader
from model import build_ann_model

def lr_schedule(epoch, lr):
    """Learning Rate Scheduler: decays learning rate by 10% every 5 epochs."""
    if epoch > 0 and epoch % 5 == 0:
        return lr * 0.9
    return lr

class Trainer:
    def __init__(self):
        self.loader = GTSRBDatasetLoader()
        self.model = build_ann_model()

    def train(self, epochs=EPOCHS, batch_size=BATCH_SIZE):
        print("Loading training and validation data...")
        start_time = time.time()
        X_train, y_train = self.loader.load_dataset("train")
        X_val, y_val = self.loader.load_dataset("val")

        if len(X_train) == 0:
            raise ValueError("No training data available!")

        print(f"Loaded {len(X_train)} training images and {len(X_val)} validation images.")

        # Setup Callbacks
        early_stopping = EarlyStopping(
            monitor='val_loss' if len(X_val) > 0 else 'loss',
            patience=5,
            restore_best_weights=True,
            verbose=1
        )

        checkpoint = ModelCheckpoint(
            filepath=str(BEST_MODEL_PATH),
            monitor='val_accuracy' if len(X_val) > 0 else 'accuracy',
            save_best_only=True,
            verbose=1
        )

        lr_scheduler = LearningRateScheduler(lr_schedule, verbose=0)

        callbacks = [early_stopping, checkpoint, lr_scheduler]

        print("Starting Pure ANN Model Training...")
        history = self.model.fit(
            X_train, y_train,
            validation_data=(X_val, y_val) if len(X_val) > 0 else None,
            epochs=epochs,
            batch_size=batch_size,
            callbacks=callbacks,
            verbose=1
        )

        training_time = time.time() - start_time
        print(f"Training completed in {training_time:.2f} seconds.")

        # Save training curves and metrics
        history_dict = history.history
        # Convert numpy float values to standard Python floats for JSON serialization
        serializable_history = {k: [float(v) for v in vals] for k, vals in history_dict.items()}
        serializable_history["training_time_seconds"] = float(training_time)

        with open(TRAINING_HISTORY_PATH, "w") as f:
            json.dump(serializable_history, f, indent=4)

        # Save final model if best model wasn't saved by checkpoint
        if not os.path.exists(BEST_MODEL_PATH):
            self.model.save(BEST_MODEL_PATH)

        return serializable_history

def load_saved_model():
    """Loads the best saved ANN model from disk."""
    if not os.path.exists(BEST_MODEL_PATH):
        return None
    return tf.keras.models.load_model(BEST_MODEL_PATH)
