import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useSyncExternalStore } from "react";
import type { Reminder } from "../types";

const STORAGE_KEY = "lmls.reminders.v1";

let reminders: Reminder[] = [];
let initialized = false;

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

async function load() {
  if (initialized) return;

  const raw = await AsyncStorage.getItem(STORAGE_KEY);

  reminders = raw ? JSON.parse(raw) : [];

  initialized = true;

  emit();
}

async function save() {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));

  emit();
}

export function useReminders() {
  useEffect(() => {
    load();
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => reminders,
    () => [],
  );
}

const uid = () => Math.random().toString(36).slice(2);

export const reminderActions = {
  async add(reminder: Omit<Reminder, "id" | "createdAt">) {
    const newReminder: Reminder = {
      ...reminder,
      id: uid(),
      createdAt: new Date().toISOString(),
    };

    reminders = [newReminder, ...reminders];

    await save();
  },

  async remove(id: string) {
    reminders = reminders.filter((r) => r.id !== id);

    await save();
  },
};
