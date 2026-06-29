import os
from pathlib import Path

# Base Paths
BASE_DIR = Path(__file__).resolve().parent
SAVED_MODELS_DIR = BASE_DIR / "saved_models"
DATA_DIR = BASE_DIR.parent / "data"

os.makedirs(SAVED_MODELS_DIR, exist_ok=True)
os.makedirs(DATA_DIR, exist_ok=True)

# Model Artifact Paths
BEST_MODEL_PATH = SAVED_MODELS_DIR / "best_model.h5"
EVALUATION_METRICS_PATH = SAVED_MODELS_DIR / "evaluation_metrics.json"
CONFUSION_MATRIX_PATH = SAVED_MODELS_DIR / "confusion_matrix.json"
TRAINING_HISTORY_PATH = SAVED_MODELS_DIR / "training_history.json"

# Image & Model Hyperparameters
IMG_HEIGHT = 64
IMG_WIDTH = 64
IMG_CHANNELS = 3
NUM_CLASSES = 43

BATCH_SIZE = 32
EPOCHS = 25
LEARNING_RATE = 0.001
DROPOUT_RATE_1 = 0.3
DROPOUT_RATE_2 = 0.2

# GTSRB 43 Class Names Mapping
GTSRB_CLASSES = {
    0: "Speed limit (20km/h)",
    1: "Speed limit (30km/h)",
    2: "Speed limit (50km/h)",
    3: "Speed limit (60km/h)",
    4: "Speed limit (70km/h)",
    5: "Speed limit (80km/h)",
    6: "End of speed limit (80km/h)",
    7: "Speed limit (100km/h)",
    8: "Speed limit (120km/h)",
    9: "No passing",
    10: "No passing for vehicles over 3.5 metric tons",
    11: "Right-of-way at the next intersection",
    12: "Priority road",
    13: "Yield",
    14: "Stop",
    15: "No vehicles",
    16: "Vehicles over 3.5 metric tons prohibited",
    17: "No entry",
    18: "General caution",
    19: "Dangerous curve to the left",
    20: "Dangerous curve to the right",
    21: "Double curve",
    22: "Bumpy road",
    23: "Slippery road",
    24: "Road narrows on the right",
    25: "Road work",
    26: "Traffic signals",
    27: "Pedestrians",
    28: "Children crossing",
    29: "Bicycles crossing",
    30: "Beware of ice/snow",
    31: "Wild animals crossing",
    32: "End of all speed and passing limits",
    33: "Turn right ahead",
    34: "Turn left ahead",
    35: "Ahead only",
    36: "Go straight or right",
    37: "Go straight or left",
    38: "Keep right",
    39: "Keep left",
    40: "Roundabout mandatory",
    41: "End of no passing",
    42: "End of no passing by vehicles over 3.5 metric tons"
}

