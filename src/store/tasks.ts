import { useEffect, useSyncExternalStore } from "react";
import { api } from "../../utils/api";
import type { Task } from "../types";
import { refreshTodayPlan } from "./todayPlan";
let tasks: Task[] = [];
let initialized = false;

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export async function refreshTasks() {
  try {
    const data = await api("/tasks/");
    console.log("TASKS FROM API:", data);

    tasks = data.map((t: any) => ({
      id: t.id,
      title: t.title,
      description: t.description,
      priority: t.priority?.toLowerCase(),

      estimatedMinutes: t.estimated_minutes ?? 30,
      completedMinutes:
        ((t.percent_complete ?? 0) / 100) * (t.estimated_minutes ?? 30),

      deadline: t.deadline,

      createdAt: t.created_at,
      startedAt: t.started_at,
      startedPhoto: t.started_photo,
      completedAt: t.completed_at,

      percentComplete: t.percent_complete ?? 0,
    }));
  } catch (err) {
    console.error(err);
    tasks = [];
  }

  emit();
}

async function load() {
  if (initialized) return;

  await refreshTasks();

  initialized = true;
}

export function useTasks() {
  useEffect(() => {
    load();
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => tasks,
    () => [],
  );
}
const deleting = new Set<number>();
export const taskActions = {
  async add(task: Omit<Task, "id">) {
    await api("/tasks/", {
      method: "POST",
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        priority:
          task.priority === "high"
            ? "High"
            : task.priority === "med"
              ? "Medium"
              : "Low",
        estimated_minutes: task.estimatedMinutes,
      }),
    });

    await api("/ai/generate-day", {
      method: "POST",
    });

    await Promise.all([refreshTasks(), refreshTodayPlan()]);
  },
  async remove(id: number) {
    if (deleting.has(id)) return;

    deleting.add(id);

    try {
      await api(`/tasks/${id}`, {
        method: "DELETE",
      });

      await api("/ai/generate-day", {
        method: "POST",
      });

      await Promise.all([refreshTasks(), refreshTodayPlan()]);
    } finally {
      deleting.delete(id);
    }
  },
  async setProgress(id: number, percent: number) {
    await api(`/tasks/${id}/progress`, {
      method: "PATCH",
      body: JSON.stringify({
        percent_complete: percent,
      }),
    });

    await api("/ai/generate-day", {
      method: "POST",
    });

    await Promise.all([refreshTasks(), refreshTodayPlan()]);
  },
};
