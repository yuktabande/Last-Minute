from abc import ABC, abstractmethod
from core.event import Event

class BaseAgent(ABC):

    name = "BaseAgent"

    @abstractmethod
    def can_handle(self, event: Event) -> bool:
        pass

    @abstractmethod
    def execute(self, event: Event):
        pass