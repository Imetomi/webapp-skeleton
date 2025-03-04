from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.auth.router import router as auth_router
from app.api.users.router import router as users_router
from app.api.payments.router import router as payments_router
from app.api.blog.router import router as blog_router
from app.api.projects.router import router as projects_router
from app.core.firebase_admin import initialize_firebase_admin

# Initialize Firebase Admin SDK
initialize_firebase_admin()

app = FastAPI(
    title="Webapp Skeleton API",
    description="API for the Webapp Skeleton project",
    version="0.1.0",
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*", "Authorization", "Content-Type"],
    expose_headers=["*"],
    max_age=600,  # Cache preflight requests for 10 minutes
)


@app.get("/")
async def root():
    return {"message": "Welcome to the Webapp Skeleton API"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


# Include API routers
app.include_router(auth_router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(users_router, prefix=f"{settings.API_V1_STR}/users", tags=["users"])
app.include_router(
    payments_router, prefix=f"{settings.API_V1_STR}/payments", tags=["payments"]
)
app.include_router(blog_router, prefix=f"{settings.API_V1_STR}/blog", tags=["blog"])
app.include_router(
    projects_router, prefix=f"{settings.API_V1_STR}/projects", tags=["projects"]
)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
