from googleapiclient.discovery import build

from integrations.google.auth_manager import GoogleAuthManager

manager = GoogleAuthManager()


def get_calendar_service():
    credentials = manager.get_credentials()

    return build(
        "calendar",
        "v3",
        credentials=credentials,
    )