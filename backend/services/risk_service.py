from datetime import datetime, timezone
from models.task import Task


class RiskService:

    def analyze(self, db):

        tasks = (
            db.query(Task)
            .filter(Task.completed == False)
            .all()
        )

        now = datetime.now(timezone.utc).replace(tzinfo=None)

        report = {
            "risk_score": 0,
            "overdue_tasks": [],
            "high_risk_tasks": [],
            "warnings": []
        }

        total_risk = 0

        for task in tasks:

            if not task.deadline:
                continue

            remaining_hours = (
                task.deadline - now
            ).total_seconds() / 3600

            estimated_hours = (
                task.estimated_minutes or 0
            ) / 60
            priority_score = {
                "Critical": 20,
                "High": 10,
                "Medium": 5,
                "Low": 0
            }.get(task.priority, 0)
            total_risk += priority_score

            # Already overdue
            if remaining_hours < 0:

                report["overdue_tasks"].append(
                    {
                        "title": task.title,
                        "deadline": str(task.deadline)
                    }
                )

                total_risk += 40
                continue

            # Impossible to finish
            if estimated_hours > remaining_hours:

                report["high_risk_tasks"].append(
                    {
                        "title": task.title,
                        "reason": "Not enough time remaining",
                        "deadline": str(task.deadline),
                        "hours_left": round(remaining_hours, 1),
                        "hours_required": round(
                            estimated_hours,
                            1
                        )
                    }
                )

                total_risk += 30

            # Due today
            elif remaining_hours <= 24:

                report["warnings"].append(
                    {
                        "title": task.title,
                        "reason": "Deadline within 24 hours"
                    }
                )

                total_risk += 10
        pending = len(tasks)
        if pending > 15:
            total_risk += 15
            report["warnings"].append(
                {
                    "reason": "Large backlog of pending tasks"
                }
            )

        today_minutes = sum(
            task.estimated_minutes or 30
            for task in tasks
        )
        if today_minutes > 8 * 60:
            total_risk += 15
            report["warnings"].append(
                {
                    "reason": "Today's workload exceeds 8 hours"
                }
            )
        report["risk_score"] = min(total_risk, 100)
        score = report["risk_score"]
        if score >= 70:
            report["risk_level"] = "High"
        elif score >= 40:
            report["risk_level"] = "Medium"
        else:
            report["risk_level"] = "Low"
        return report