from agents import load_agents


class Registry:

    def __init__(self):

        self.agents = load_agents()

    def all(self):

        return self.agents


registry = Registry()