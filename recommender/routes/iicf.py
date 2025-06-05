from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.recommender_iicf import get_iicf_recommendations

router = APIRouter()

class IICFRequest(BaseModel):
    user_id: str
    item_id: str
    category: str
    top_k: int = 10

@router.post("/iicf")
def recommend_iicf(request: IICFRequest):
    try:
        recommendations = get_iicf_recommendations(
            user_id=request.user_id,
            item_id=request.item_id,
            category=request.category,
            top_k=request.top_k
        )
        return recommendations
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Error: {str(e)}")
