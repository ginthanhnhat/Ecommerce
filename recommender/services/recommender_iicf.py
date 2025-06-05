import numpy as np
import joblib
import os
from services.model_loader import load_mapping

def normalize_category(category: str) -> str:
    return category.replace(' ', '_')

def load_iicf_model(category: str):
    normalized_category = normalize_category(category)
    model_path = f"models/iiCF_{normalized_category}.pkl"
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model not found at {model_path}")
    return joblib.load(model_path)

def get_iicf_recommendations(user_id: str, item_id: str, category: str, top_k: int = 10):
    model = load_iicf_model(category)
    topk_matrix = model["topk_sparse_matrix"]  # scipy sparse matrix
    mu = model["mu"]  # numpy array, user bias or average

    user2id, item2id, id2item, _ = load_mapping(normalize_category(category))

    if user_id not in user2id:
        raise ValueError(f"User ID '{user_id}' not found.")
    if item_id not in item2id:
        raise ValueError(f"Item ID '{item_id}' not found.")

    user_idx = user2id[user_id]
    item_idx = item2id[item_id]

    # Tính điểm từ top-k item tương tự
    item_scores = topk_matrix[item_idx].toarray().flatten()
    top_indices = np.argsort(-item_scores)[:top_k + 1]  # +1 để loại bỏ chính nó

    recommended_item_ids = []
    for idx in top_indices:
        if idx != item_idx:  # bỏ chính item đầu vào
            recommended_item_ids.append(id2item[idx])
        if len(recommended_item_ids) == top_k:
            break

    return recommended_item_ids
