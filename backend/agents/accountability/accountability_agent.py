from services.accountability_service import AccountabilityService
from database.database import SessionLocal

class AccountabilityAgent:
    name = "Accountability Agent"
    def __init__(self):
        self.service = AccountabilityService()

    def run(self, event):
        if event["type"] != "RISK_ANALYZED":
            return

        print("AccountabilityAgent called")
        print("Analyzing user accountability...")

        db = SessionLocal()

        try:
            intervention = self.service.generate_intervention(
                db,
                event["report"]
            )
            print(intervention)
            from core.event_bus import event_bus
            event_bus.publish(
                {
                    "type": "ACCOUNTABILITY_INTERVENTION",
                    "intervention": intervention
                })

        finally:
            db.close()