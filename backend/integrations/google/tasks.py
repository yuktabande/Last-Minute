from googleapiclient.discovery import build

from integrations.google.auth_manager import GoogleAuthManager

manager = GoogleAuthManager()


def get_tasks_service():
    credentials = manager.get_credentials()

    return build(
        "tasks",
        "v1",
        credentials=credentials,
    )