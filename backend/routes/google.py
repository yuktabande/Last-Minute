from fastapi import APIRouter, Request, Depends
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
import requests
from datetime import datetime

from database.database import get_db
from integrations.google.oauth import (
    create_google_session,
    AUTHORIZATION_BASE_URL,
    TOKEN_URL,
    get_client_secret,
)
from services.google_service import save_google_account

router = APIRouter(
    prefix="/google",
    tags=["Google"],
)


@router.get("/login")
def login():

    google = create_google_session()

    authorization_url, state = google.authorization_url(
        AUTHORIZATION_BASE_URL,
        access_type="offline",
        prompt="consent",
    )

    return RedirectResponse(authorization_url)


@router.get("/callback")
def callback(
    request: Request,
    db: Session = Depends(get_db),
):

    google = create_google_session()

    token = google.fetch_token(
    TOKEN_URL,
    authorization_response=str(request.url),
    client_secret=get_client_secret(),
    include_client_id=True,
)

    user_info = requests.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        headers={
            "Authorization": f"Bearer {token['access_token']}"
        },
    ).json()

    save_google_account(
        db=db,
        email=user_info["email"],
        access_token=token["access_token"],
        refresh_token=token.get("refresh_token"),
        expiry=datetime.fromtimestamp(token["expires_at"]),
    )

    return {
        "status": "connected",
        "email": user_info["email"],
    }