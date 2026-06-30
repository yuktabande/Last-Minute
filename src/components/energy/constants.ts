export type EnergyLevel = 20 | 40 | 60 | 80 | 100;

export const LEVELS: EnergyLevel[] = [20, 40, 60, 80, 100];

export function snapLevel(value: number): EnergyLevel {
  if (value < 30) return 20;
  if (value < 50) return 40;
  if (value < 70) return 60;
  if (value < 90) return 80;
  return 100;
}

export function energyLabel(level: EnergyLevel) {
  switch (level) {
    case 20:
      return "Rest Day";
    case 40:
      return "Light Work";
    case 60:
      return "Balanced";
    case 80:
      return "Focused";
    case 100:
      return "Peak Mode";
  }
}

export function energyColor(level: EnergyLevel) {
  switch (level) {
    case 20:
      return "#EF4444";
    case 40:
      return "#F97316";
    case 60:
      return "#EAB308";
    case 80:
      return "#3B82F6";
    case 100:
      return "#22C55E";
  }
}
