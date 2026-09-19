import type { Colors } from './colors';

export type Spacing = [number, number?, number?, number?];
export type ThemeColors = Colors;
export type { Colors };

export type ColorMode = 'light' | 'dark';

export type ModePalette = {
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  textDisabled: string;
  border: string;
  button: string;
  accent: string;
};
