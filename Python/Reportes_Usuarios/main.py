from fastapi import FastAPI
from src.controllers.reportes_usuarios_routes import router as reportes_router
import uvicorn


app = FastAPI()

app.include_router(reportes_router)


if __name__ == '__main__':    
    uvicorn.run("main:app", host="0.0.0.0", port=5000)