from core.orchestrator import orchestrator

class EventBus:

    def publish(self, event):
        orchestrator.dispatch(event)

event_bus = EventBus()