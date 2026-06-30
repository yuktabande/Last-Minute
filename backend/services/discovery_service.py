from integrations.google.gmail import get_gmail_service
from integrations.google.calendar import get_calendar_service
from integrations.google.classroom import get_classroom_service
from integrations.google.tasks import get_tasks_service

from schemas.discovery_schema import DiscoveryItem


class DiscoveryService:

    def collect_gmail(self):
        print("Collecting Gmail...")
        gmail = get_gmail_service()

        response = gmail.users().messages().list(
            userId="me",
            maxResults=25,
        ).execute()

        items = []

        for message in response.get("messages", []):

            msg = gmail.users().messages().get(
                userId="me",
                id=message["id"],
                format="metadata",
            ).execute()

            headers = {
                h["name"]: h["value"]
                for h in msg["payload"]["headers"]
            }

            items.append(
                DiscoveryItem(
                    source="gmail",
                    external_id=message["id"],
                    title=headers.get("Subject", ""),
                    description=headers.get("From", ""),
                    created_at=None,
                    deadline=None,
                    metadata=msg,
                )
            )

        return items

    def collect_calendar(self):
        print("Collecting Calendar...")
        calendar = get_calendar_service()

        response = calendar.events().list(
            calendarId="primary",
            maxResults=25,
            singleEvents=True,
            orderBy="startTime",
        ).execute()

        items = []

        for event in response.get("items", []):

            items.append(
                DiscoveryItem(
                    source="calendar",
                    external_id=event["id"],
                    title=event.get("summary", ""),
                    description=event.get("description", ""),
                    created_at=None,
                    deadline=None,
                    metadata=event,
                )
            )

        return items

    def collect_classroom(self):
        print("Collecting Classroom...")
        classroom = get_classroom_service()

        response = classroom.courses().list().execute()

        items = []

        for course in response.get("courses", []):

            items.append(
                DiscoveryItem(
                    source="classroom",
                    external_id=course["id"],
                    title=course["name"],
                    description=course.get("descriptionHeading", ""),
                    created_at=None,
                    deadline=None,
                    metadata=course,
                )
            )

        return items

    def collect_tasks(self):
        print("Collecting Google Tasks...")
        tasks = get_tasks_service()

        task_lists = tasks.tasklists().list().execute()

        items = []

        for tasklist in task_lists.get("items", []):

            task_response = tasks.tasks().list(
                tasklist=tasklist["id"]
            ).execute()

            for task in task_response.get("items", []):

                items.append(
                    DiscoveryItem(
                        source="google_tasks",
                        external_id=task["id"],
                        title=task.get("title", ""),
                        description=task.get("notes", ""),
                        created_at=None,
                        deadline=None,
                        metadata=task,
                    )
                )

        return items

    def collect(self):

        data = []

        data.extend(self.collect_gmail())
        data.extend(self.collect_calendar())
        data.extend(self.collect_classroom())
        data.extend(self.collect_tasks())
        print(f"Total collected: {len(data)}")
        return data