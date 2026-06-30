from core.event import Event
from core.event_bus import event_bus

event = Event(
    type="DISCOVERY_REQUESTED",
    payload={}
)

event_bus.publish(event)