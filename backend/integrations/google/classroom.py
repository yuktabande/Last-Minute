from googleapiclient.discovery import build

from integrations.google.auth_manager import GoogleAuthManager

manager = GoogleAuthManager()


def get_classroom_service():
    credentials = manager.get_credentials()

    return build(
        "classroom",
        "v1",
        credentials=credentials,
    )