from fastapi import APIRouter
from integrations.google.calendar import get_calendar_service

router = APIRouter(prefix="/calendar", tags=["Calendar"])


@router.get("/events")
def events():
    calendar = get_calendar_service()

    return calendar.events().list(
        calendarId="primary",
        maxResults=10,
    ).execute()