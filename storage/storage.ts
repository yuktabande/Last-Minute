import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
  tasks: "lmls.tasks.v1",
  reminders: "lmls.reminders.v1",
  energy: "lmls.energy.v1",
  streak: "lmls.streak.v1",
  profile: "lmls.profile.v1",
  theme: "lmls.theme.v1",
} as const;

/**
 * Read any object from AsyncStorage
 */
export async function loadData<T>(key: string, fallback: T): Promise<T> {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value === null) {
      return fallback;
    }

    return JSON.parse(value) as T;
  } catch (error) {
    console.error(`Error reading ${key}`, error);
    return fallback;
  }
}

/**
 * Save any object to AsyncStorage
 */
export async function saveData<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key}`, error);
  }
}

/**
 * Remove one key
 */
export async function removeData(key: string) {
  await AsyncStorage.removeItem(key);
}

/**
 * Clear everything
 */
export async function clearStorage() {
  await AsyncStorage.clear();
}
