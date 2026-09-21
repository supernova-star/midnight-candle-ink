import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from 'react';
import { colorPalette } from '@/theme/colors';
import { modePalettes } from '@/theme/palette';
import type { ColorMode } from '@/theme/themeTypes';
import {
  MIDNIGHT_CANDLE_BACKGROUND_DARK_URL,
  MIDNIGHT_CANDLE_BACKGROUND_LIGHT_URL,
} from '@/constants/assets';

export type { ColorMode } from '@/theme/themeTypes';

type ThemeManagerContextValue = {
  mode: ColorMode;
  toggleMode: () => void;
};

const ThemeManagerContext = createContext<ThemeManagerContextValue | null>(
  null,
);

const getInitialMode = (): ColorMode =>
  window.localStorage.getItem('color-mode') === 'light' ? 'light' : 'dark';

const sharedVariables = {
  // Existing
  '--home-text': colorPalette.homeTextDark,
  '--action-background': colorPalette.actionDark,
  '--action-background-hover': colorPalette.actionDarkHover,
  '--action-border': colorPalette.actionBorderDark,
  '--action-text': colorPalette.homeTextDark,

  // Admin
  '--admin-background': colorPalette.adminColors.background,
  '--admin-surface': colorPalette.adminColors.surface,
  '--admin-surface-hover': colorPalette.adminColors.surfaceHover,

  '--admin-text-primary': colorPalette.adminColors.textPrimary,
  '--admin-text-secondary': colorPalette.adminColors.textSecondary,
  '--admin-text-muted': colorPalette.adminColors.textMuted,

  '--admin-brand': colorPalette.adminColors.brand,
  '--admin-brand-dark': colorPalette.adminColors.brandDark,
  '--admin-accent': colorPalette.adminColors.accent,
  '--admin-accent-hover': colorPalette.adminColors.accentHover,
  '--admin-accent-soft': colorPalette.adminColors.accentSoft,

  '--admin-border': colorPalette.adminColors.border,
  '--admin-border-strong': colorPalette.adminColors.borderStrong,

  '--admin-button-primary': colorPalette.adminColors.buttonPrimary,
  '--admin-button-primary-hover': colorPalette.adminColors.buttonPrimaryHover,
  '--admin-button-primary-text': colorPalette.adminColors.buttonPrimaryText,

  '--admin-icon': colorPalette.adminColors.icon,
  '--admin-icon-muted': colorPalette.adminColors.iconMuted,
  '--admin-icon-background': colorPalette.adminColors.iconBackground,

  '--admin-success': colorPalette.adminColors.success,
  '--admin-success-background': colorPalette.adminColors.successBackground,
  '--admin-success-border': colorPalette.adminColors.successBorder,
  '--admin-success-text': colorPalette.adminColors.successText,

  '--admin-danger': colorPalette.adminColors.danger,
  '--admin-danger-background': colorPalette.adminColors.dangerBackground,
  '--admin-danger-border': colorPalette.adminColors.dangerBorder,
  '--admin-danger-text': colorPalette.adminColors.dangerText,

  '--admin-table-header': colorPalette.adminColors.tableHeader,
  '--admin-table-row': colorPalette.adminColors.tableRow,
  '--admin-table-row-hover': colorPalette.adminColors.tableRowHover,

  '--admin-feedback-background': colorPalette.adminColors.feedbackBackground,
  '--admin-feedback-border': colorPalette.adminColors.feedbackBorder,
} as const;

const getModeVariables = (mode: ColorMode) => {
  const palette = modePalettes[mode];
  const feedback = colorPalette.feedbackColors[mode];

  return {
    '--background': palette.background,
    '--surface': palette.surface,
    '--text-primary': palette.textPrimary,
    '--text-secondary': palette.textSecondary,
    '--text-disabled': palette.textDisabled,
    '--border': palette.border,
    '--button': palette.button,
    '--accent': palette.accent,
    '--accent-selected': colorPalette.accentSelected,

    '--button-primary-bg': palette.buttonPrimaryBG,
    '--button-primary-text': palette.buttonPrimaryText,
    '--button-disabled-bg': palette.buttonDisabledBG,
    '--button-disabled-text': palette.buttonDisabledText,
    '--button-hover-bg': palette.buttonHoverBG,
    '--button-hover-text': palette.buttonHoverText,

    // Feedback
    '--feedback-success-background': feedback.success.background,
    '--feedback-success-border': feedback.success.border,
    '--feedback-success-text': feedback.success.text,
    '--feedback-success-icon': feedback.success.icon,

    '--feedback-error-background': feedback.error.background,
    '--feedback-error-border': feedback.error.border,
    '--feedback-error-text': feedback.error.text,
    '--feedback-error-icon': feedback.error.icon,

    '--home-text-shadow':
      mode === 'dark'
        ? '0 2px 4px rgba(0, 0, 0, 0.72)'
        : '0 1px 3px rgba(255, 252, 247, 0.85)',

    '--background-image-position':
      mode === 'dark' ? '30% center' : '85% center',

    '--background-image-position-tablet':
      mode === 'dark' ? '30% center' : '90% center',

    '--home-background-image': `url(${
      mode === 'dark'
        ? MIDNIGHT_CANDLE_BACKGROUND_DARK_URL
        : MIDNIGHT_CANDLE_BACKGROUND_LIGHT_URL
    })`,
    '--home-overlayGradient':
      mode === 'dark'
        ? `linear-gradient(
          180deg,
          rgba(12, 10, 9, 0.42) 0%,
          rgba(12, 10, 9, 0.34) 48%,
          rgba(12, 10, 9, 0.56) 100%
        )`
        : `linear-gradient(
        180deg,
        rgba(255, 252, 247, 0.08) 0%,
        rgba(255, 252, 247, 0.02) 48%,
        rgba(255, 252, 247, 0.24) 100%
      )`,
  } as const;
};

type ThemeManagerProps = {
  children: React.ReactNode;
};

export const ThemeManager: React.FC<ThemeManagerProps> = ({ children }) => {
  const [mode, setMode] = useState<ColorMode>(getInitialMode);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const variables = { ...sharedVariables, ...getModeVariables(mode) };

    root.dataset.theme = mode;
    root.style.colorScheme = mode;
    window.localStorage.setItem('color-mode', mode);

    Object.entries(variables).forEach(([name, value]) => {
      root.style.setProperty(name, value);
    });
  }, [mode]);

  const toggleMode = () => {
    setMode((currentMode) => (currentMode === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeManagerContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeManagerContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ThemeManagerContext);

  if (!context) {
    throw new Error('useThemeMode must be used within ThemeManager');
  }

  return context;
};
