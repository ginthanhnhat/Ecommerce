import numpy as np
import joblib
import os

from services.model_loader import load_mapping

def normalize_category(category: str) -> str:
    return category.replace(' ', '_')

def load_mfcf_models(category: str):
    normalized_category = normalize_category(category)
    path_sgd = f"models/MF_SGD_{normalized_category}.pkl"
    path_als = f"models/MF_ALS_{normalized_category}.pkl"

    if not os.path.exists(path_sgd):
        raise FileNotFoundError(f"SGD model not found at {path_sgd}")
    if not os.path.exists(path_als):
        raise FileNotFoundError(f"ALS model not found at {path_als}")

    model_sgd = joblib.load(path_sgd)
    model_als = joblib.load(path_als)

    return model_sgd, model_als

def get_mfcf_recommendations(user_id: str, category: str, top_k: int = 10, alpha=0.6, beta=0.4):
    normalized_category = normalize_category(category)
    model_sgd, model_als = load_mfcf_models(category)
    user2id, item2id, id2item, _ = load_mapping(normalized_category)

    if user_id not in user2id:
        raise ValueError(f"User ID '{user_id}' not found.")

    user_idx = user2id[user_id]
    num_items = len(item2id)

    scores = []

    for item_str, item_idx in item2id.items():
        x_sgd = model_sgd["X"][item_idx]
        w_sgd = model_sgd["W"][:, user_idx]
        mu_sgd = model_sgd["mu"][user_idx]

        x_als = model_als["X"][item_idx]
        w_als = model_als["W"][:, user_idx]
        mu_als = model_als["mu"][user_idx]

        pred_sgd = x_sgd.dot(w_sgd) + mu_sgd
        pred_als = x_als.dot(w_als) + mu_als

        pred = alpha * pred_sgd + beta * pred_als
        scores.append((item_str, float(np.clip(pred, 1, 5))))

    # Sắp xếp và chọn top-k item
    top_items = sorted(scores, key=lambda x: -x[1])[:top_k]
    recommended_ids = [item_id for item_id, _ in top_items]

    return recommended_ids