# Driver Safety Recommendations & Descriptions per Class
SIGN_ADVICE = {
    0: {"desc": "Maximum permitted speed is 20 km/h.", "advice": "Reduce speed immediately to 20 km/h and watch for school or residential zones."},
    1: {"desc": "Maximum permitted speed is 30 km/h.", "advice": "Maintain steady pace under 30 km/h. Look out for pedestrians."},
    2: {"desc": "Maximum permitted speed is 50 km/h.", "advice": "Standard urban speed limit. Adjust speed to 50 km/h max."},
    3: {"desc": "Maximum permitted speed is 60 km/h.", "advice": "Maintain speed below 60 km/h and observe traffic flow."},
    4: {"desc": "Maximum permitted speed is 70 km/h.", "advice": "Moderate highway/arterial road speed limit. Do not exceed 70 km/h."},
    5: {"desc": "Maximum permitted speed is 80 km/h.", "advice": "Cruising speed limit. Maintain safe vehicle distance at 80 km/h."},
    6: {"desc": "End of 80 km/h speed restriction.", "advice": "You may resume standard road speed limits safely."},
    7: {"desc": "Maximum permitted speed is 100 km/h.", "advice": "Expressway speed limit. Watch lane merges and maintain 100 km/h max."},
    8: {"desc": "Maximum permitted speed is 120 km/h.", "advice": "High-speed highway cruising. Stay alert at speeds up to 120 km/h."},
    9: {"desc": "Overtaking prohibited for all motor vehicles.", "advice": "Do not pass vehicles ahead. Stay in your current lane."},
    10: {"desc": "No overtaking for trucks/heavy vehicles (>3.5t).", "advice": "Heavy trucks must stay in lane. Passenger cars exercise caution."},
    11: {"desc": "Intersection ahead with right-of-way priority.", "advice": "Be prepared for crossing vehicles at the upcoming intersection."},
    12: {"desc": "You are on a priority road.", "advice": "You have right-of-way at intersections, but remain watchful."},
    13: {"desc": "Yield right-of-way to cross traffic.", "advice": "Slow down and prepare to stop if necessary to give way."},
    14: {"desc": "Mandatory full stop before proceeding.", "advice": "Bring vehicle to a complete stop at the line. Look both ways before moving."},
    15: {"desc": "All motor vehicles prohibited beyond this sign.", "advice": "Do not enter. Alternate route required."},
    16: {"desc": "Heavy vehicles over 3.5 tons prohibited.", "advice": "Trucks must take alternate routes."},
    17: {"desc": "Do not enter one-way or restricted street.", "advice": "Wrong way! Stop and reverse safely or turn around."},
    18: {"desc": "General hazard warning ahead.", "advice": "Slow down and stay alert for unexpected roadway conditions."},
    19: {"desc": "Sharp dangerous bend to the left ahead.", "advice": "Reduce speed before entering the left curve."},
    20: {"desc": "Sharp dangerous bend to the right ahead.", "advice": "Reduce speed before entering the right curve."},
    21: {"desc": "Double curve ahead, first to the left.", "advice": "Slow down and maintain lane discipline through S-curves."},
    22: {"desc": "Uneven or bumpy road surface ahead.", "advice": "Reduce speed to protect vehicle suspension and maintain steering control."},
    23: {"desc": "Slippery road surface when wet.", "advice": "Increase following distance and avoid sudden braking or sharp steering."},
    24: {"desc": "Roadway narrows from the right side.", "advice": "Merge carefully to the left and watch for merging traffic."},
    25: {"desc": "Road construction or maintenance work ahead.", "advice": "Slow down, watch for workers and temporary lane shifts."},
    26: {"desc": "Traffic signals operating ahead.", "advice": "Be prepared to stop if traffic lights turn yellow or red."},
    27: {"desc": "Pedestrian crossing area ahead.", "advice": "Slow down and yield to pedestrians stepping onto the crosswalk."},
    28: {"desc": "School zone or children playing area.", "advice": "Drive with extreme caution and be ready to stop suddenly."},
    29: {"desc": "Bicycle crossing ahead.", "advice": "Watch for cyclists crossing or entering the roadway."},
    30: {"desc": "Risk of ice or snow on roadway.", "advice": "Drive slowly, test brakes gently, and watch for black ice."},
    31: {"desc": "Wild animals frequently crossing road.", "advice": "Scan roadsides carefully, especially during dawn and dusk."},
    32: {"desc": "End of all previous speed and passing restrictions.", "advice": "Standard statutory road rules now apply."},
    33: {"desc": "Mandatory right turn ahead.", "advice": "Move to the right lane and turn right at the junction."},
    34: {"desc": "Mandatory left turn ahead.", "advice": "Move to the left lane and turn left at the junction."},
    35: {"desc": "Mandatory straight direction only.", "advice": "Do not turn left or right. Proceed straight ahead."},
    36: {"desc": "Proceed straight ahead or turn right.", "advice": "Select appropriate lane to continue straight or turn right."},
    37: {"desc": "Proceed straight ahead or turn left.", "advice": "Select appropriate lane to continue straight or turn left."},
    38: {"desc": "Keep to the right of the obstacle/divider.", "advice": "Steer right to pass the median or island."},
    39: {"desc": "Keep to the left of the obstacle/divider.", "advice": "Steer left to pass the median or island."},
    40: {"desc": "Enter traffic circle / roundabout.", "advice": "Yield to circulating traffic and proceed in counter-clockwise direction."},
    41: {"desc": "End of general overtaking restriction.", "advice": "Overtaking is permitted when safe to do so."},
    42: {"desc": "End of truck overtaking restriction.", "advice": "Heavy vehicles may now overtake when safe."}
}
