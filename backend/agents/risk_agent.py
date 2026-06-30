from core.base_agent import BaseAgent

class RiskAgent(BaseAgent):
    name = "Risk Agent"

    def can_handle(self, event):
        return event.type == "TASK_COMPLETED"

    def execute(self, event):
        print("RiskAgent received:", event.type)
        print(event.payload)