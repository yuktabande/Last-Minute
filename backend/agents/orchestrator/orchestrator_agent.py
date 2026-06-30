class OrchestratorAgent:

    name = "Orchestrator Agent"

    def run(self, event):

        event_type = event["type"]

        print("\n========== ORCHESTRATOR ==========")
        print(f"Received: {event_type}")

        if event_type == "DISCOVERY_COMPLETED":
            print("Discovery finished successfully.")

        elif event_type == "SCHEDULE_CREATED":
            print("Schedule generated.")

        elif event_type == "RISK_ANALYZED":

            report = event["report"]
            score = report["risk_score"]

            print(f"Risk Score: {score}")

            if score >= 80:

                print("Very high risk detected.")
                print("Requesting schedule rebuild...")

                from core.event_bus import event_bus

                event_bus.publish(
                    {
                        "type": "RESCHEDULE_REQUESTED"
                    }
                )

        elif event_type == "ACCOUNTABILITY_INTERVENTION":

            intervention = event["intervention"]

            print("Intervention created:")
            print(intervention)

        print("==================================\n")