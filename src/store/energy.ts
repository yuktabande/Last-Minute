import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useSyncExternalStore } from "react";
import type { EnergyEntry } from "../types";

const STORAGE_KEY = "lmls.energy.v1";

let energy: EnergyEntry | null = null;
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

  energy = raw ? JSON.parse(raw) : null;

  initialized = true;

  emit();
}

async function save() {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(energy));

  emit();
}

export function useEnergy() {
  useEffect(() => {
    load();
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => energy,
    () => null,
  );
}

export const energyActions = {
  async set(level: 20 | 40 | 60 | 80 | 100) {
    energy = {
      level,
      date: new Date().toISOString().slice(0, 10),
      setAt: new Date().toISOString(),
    };

    await save();
  },
};
