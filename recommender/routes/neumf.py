from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.recommender_neumf import get_neumf_recommendations

router = APIRouter()

class NeuMFRequest(BaseModel):
    user_id: str
    category: str
    top_k: int = 10

@router.post("/neumf")
def recommend_neumf(request: NeuMFRequest):
    try:
        recommendations = get_neumf_recommendations(
            user_id=request.user_id,
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
