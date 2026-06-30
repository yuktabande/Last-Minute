from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request

from database.database import SessionLocal
from models.google_account import GoogleAccount

from integrations.google.oauth import (
    CLIENT_ID,
    CLIENT_SECRET,
)


class GoogleAuthManager:

    def get_credentials(self):

        db = SessionLocal()
        print("DB session:",db)
        account = db.query(GoogleAccount).first()
        print("ACCOUNT:", account)
        account = db.query(GoogleAccount).first()

        credentials = Credentials(
            token=account.access_token,
            refresh_token=account.refresh_token,
            token_uri="https://oauth2.googleapis.com/token",
            client_id=CLIENT_ID,
            client_secret=CLIENT_SECRET,
        )

        if credentials.expired:

            credentials.refresh(Request())

            account.access_token = credentials.token

            db.commit()

        return credentials