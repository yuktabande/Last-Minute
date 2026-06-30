from fastapi import APIRouter

from integrations.google.classroom import get_classroom_service

router = APIRouter(
    prefix="/classroom",
    tags=["Classroom"],
)


@router.get("/courses")
def courses():

    classroom = get_classroom_service()

    return classroom.courses().list().execute()