from fastapi import APIRouter
from services.scheduler_service import SchedulerService

router = APIRouter(
    prefix="/schedule",
    tags=["Schedule"]
)


@router.get("/")
def get_schedule():
    return SchedulerService().generate_schedule()