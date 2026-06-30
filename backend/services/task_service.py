from datetime import datetime
from sqlalchemy.orm import Session
from models.task import Task
from services.publish_event import publish_event
from utils.events import (
    TASK_CREATED,
    TASK_UPDATED,
    TASK_DELETED,
    TASK_COMPLETED,
)
def create_task(db: Session, data):
    task = Task(
        title=data.title,
        description=data.description,
        priority=data.priority,
        estimated_minutes=data.estimated_minutes,
        percent_complete=0,
        completed=False,
        created_at=datetime.utcnow(),
    )

    db.add(task)
    db.commit()
    db.refresh(task)
    publish_event(
    TASK_CREATED,
    {
        "task_id": task.id,
        "title": task.title,
    },
)

    return task


def get_tasks(db: Session):
    return db.query(Task).all()


def get_task(db: Session, task_id: int):
    return db.query(Task).filter(Task.id == task_id).first()


def delete_task(db: Session, task_id: int):
    task = get_task(db, task_id)

    if not task:
        return None

    db.delete(task)
    db.commit()
    publish_event(
    TASK_DELETED,
    {
        "task_id": task.id,
    },
)

    return task


def update_task(db: Session, task, data):

    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(task, key, value)

    db.commit()
    db.refresh(task)
    publish_event(
    TASK_UPDATED,
    {
        "task_id": task.id,
    },
)

    return task


def update_progress(db: Session, task, percent):

    task.percent_complete = percent

    if percent >= 100:
        task.completed = True

    db.commit()
    db.refresh(task)

    return task


def complete_task(db: Session, task):

    task.completed = True
    task.percent_complete = 100

    db.commit()
    db.refresh(task)
    publish_event(
    TASK_COMPLETED,
    {
        "task_id": task.id,
    },
    )
    return task