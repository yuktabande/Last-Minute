from .orchestrator import OrchestratorAgent
from .discovery import DiscoveryAgent
from .scheduler import SchedulerAgent
from .risk import RiskAgent
from .accountability import AccountabilityAgent


def load_agents():
    return [
        OrchestratorAgent(),
        DiscoveryAgent(),
        SchedulerAgent(),
        RiskAgent(),
        AccountabilityAgent(),
    ]