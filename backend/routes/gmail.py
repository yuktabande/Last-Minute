from fastapi import APIRouter

from integrations.google.gmail import get_gmail_service

router = APIRouter(
    prefix="/gmail",
    tags=["Gmail"],
)


@router.get("/messages")
def messages():

    gmail = get_gmail_service()

    messages = gmail.users().messages().list(
        userId="me",
        maxResults=10,
    ).execute()

    return messages