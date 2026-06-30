from sqlalchemy.orm import Session
from sqlalchemy import func
from models.task import Task
from datetime import datetime, timezone

class DiscoveryTaskService:
    def save_tasks(self, db: Session, tasks):
        print("Incoming tasks:", len(tasks))
        saved = []
        for task in tasks:
            existing = (
                db.query(Task)
                .filter(
                    func.lower(Task.title) == task.title.lower()
                )
                .first()
            )
            print(task.title)
            if existing:

                existing.description = task.description
                existing.category = task.category
                existing.priority = task.priority
                existing.difficulty = task.difficulty
                existing.deadline = task.deadline
                existing.estimated_minutes = task.estimated_minutes 
                existing.confidence = task.confidence

                continue

            new_task = Task(
                title=task.title,
                description=task.description,
                category=task.category,
                priority=task.priority,
                difficulty=task.difficulty,
                deadline=task.deadline,
                estimated_minutes=task.estimated_minutes,
                confidence=task.confidence,
                source="discovery",
                created_at=datetime.now(timezone.utc),
            )
            db.add(new_task)
            saved.append(new_task)
            print("New tasks to save:", len(saved))
        db.commit()
        print("DB count:", db.query(Task).count())
        return saved