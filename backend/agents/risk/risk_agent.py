from services.risk_service import RiskService
from database.database import SessionLocal

class RiskAgent:
    name = "Risk Agent"
    def __init__(self):
        self.risk_service = RiskService()
    def run(self, event):
        if event["type"] != "SCHEDULE_CREATED":
            return
        print("RiskAgent called")
        print("Analyzing schedule risks...")

        db = SessionLocal()

        try:
            report = self.risk_service.analyze(db)
            print(report)
            from core.event_bus import event_bus
            event_bus.publish(
                {
                    "type": "RISK_ANALYZED",
                    "report": report
                }
            )

        finally:
            db.close()