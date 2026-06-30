from models.task import Task


class AccountabilityService:

    def generate_intervention(self, db, report):

        pending = (
            db.query(Task)
            .filter(Task.completed == False)
            .count()
        )

        if report["risk_score"] >= 70:

            return {
                "level": "HIGH",
                "message":
                    "You're at high risk of missing one or more deadlines. "
                    "Stop taking on new work and focus on your critical tasks first.",
                "pending_tasks": pending
            }

        if report["risk_score"] >= 40:

            return {
                "level": "MEDIUM",
                "message":
                    "Your workload is increasing. Completing one critical task now "
                    "will significantly reduce your overall risk.",
                "pending_tasks": pending
            }

        return {
            "level": "LOW",
            "message":
                "You're currently on track. Keep following today's schedule.",
            "pending_tasks": pending
        }