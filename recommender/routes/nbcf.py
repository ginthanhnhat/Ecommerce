from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.recommender_uucf import get_uucf_recommendations
from services.recommender_iicf import get_iicf_recommendations

router = APIRouter()

class NBCFRequest(BaseModel):
    user_id: str
    item_id: str
    category: str
    top_k: int = 10
    alpha: float = 0.5  # tỉ trọng UUCF (1 - alpha là tỉ trọng IICF)

@router.post("/nbcf")
def recommend_nbcf(request: NBCFRequest):
    try:
        uucf_results = get_uucf_recommendations(
            user_id=request.user_id,
            item_id=request.item_id,
            category=request.category,
            top_k=request.top_k * 2  # lấy nhiều hơn để trộn rồi lọc lại
        )
        iicf_results = get_iicf_recommendations(
            user_id=request.user_id,
            item_id=request.item_id,
            category=request.category,
            top_k=request.top_k * 2
        )

        # Kết hợp điểm
        score_dict = {}

        for idx, item in enumerate(uucf_results):
            score = (1 - request.alpha) * (1 - idx / len(uucf_results))
            score_dict[item] = score_dict.get(item, 0) + score

        for idx, item in enumerate(iicf_results):
            score = request.alpha * (1 - idx / len(iicf_results))
            score_dict[item] = score_dict.get(item, 0) + score

        # Sắp xếp và lấy top_k
        sorted_items = sorted(score_dict.items(), key=lambda x: -x[1])
        recommendations = [item for item, _ in sorted_items[:request.top_k]]
        return recommendations

    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Error: {str(e)}")
