from sqlalchemy import case
from database.database import SessionLocal
from models.task import Task
from datetime import datetime, timezone

class SchedulerService:
    def get_reason(self, task):

        if task.priority == "Critical":
            return "🔥 Deadline approaching"

        if task.priority == "High":
            return "⭐ High priority"

        if task.deadline:
            return "📅 Scheduled before deadline"

        return "🧠 Fits today's workload"

    def generate_schedule(self):

        db = SessionLocal()

        tasks = (
            db.query(Task)
            .filter(Task.completed == False)
            .all()
        )
        tasks.sort(
            key=self.score,
            reverse=True,
        )

        start_hour = 9
        schedule = []

        for task in tasks:
            if start_hour >= 18:
                break

            schedule.append(
                {
                    "order": len(schedule) + 1,
                    "start": f"{start_hour:02d}:00",
                    "task_id": task.id,
                    "title": task.title,
                    "priority": task.priority,
                    "duration": task.estimated_minutes,
                    "deadline": task.deadline,
                    "reason": self.get_reason(task),
                }
            )
            estimated = task.estimated_minutes or 30
            duration = max(1, estimated // 60)
            start_hour += duration

        db.close()

        return {
            "today_plan": schedule,
            "total": len(schedule),
        }
    def score(self, task):
        score = 0
        priority = {
            "Critical": 100,
            "High": 70,
            "Medium": 40,
            "Low": 10,
        }
        score += priority.get(task.priority, 0)
        now = datetime.now()
        if task.deadline:
            deadline = task.deadline
            if deadline.tzinfo is not None:
                deadline = deadline.replace(tzinfo=None)
            days = (deadline - now).days
            if days <= 0:
                score += 100
            elif days <= 2:
                score += 60
            elif days <= 7:
                score += 20
        score += (task.confidence or 0) * 20
        score -= (task.estimated_minutes or 30) / 10

        return score