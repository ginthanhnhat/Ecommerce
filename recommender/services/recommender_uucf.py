import numpy as np
import joblib
import os
from services.model_loader import load_mapping

def normalize_category(category: str) -> str:
    return category.replace(' ', '_')

def estimate_rating(user_id, item_id, model_data, rating_dict):
    topk_sparse_matrix = model_data["topk_sparse_matrix"]
    mu = model_data["mu"]

    if user_id >= topk_sparse_matrix.shape[0]:
        return mu[user_id]

    row = topk_sparse_matrix.getrow(user_id)
    top_sims, top_ratings = [], []

    for v, sim in zip(row.indices, row.data):
        rating = rating_dict.get((v, item_id))
        if rating is not None:
            top_sims.append(sim)
            top_ratings.append(rating)

    if len(top_sims) == 0 or np.sum(np.abs(top_sims)) == 0:
        return mu[user_id]

    rating_hat = np.dot(top_sims, top_ratings) / np.sum(np.abs(top_sims))
    return float(np.clip(rating_hat + mu[user_id], 1, 5))

def get_uucf_recommendations(user_id: str, item_id: str, category: str, top_k: int = 10):
    category_norm = normalize_category(category)

    # Load model
    model_path = f"models/uuCF_{category_norm}.pkl"
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found: {model_path}")
    
    model_data = joblib.load(model_path)
    topk_sparse_matrix = model_data["topk_sparse_matrix"]
    mu = model_data["mu"]

    # Load mappings
    user2id, item2id, id2item, _ = load_mapping(category_norm)

    if user_id not in user2id:
        raise ValueError(f"User ID '{user_id}' not found in mapping.")
    if item_id not in item2id:
        raise ValueError(f"Item ID '{item_id}' not found in mapping.")

    u_idx = user2id[user_id]
    rated_items = set()

    # Giả lập lookup từ dữ liệu gốc (từ train)
    rating_dict = {}
    for (uidx, iidx), _ in np.ndenumerate(topk_sparse_matrix.toarray()):
        if iidx < topk_sparse_matrix.shape[1]:
            rating_dict[(uidx, iidx)] = None  # chỉ cần cho đúng cấu trúc

    # Xếp hạng các item khác chưa được đánh giá
    scores = []
    for raw_item_id, idx in item2id.items():
        if idx == item2id[item_id]:
            continue
        try:
            score = estimate_rating(u_idx, idx, model_data, rating_dict)
            scores.append((raw_item_id, score))
        except:
            continue

    scores.sort(key=lambda x: -x[1])
    return [item_id for item_id, _ in scores[:top_k]]
