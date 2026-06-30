from fastapi import APIRouter

from integrations.google.tasks import get_tasks_service

router = APIRouter(
    prefix="/google-tasks",
    tags=["Google Tasks"],
)


@router.get("/lists")
def task_lists():

    tasks = get_tasks_service()

    return tasks.tasklists().list().execute()