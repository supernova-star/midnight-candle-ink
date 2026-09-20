import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from 'react';
import { colorPalette } from '@/theme/colors';
import { modePalettes } from '@/theme/palette';
import type { ColorMode } from '@/theme/themeTypes';

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
  '--home-text': colorPalette.homeTextDark,
  '--action-background': colorPalette.actionDark,
  '--action-background-hover': colorPalette.actionDarkHover,
  '--action-border': colorPalette.actionBorderDark,
  '--action-text': colorPalette.homeTextDark,
  '--admin-brown': colorPalette.adminBrown,
  '--admin-dark-brown': colorPalette.adminDarkBrown,
  '--admin-muted': colorPalette.adminMuted,
} as const;

const getModeVariables = (mode: ColorMode) => {
  const palette = modePalettes[mode];

  return {
    '--background': palette.background,
    '--surface': palette.surface,
    '--text-primary': palette.textPrimary,
    '--text-secondary': palette.textSecondary,
    '--text-disabled': palette.textDisabled,
    '--border': palette.border,
    '--button': palette.button,
    '--accent': palette.accent,

    '--button-primary-bg': palette.buttonPrimaryBG,
    '--button-primary-text': palette.buttonPrimaryText,
    '--button-disabled-bg': palette.buttonDisabledBG,
    '--button-disabled-text': palette.buttonDisabledText,
    '--button-hover-bg': palette.buttonHoverBG,
    '--button-hover-text': palette.buttonHoverText,
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
