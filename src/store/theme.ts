import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useSyncExternalStore } from "react";

export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "lmls.theme";

let theme: ThemeMode = "light";
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

  const value = await AsyncStorage.getItem(STORAGE_KEY);

  if (value === "light" || value === "dark") {
    theme = value;
  }

  initialized = true;
  emit();
}

async function save() {
  await AsyncStorage.setItem(STORAGE_KEY, theme);
  emit();
}

export function useThemeMode() {
  useEffect(() => {
    load();
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => theme,
    () => "light",
  );
}

export const themeActions = {
  async toggle() {
    theme = theme === "light" ? "dark" : "light";
    await save();
  },

  async set(mode: ThemeMode) {
    theme = mode;
    await save();
  },
};
