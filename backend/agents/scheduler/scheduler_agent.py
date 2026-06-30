from services.scheduler_service import SchedulerService


class SchedulerAgent:

    name = "Scheduler Agent"

    def __init__(self):
        self.scheduler = SchedulerService()

    def run(self, event):

        if event["type"] not in ["DISCOVERY_COMPLETED",
                                 "RESCHEDULE_REQUESTED"]:
            return

        print("SchedulerAgent called")
        print("Running Scheduler Agent")

        schedule = self.scheduler.generate_schedule()

        from core.event_bus import event_bus

        event_bus.publish(
            {
                "type": "SCHEDULE_CREATED",
                "schedule": schedule,
            }
        )