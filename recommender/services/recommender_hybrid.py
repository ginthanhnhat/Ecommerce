from collections import Counter, defaultdict
from typing import List

from services.recommender_cbf import get_cbf_recommendations
from services.recommender_iicf import get_iicf_recommendations
from services.recommender_mfcf import get_mfcf_recommendations
from services.recommender_neumf import get_neumf_recommendations
from services.recommender_uucf import get_uucf_recommendations


def get_hybrid_recommendations(user_id: str, category: str, item_id: str, top_k: int = 10) -> List[str]:
    results = defaultdict(float)

    weights = {
        "cbf": 1.0,
        "iicf": 1.0,
        "mfcf": 1.5,
        "neumf": 2.0,
        "uucf": 1.0
    }

    # CBF
    try:
        cbf_items = get_cbf_recommendations(user_id, category, top_k=top_k*2)
        for rank, item in enumerate(cbf_items):
            results[item] += weights["cbf"] * (top_k - rank)
    except Exception:
        pass

    # IICF (nếu có item_id)
    if item_id:
        try:
            iicf_items = get_iicf_recommendations(user_id, item_id, category, top_k=top_k*2)
            for rank, item in enumerate(iicf_items):
                results[item] += weights["iicf"] * (top_k - rank)
        except Exception:
            pass

    # MFCF (SGD + ALS)
    try:
        mfcf_items = get_mfcf_recommendations(user_id, category, top_k=top_k*2)
        for rank, item in enumerate(mfcf_items):
            results[item] += weights["mfcf"] * (top_k - rank)
    except Exception:
        pass

    # NeuMF
    try:
        neumf_items = get_neumf_recommendations(user_id, category, top_k=top_k*2)
        for rank, item in enumerate(neumf_items):
            results[item] += weights["neumf"] * (top_k - rank)
    except Exception:
        pass

    # UUCF (nếu có item_id)
    if item_id:
        try:
            uucf_items = get_uucf_recommendations(user_id, item_id, category, top_k=top_k*2)
            for rank, item in enumerate(uucf_items):
                results[item] += weights["uucf"] * (top_k - rank)
        except Exception:
            pass

    # Tổng hợp và lọc top-k
    ranked_items = sorted(results.items(), key=lambda x: -x[1])
    return [item for item, _ in ranked_items[:top_k]]
