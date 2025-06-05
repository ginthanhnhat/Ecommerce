import os
import joblib
import json

MODELS = {}

def load_cbf_model(category: str):
    if category in MODELS:
        return MODELS[category]

    model_path = os.path.join(os.path.dirname(__file__), "..", "models", f"CBF_{category}.pkl")
    model_path = os.path.abspath(model_path)

    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found at: {model_path}")

    model = joblib.load(model_path)
    MODELS[category] = model
    return model

def load_mapping(category: str):
    base_path = os.path.join(os.path.dirname(__file__), "..", "data", category)

    with open(os.path.join(base_path, f"{category}_user2id.json")) as f:
        user2id = json.load(f)
    with open(os.path.join(base_path, f"{category}_item2id.json")) as f:
        item2id = json.load(f)

    id2item = {int(v): k for k, v in item2id.items()}
    id2user = {int(v): k for k, v in user2id.items()}

    return user2id, item2id, id2item, id2user
