import tensorflow as tf
from tensorflow.keras import layers, models, optimizers
from config import IMG_HEIGHT, IMG_WIDTH, IMG_CHANNELS, NUM_CLASSES, LEARNING_RATE, DROPOUT_RATE_1, DROPOUT_RATE_2

def build_ann_model(input_shape=(IMG_HEIGHT, IMG_WIDTH, IMG_CHANNELS)):
    """
    Builds a pure Artificial Neural Network (ANN) following the exact specification:
    Input -> Resize 64x64 -> Normalize -> Flatten -> Dense 512 -> Dropout -> Dense 256 -> Dropout -> Dense 128 -> Output 43 Classes Softmax.
    Never uses CNN, YOLO, ResNet, or Transformers.
    """
    model = models.Sequential([
        # Input Layer
        layers.Input(shape=input_shape, name="input_image"),
        
        # Resize Layer (Ensures input tensor is 64x64)
        layers.Resizing(IMG_HEIGHT, IMG_WIDTH, name="resize_64x64"),
        
        # Normalize Layer (Scales pixel values from [0, 255] to [0.0, 1.0])
        layers.Rescaling(1.0 / 255.0, name="normalize_pixels"),
        
        # Flatten Layer (Converts 3D image tensor to 1D feature vector)
        layers.Flatten(name="flatten_features"),
        
        # Dense 512
        layers.Dense(512, activation='relu', name="dense_512"),
        layers.Dropout(DROPOUT_RATE_1, name="dropout_1"),
        
        # Dense 256
        layers.Dense(256, activation='relu', name="dense_256"),
        layers.Dropout(DROPOUT_RATE_2, name="dropout_2"),
        
        # Dense 128
        layers.Dense(128, activation='relu', name="dense_128"),
        
        # Output 43 Classes (Softmax)
        layers.Dense(NUM_CLASSES, activation='softmax', name="output_43_classes")
    ], name="RoadSense_Pure_ANN")

    # Optimizer: Adam, Loss: SparseCategoricalCrossentropy
    optimizer = optimizers.Adam(learning_rate=LEARNING_RATE)
    model.compile(
        optimizer=optimizer,
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )

    return model

def get_model_summary(model):
    """Returns a structured dictionary summary of the model layers and parameters for API/UI display."""
    summary_data = {
        "name": model.name,
        "total_parameters": int(model.count_params()),
        "optimizer": "Adam",
        "loss_function": "SparseCategoricalCrossentropy",
        "layers": []
    }
    for layer in model.layers:
        try:
            out_shape = str(layer.output_shape)
        except AttributeError:
            out_shape = str(getattr(layer, '_output_shape', '(None, 64, 64, 3)'))
        summary_data["layers"].append({
            "name": layer.name,
            "type": layer.__class__.__name__,
            "output_shape": out_shape,
            "parameters": int(layer.count_params())
        })
    return summary_data
