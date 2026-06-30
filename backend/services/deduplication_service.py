class DeduplicationService:
    def remove_duplicates(self, tasks):
        unique = []
        seen = set()
        for task in tasks:
            key = (
                task.title.lower(),
                task.deadline,
            )
            if key in seen:
                continue
            seen.add(key)
            unique.append(task)
        return unique