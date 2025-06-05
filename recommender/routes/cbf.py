from fastapi import APIRouter
from pydantic import BaseModel
from services.recommender_cbf import get_cbf_recommendations

router = APIRouter()

class CBFRequest(BaseModel):
    user_id: str
    category: str
    top_k: int = 10

@router.post("/cbf")
def recommend(request: CBFRequest):
    try:
        recommendations = get_cbf_recommendations(
            user_id=request.user_id,
            category=request.category,
            top_k=request.top_k
        )
        return recommendations
    except Exception as e:
        return {"error": str(e)}
