import type { ColorMode, ModePalette } from './themeTypes';

export const modePalettes: Record<ColorMode, ModePalette> = {
  light: {
    background: '#F8F5EF',
    surface: '#FFFCF7',
    textPrimary: '#2C2521',
    textSecondary: '#756A63',
    textDisabled: '#B5ADA7',
    border: '#E4DDD4',
    button: '#3A302A',
    accent: '#76504C',
  },
  dark: {
    background: '#181513',
    surface: '#24201D',
    textPrimary: '#F3EDE4',
    textSecondary: '#B9AEA3',
    textDisabled: '#665D57',
    border: '#3A332E',
    button: '#E9DFD2',
    accent: '#A87570',
  },
};
