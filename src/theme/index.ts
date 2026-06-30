import { useThemeMode } from "../store/theme";
import { Dark, Light } from "./colors";

export function useTheme() {
  const mode = useThemeMode();

  return mode === "dark" ? Dark : Light;
}
