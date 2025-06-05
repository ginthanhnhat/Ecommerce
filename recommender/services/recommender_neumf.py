import os
import numpy as np
from tensorflow.keras.models import load_model
from services.model_loader import load_mapping

def normalize_category(category: str) -> str:
    return category.replace(" ", "_")

def load_neumf_model(category: str):
    normalized_category = normalize_category(category)
    model_path = f"models/NeuMF_{normalized_category}_f16_layers[128, 64, 32, 16]_neg4_model.keras"
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model not found at {model_path}")
    return load_model(model_path)

def get_neumf_recommendations(user_id: str, category: str, top_k: int = 10):
    normalized_category = normalize_category(category)
    model = load_neumf_model(normalized_category)

    user2id, item2id, id2item, _ = load_mapping(normalized_category)

    if user_id not in user2id:
        raise ValueError(f"User ID '{user_id}' not found.")

    user_idx = user2id[user_id]
    all_item_indices = list(range(len(item2id)))

    # Tạo batch input cho model.predict
    user_input = np.full(len(all_item_indices), user_idx)
    item_input = np.array(all_item_indices)

    predictions = model.predict([user_input, item_input], batch_size=512, verbose=0).flatten()
    top_indices = predictions.argsort()[::-1][:top_k]

    recommended_item_ids = [id2item[idx] for idx in top_indices]
    return recommended_item_ids
