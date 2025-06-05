import numpy as np
from services.model_loader import load_cbf_model, load_mapping

def normalize_category(category: str) -> str:
    return category.replace(' ', '_')

def get_cbf_recommendations(user_id: str, category: str, top_k: int = 10):
    
    normalized_category = normalize_category(category)
    
    model = load_cbf_model(normalized_category)
    W = model["W"]
    b = model["b"]
    X = model["X"]
    tfidf = model["tfidf"]
    items = model["items"]  # DataFrame với cột 'item_id' là ID số

    user2id, item2id, id2item, _ = load_mapping(normalized_category)

    if user_id not in user2id:
        raise ValueError(f"User ID '{user_id}' not found in user2id mapping.")

    user_idx = user2id[user_id]

    scores = X @ W[:, user_idx] + b[user_idx]
    top_indices = np.argsort(-scores)[:top_k]

    recommended_ids = items.iloc[top_indices]["item_id"].tolist()
    recommended_items = [id2item[item_id] for item_id in recommended_ids]

    return recommended_items  # Trả về list[str]
