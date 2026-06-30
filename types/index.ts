export type Priority = "low" | "med" | "high";

export interface Task {
  id: number;
  title: string;
  description?: string;
  priority?: Priority;

  estimatedMinutes: number;
  completedMinutes: number;

  deadline?: string;

  createdAt: string;
  startedAt?: string;
  startedPhoto?: string;
  completedAt?: string;

  percentComplete: number;
}

export interface Reminder {
  id: string;
  title: string;

  time?: string;
  date?: string;

  repeat: boolean;
  repeatLabel?: string;

  silent: boolean;

  createdAt: string;
}

export interface EnergyEntry {
  date: string;
  level: 20 | 40 | 60 | 80 | 100;
  setAt: string;
}

export interface Profile {
  name: string;
  avatar?: string;
}

export interface StreakState {
  count: number;
  lastCompletedDate?: string;

  history: {
    date: string;
    completed: boolean;
  }[];
}
