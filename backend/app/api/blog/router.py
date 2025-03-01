from typing import Any, Dict, List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_active_superuser, get_current_user, get_db
from app.db.models.user import User

router = APIRouter()


@router.get("/articles", response_model=List[Dict[str, Any]])
def get_articles(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 10,
) -> Any:
    """
    Retrieve blog articles.
    This is a placeholder for Strapi CMS integration.
    """
    # TODO: Implement Strapi CMS integration
    # In a real implementation, you would fetch articles from Strapi CMS

    # For now, return a placeholder list
    return [
        {
            "id": 1,
            "title": "Getting Started with Webapp Skeleton",
            "slug": "getting-started",
            "content": "This is a placeholder article content.",
            "published_at": "2023-01-01T00:00:00Z",
            "author": "Admin",
        }
    ]


@router.get("/articles/{slug}", response_model=Dict[str, Any])
def get_article(
    slug: str,
    db: Session = Depends(get_db),
) -> Any:
    """
    Retrieve a specific blog article by slug.
    This is a placeholder for Strapi CMS integration.
    """
    # TODO: Implement Strapi CMS integration
    # In a real implementation, you would fetch the article from Strapi CMS

    # For now, return a placeholder article
    if slug == "getting-started":
        return {
            "id": 1,
            "title": "Getting Started with Webapp Skeleton",
            "slug": "getting-started",
            "content": "This is a placeholder article content.",
            "published_at": "2023-01-01T00:00:00Z",
            "author": "Admin",
        }

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Article not found",
    )
