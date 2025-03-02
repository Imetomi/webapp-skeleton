import firebase_admin
from firebase_admin import credentials, auth
from app.core.config import settings


def initialize_firebase_admin():
    """Initialize Firebase Admin SDK"""
    if not firebase_admin._apps:
        cred = credentials.Certificate(settings.FIREBASE_SERVICE_ACCOUNT_PATH)
        firebase_admin.initialize_app(cred)


def verify_firebase_token(token: str) -> dict:
    """Verify Firebase ID token and return user info"""
    try:
        decoded_token = auth.verify_id_token(token)
        return {
            "uid": decoded_token["uid"],
            "email": decoded_token.get("email"),
            "name": decoded_token.get("name"),
            "picture": decoded_token.get("picture"),
        }
    except Exception as e:
        raise ValueError(f"Invalid token: {str(e)}")


def create_firebase_user(email: str, password: str):
    """Create a new Firebase user with email and password"""
    try:
        user = auth.create_user(
            email=email,
            password=password,
            email_verified=False,
        )
        return user
    except Exception as e:
        raise ValueError(f"Error creating Firebase user: {str(e)}")


def get_firebase_user_by_email(email: str):
    """Get Firebase user by email"""
    try:
        user = auth.get_user_by_email(email)
        return user
    except auth.UserNotFoundError:
        return None
    except Exception as e:
        raise ValueError(f"Error getting Firebase user: {str(e)}")


def update_firebase_user(uid: str, **kwargs):
    """Update Firebase user properties"""
    try:
        user = auth.update_user(uid, **kwargs)
        return user
    except Exception as e:
        raise ValueError(f"Error updating Firebase user: {str(e)}")


def delete_firebase_user(uid: str):
    """Delete a Firebase user"""
    try:
        auth.delete_user(uid)
        return True
    except Exception as e:
        raise ValueError(f"Error deleting Firebase user: {str(e)}")
