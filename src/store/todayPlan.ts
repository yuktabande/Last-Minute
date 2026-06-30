import { useEffect, useSyncExternalStore } from "react";
import { api } from "../../utils/api";

let todayPlan: any[] = [];
let initialized = false;

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export async function refreshTodayPlan() {
  try {
    const data = await api("/schedule/");
    todayPlan = data.today_plan ?? [];
  } catch (err) {
    console.error(err);
    todayPlan = [];
  }

  emit();
}

async function loadTodayPlan() {
  if (initialized) return;

  await refreshTodayPlan();

  initialized = true;
}

export function useTodayPlan() {
  useEffect(() => {
    loadTodayPlan();
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => todayPlan,
    () => [],
  );
}
