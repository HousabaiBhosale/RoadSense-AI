import os
import glob
import random
import numpy as np
from PIL import Image, ImageDraw
from config import DATA_DIR, IMG_HEIGHT, IMG_WIDTH, NUM_CLASSES, GTSRB_CLASSES

def generate_realistic_sign(class_id: int, variation: int) -> Image.Image:
    """Generates a realistic 64x64 geometric road sign image for baseline training."""
    # Background noise (sky/road color variation)
    np.random.seed(class_id * 100 + variation)
    bg_color = np.random.randint(80, 180, size=(64, 64, 3), dtype=np.uint8)
    img = Image.fromarray(bg_color)
    draw = ImageDraw.Draw(img)

    # Bounding box with jitter
    jx = np.random.randint(-3, 4)
    jy = np.random.randint(-3, 4)
    bbox = [8 + jx, 8 + jy, 55 + jx, 55 + jy]

    if class_id == 14:  # Stop sign (Red Octagon)
        pts = [
            (20 + jx, 8 + jy), (43 + jx, 8 + jy),
            (55 + jx, 20 + jy), (55 + jx, 43 + jy),
            (43 + jx, 55 + jy), (20 + jx, 55 + jy),
            (8 + jx, 43 + jy), (8 + jx, 20 + jy)
        ]
        draw.polygon(pts, fill=(210, 20, 20), outline=(255, 255, 255))
        draw.rectangle([22 + jx, 28 + jy, 41 + jx, 35 + jy], fill=(255, 255, 255))  # White STOP bar

    elif class_id in [0, 1, 2, 3, 4, 5, 7, 8]:  # Speed limits (Red circle, white inside)
        draw.ellipse(bbox, fill=(255, 255, 255), outline=(220, 20, 20), width=6)
        # Inner number representation
        num_bars = {0: 2, 1: 3, 2: 5, 3: 6, 4: 7, 5: 8, 7: 10, 8: 12}.get(class_id, 5)
        draw.rectangle([26 + jx, 24 + jy, 37 + jx, 40 + jy], fill=(30, 30, 30))

    elif class_id == 13:  # Yield (Inverted Triangle)
        pts = [(8 + jx, 10 + jy), (55 + jx, 10 + jy), (31 + jx, 55 + jy)]
        draw.polygon(pts, fill=(255, 255, 255), outline=(220, 20, 20))

    elif class_id in [11, 12]:  # Priority road (Yellow Diamond)
        pts = [(31 + jx, 8 + jy), (55 + jx, 31 + jy), (31 + jx, 55 + jy), (8 + jx, 31 + jy)]
        draw.polygon(pts, fill=(255, 200, 0), outline=(255, 255, 255))

    elif class_id == 17:  # No entry (Red circle with white horizontal bar)
        draw.ellipse(bbox, fill=(220, 20, 20))
        draw.rectangle([14 + jx, 28 + jy, 49 + jx, 35 + jy], fill=(255, 255, 255))

    elif class_id in range(33, 41):  # Mandatory direction (Blue circle with white arrow)
        draw.ellipse(bbox, fill=(20, 100, 220), outline=(255, 255, 255))
        draw.rectangle([28 + jx, 20 + jy, 35 + jx, 43 + jy], fill=(255, 255, 255))

    else:  # Warning / Caution triangles (Upright Triangle with red border)
        pts = [(31 + jx, 8 + jy), (55 + jx, 55 + jy), (8 + jx, 55 + jy)]
        draw.polygon(pts, fill=(255, 255, 255), outline=(220, 20, 20))
        draw.rectangle([29 + jx, 24 + jy, 33 + jx, 40 + jy], fill=(30, 30, 30))

    return img

