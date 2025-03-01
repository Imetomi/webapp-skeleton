from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.dependencies import get_current_user, get_db
from app.core.security import create_access_token, get_password_hash, verify_password
from app.db.models.user import User
from app.schemas.token import Token
from app.schemas.user import User as UserSchema
from app.schemas.user import UserCreate, UserLogin, GoogleLogin
from app.core.firebase_admin import verify_firebase_token, initialize_firebase_admin

router = APIRouter()


@router.post("/login", response_model=Token)
def login(
    db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests.
    """
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user"
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": create_access_token(
            subject=user.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }


@router.post("/login/email", response_model=Token)
def login_email(user_in: UserLogin, db: Session = Depends(get_db)) -> Any:
    """
    Login with email and password.
    """
    user = db.query(User).filter(User.email == user_in.email).first()
    if not user or not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user"
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": create_access_token(
            subject=user.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }


@router.post("/register", response_model=Token)
def register(user_in: UserCreate, db: Session = Depends(get_db)) -> Any:
    """
    Register a new user.
    """
    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    new_user = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        full_name=user_in.full_name,
        is_active=True,
        is_superuser=False,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": create_access_token(
            subject=new_user.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }


@router.post("/google", response_model=Token)
def google_login(google_in: GoogleLogin, db: Session = Depends(get_db)) -> Any:
    """
    Login with Google ID token.
    """
    try:
        # Initialize Firebase Admin SDK
        initialize_firebase_admin()

        # Verify the ID token
        user_info = verify_firebase_token(google_in.id_token)

        # Check if user exists in our database
        user = db.query(User).filter(User.firebase_uid == user_info["uid"]).first()

        # If user doesn't exist, create them
        if not user:
            user = User(
                email=user_info["email"],
                full_name=user_info.get("name"),
                firebase_uid=user_info["uid"],
                is_active=True,
                is_superuser=False,
            )
            db.add(user)
            db.commit()
            db.refresh(user)

        # Create access token
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        return {
            "access_token": create_access_token(
                subject=user.id, expires_delta=access_token_expires
            ),
            "token_type": "bearer",
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid authentication credentials: {str(e)}",
        )


@router.get("/me", response_model=UserSchema)
async def get_me(
    current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)
):
    """
    Get current user information
    """
    # Check if user exists in our database
    user = db.query(User).filter(User.firebase_uid == current_user["uid"]).first()

    # If user doesn't exist, create them
    if not user:
        user = User(
            email=current_user["email"],
            full_name=current_user["name"],
            firebase_uid=current_user["uid"],
            is_active=True,
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    return user
