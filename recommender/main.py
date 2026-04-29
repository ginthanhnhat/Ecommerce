from fastapi import FastAPI
from routes import cbf, iicf, uucf, mfcf, hybrid, nbcf #neumf

app = FastAPI(title="Recommender API")

print("Recommender API is running ...")

@app.get("/")
def root():
    return {"message": "Recommender API is running ..."}

app.include_router(cbf.router, prefix="/api/recommend")
app.include_router(iicf.router, prefix="/api/recommend")
app.include_router(uucf.router, prefix="/api/recommend")
app.include_router(mfcf.router, prefix="/api/recommend")
# app.include_router(neumf.router, prefix="/api/recommend")
app.include_router(hybrid.router, prefix="/api/recommend")
app.include_router(nbcf.router, prefix="/api/recommend")

# RUN: uvicorn main:app --reload
