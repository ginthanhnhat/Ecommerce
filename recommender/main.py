from fastapi import FastAPI
from routes import cbf

app = FastAPI(title="Recommender API")

print("Recommender API is running ...")
app.include_router(cbf.router, prefix="/api/recommend")

# RUN: uvicorn main:app --reload
