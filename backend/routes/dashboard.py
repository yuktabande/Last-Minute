from fastapi import APIRouter
from database.database import SessionLocal
from models.task import Task
from services.scheduler_service import SchedulerService

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/")
def dashboard():

    db = SessionLocal()

    tasks = db.query(Task).all()

    schedule = SchedulerService().generate_schedule()

    stats = {
        "total_tasks": len(tasks),
        "completed": len([t for t in tasks if t.completed]),
        "pending": len([t for t in tasks if not t.completed]),
    }

    db.close()

    return {
        "tasks": tasks,
        "today_plan": schedule["today_plan"][:3],
        "stats": stats,
    }