from fastapi import APIRouter
from pydantic import BaseModel
from services.scheduler_service import SchedulerService

router = APIRouter(
    prefix="/ai",
    tags=["AI"],
)


class CheckInRequest(BaseModel):
    mood: str
    energy: int


@router.post("/checkin")
def checkin(data: CheckInRequest):
    return {
        "workload": "Medium",
        "recommendedFocus": 50,
        "breakFrequency": 15,
        "received": data.model_dump(),
    }


@router.post("/generate-day")

def generate_day():
    print("GENERATE DAY CALLED")
    return SchedulerService().generate_schedule()