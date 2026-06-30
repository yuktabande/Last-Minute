from googleapiclient.discovery import build

from integrations.google.auth_manager import GoogleAuthManager


manager = GoogleAuthManager()


def get_gmail_service():

    credentials = manager.get_credentials()

    return build(
        "gmail",
        "v1",
        credentials=credentials,
    )