import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useSyncExternalStore } from "react";
import type { StreakState } from "../types";

const STORAGE_KEY = "lmls.streak.v1";

let streak: StreakState = {
  count: 0,
  history: [],
};

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

  if (raw) {
    streak = JSON.parse(raw);
  }

  initialized = true;
  emit();
}

async function save() {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(streak));

  emit();
}

export function useStreak() {
  useEffect(() => {
    load();
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => streak,
    () => ({
      count: 0,
      history: [],
    }),
  );
}

export const streakActions = {
  async completeToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayStr = today.toISOString().slice(0, 10);

    if (streak.lastCompletedDate === todayStr) {
      return {
        awarded: false,
        count: streak.count,
      };
    }

    if (!streak.lastCompletedDate) {
      streak.count = 1;
    } else {
      const last = new Date(streak.lastCompletedDate);
      last.setHours(0, 0, 0, 0);

      const diffDays = Math.floor(
        (today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (diffDays === 1) {
        streak.count += 1;
      } else {
        streak.count = 1;
      }
    }

    streak.lastCompletedDate = todayStr;

    streak.history.unshift({
      date: todayStr,
      completed: true,
    });

    await save();

    return {
      awarded: true,
      count: streak.count,
    };
  },
};