class GTSRBDatasetLoader:
    def __init__(self, data_path=DATA_DIR):
        self.data_path = data_path
        self.train_dir = os.path.join(data_path, "Train")
        self.val_dir = os.path.join(data_path, "Val")
        self.test_dir = os.path.join(data_path, "Test")
        self.supported_exts = {".png", ".jpg", ".jpeg", ".ppm", ".bmp"}

    def detect_class_names(self):
        """Returns map of detected class IDs to descriptive names."""
        return GTSRB_CLASSES

    def load_image(self, img_path):
        """Safely loads, resizes (64x64), and normalizes an image. Ignores corrupted images."""
        try:
            with Image.open(img_path) as img:
                img = img.convert("RGB")
                img = img.resize((IMG_WIDTH, IMG_HEIGHT), Image.Resampling.BILINEAR)
                img_arr = np.array(img, dtype=np.float32)
                return img_arr
        except Exception as e:
            return None

    def ensure_synthetic_sample_data(self):
        """Generates realistic geometric road sign images if real dataset is not downloaded yet."""
        if os.path.exists(self.train_dir) and len(os.listdir(self.train_dir)) >= NUM_CLASSES:
            return
        
        print("Generating realistic geometric GTSRB baseline training samples...")
        os.makedirs(self.train_dir, exist_ok=True)
        os.makedirs(self.val_dir, exist_ok=True)
        os.makedirs(self.test_dir, exist_ok=True)

        for class_id in range(NUM_CLASSES):
            cls_train_dir = os.path.join(self.train_dir, str(class_id))
            cls_val_dir = os.path.join(self.val_dir, str(class_id))
            os.makedirs(cls_train_dir, exist_ok=True)
            os.makedirs(cls_val_dir, exist_ok=True)

            for i in range(20):
                img = generate_realistic_sign(class_id, i)
                img.save(os.path.join(cls_train_dir, f"sample_{i}.png"))

            for i in range(5):
                img = generate_realistic_sign(class_id, i + 100)
                img.save(os.path.join(cls_val_dir, f"sample_{i}.png"))

    def create_validation_split_if_missing(self, val_ratio=0.15):
        """Checks if validation directory exists. If missing, creates split from training data."""
        if os.path.exists(self.val_dir) and len(os.listdir(self.val_dir)) > 0:
            return
        
        if not os.path.exists(self.train_dir):
            self.ensure_synthetic_sample_data()
            return

        print("Creating automatic validation split...")
        os.makedirs(self.val_dir, exist_ok=True)
        for cls_folder in os.listdir(self.train_dir):
            cls_train_path = os.path.join(self.train_dir, cls_folder)
            if not os.path.isdir(cls_train_path):
                continue
            cls_val_path = os.path.join(self.val_dir, cls_folder)
            os.makedirs(cls_val_path, exist_ok=True)

            images = [f for f in os.listdir(cls_train_path) if os.path.splitext(f)[1].lower() in self.supported_exts]
            if len(images) > 1:
                val_size = max(1, int(len(images) * val_ratio))
                val_imgs = random.sample(images, val_size)
                for img_name in val_imgs:
                    src = os.path.join(cls_train_path, img_name)
                    dst = os.path.join(cls_val_path, img_name)
                    try:
                        os.rename(src, dst)
                    except Exception:
                        pass

    def load_dataset(self, split="train"):
        """Loads dataset split into numpy X and y arrays. Automatically handles unsupported or corrupted images."""
        self.ensure_synthetic_sample_data()
        self.create_validation_split_if_missing()

        target_dir = self.train_dir if split == "train" else (self.val_dir if split == "val" else self.test_dir)
        if not os.path.exists(target_dir):
            return np.array([]), np.array([])

        images = []
        labels = []

        for cls_id in range(NUM_CLASSES):
            cls_folder = os.path.join(target_dir, str(cls_id))
            if not os.path.isdir(cls_folder):
                continue

            for file_name in os.listdir(cls_folder):
                ext = os.path.splitext(file_name)[1].lower()
                if ext not in self.supported_exts:
                    continue # Ignore unsupported files

                file_path = os.path.join(cls_folder, file_name)
                img_arr = self.load_image(file_path)
                if img_arr is not None:
                    images.append(img_arr)
                    labels.append(cls_id)

        return np.array(images, dtype=np.float32), np.array(labels, dtype=np.int32)

    def get_dataset_statistics(self):
        """Calculates dataset size, class distributions, and sample stats."""
        stats = {
            "total_images": 0,
            "train_size": 0,
            "val_size": 0,
            "test_size": 0,
            "class_distribution": {}
        }

        for cls_id in range(NUM_CLASSES):
            stats["class_distribution"][GTSRB_CLASSES[cls_id]] = 0

        for name, dir_path in [("train_size", self.train_dir), ("val_size", self.val_dir), ("test_size", self.test_dir)]:
            if os.path.exists(dir_path):
                count = 0
                for cls_id in range(NUM_CLASSES):
                    cls_folder = os.path.join(dir_path, str(cls_id))
                    if os.path.isdir(cls_folder):
                        imgs = [f for f in os.listdir(cls_folder) if os.path.splitext(f)[1].lower() in self.supported_exts]
                        count += len(imgs)
                        if name == "train_size":
                            stats["class_distribution"][GTSRB_CLASSES[cls_id]] += len(imgs)
                stats[name] = count
                stats["total_images"] += count

        return stats
