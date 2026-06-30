from core.registry import registry


class Orchestrator:

    def __init__(self):
        self.agents = registry

    def dispatch(self, event):
        for agent in self.agents:
            agent.run(event)


orchestrator = Orchestrator()