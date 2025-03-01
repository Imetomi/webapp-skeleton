from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Webapp Skeleton API",
    description="API for the Webapp Skeleton project",
    version="0.1.0",
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to the Webapp Skeleton API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Import and include API routers
# from app.api.auth import router as auth_router
# from app.api.users import router as users_router
# from app.api.payments import router as payments_router
# from app.api.blog import router as blog_router

# app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
# app.include_router(users_router, prefix="/api/users", tags=["users"])
# app.include_router(payments_router, prefix="/api/payments", tags=["payments"])
# app.include_router(blog_router, prefix="/api/blog", tags=["blog"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
