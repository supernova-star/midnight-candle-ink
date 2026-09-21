const feedbackColors = {
  light: {
    success: {
      background: '#EAF6EE',
      border: '#B8DEC3',
      text: '#245C35',
      icon: '#2E7D4F',
    },
    error: {
      background: '#FCECEC',
      border: '#E7B8B8',
      text: '#7A2929',
      icon: '#C44848',
    },
  },

  dark: {
    success: {
      background: '#1F3026',
      border: '#365E44',
      text: '#C4E5CC',
      icon: '#72C28A',
    },
    error: {
      background: '#351F21',
      border: '#68393D',
      text: '#F0C3C5',
      icon: '#E27A7F',
    },
  },
};

const adminColors = {
  // Layout
  background: '#F4EBDD',
  surface: '#FFFDF8',
  surfaceHover: '#FBF4E9',

  // Typography
  textPrimary: '#3D2920',
  textSecondary: '#735C4C',
  textMuted: '#927968',

  // Brand / navigation
  brand: '#6B4632',
  brandDark: '#3D2920',
  accent: '#B97845',
  accentHover: '#9F6136',
  accentSoft: '#EFE0CF',

  // Borders / dividers
  border: '#E5D5C3',
  borderStrong: '#D8C2AA',

  // Buttons
  buttonPrimary: '#B97845',
  buttonPrimaryHover: '#9F6136',
  buttonPrimaryText: '#FFFDF8',

  // Icons
  icon: '#73513C',
  iconMuted: '#927968',
  iconBackground: '#F1E3D1',

  // Status
  success: '#4F7658',
  successBackground: '#EDF5EB',
  successBorder: '#C9DEC8',
  successText: '#365B3D',

  danger: '#B45C45',
  dangerBackground: '#F8ECE7',
  dangerBorder: '#E5C6BC',
  dangerText: '#8E4031',

  // Table
  tableHeader: '#F0E3D2',
  tableRow: '#FFFDF8',
  tableRowHover: '#FBF4E9',

  // Feedback
  feedbackBackground: '#FFF9F1',
  feedbackBorder: '#E7D7C5',
};

export const colorPalette = {
  primary: '#222222',
  background2: '#37161E',
  text: '#fff8ef',
  secondaryText: '#d8cfbf',
  white: '#ffffff',
  border: '#d8cfbf',
  accent: '#bc6c38',
  accentSelected: '#8e3f4431',
  lightSelected: '#ffffffa6',
  darkBg: '#4e222576',
  darkSelected: '#311617',
  borderGray: '#d8cfbf',
  divider: '#d8cfbf',
  cardShadow: '0 4px 12px rgba(0,0,0,0.08)',

  homeTextDark: '#f4eadc',
  homeTextLight: '#2e2119',
  actionDark: '#4e2225',
  actionDarkHover: 'rgba(142, 63, 68, 0.98)',
  actionBorderDark: 'rgba(225, 153, 143, 0.62)',

  adminBackground: '#f8f5ef',
  adminSurface: '#ffffff',
  adminBrown: '#593a28',
  adminDarkBrown: '#352319',
  adminYellow: '#d7a638',
  adminGreen: '#388e55',
  adminDanger: '#a94a36',
  adminMuted: '#856f60',
  adminBorder: '#e7dbcd',

  feedbackColors,

  adminColors,

  adminRadialBackground:
    'radial-gradient(circle at 50% 42%, rgba(188, 108, 56, 0.16), transparent 34%), linear-gradient(145deg, rgba(23, 19, 15, 0.98), rgba(55, 22, 30, 0.96))',
} as const;

export type Colors = keyof typeof colorPalette;
