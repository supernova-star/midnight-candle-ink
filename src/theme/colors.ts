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

export const colorPalette = {
  primary: '#222222',
  background2: '#37161E',
  text: '#fff8ef',
  secondaryText: '#d8cfbf',
  white: '#ffffff',
  border: '#d8cfbf',
  accent: '#bc6c38',
  accentSelected: '#8e3f4431',
  borderGray: '#d8cfbf',
  divider: '#d8cfbf',
  cardShadow: '0 4px 12px rgba(0,0,0,0.08)',

  homeTextDark: '#f4eadc',
  homeTextLight: '#2e2119',
  actionDark: 'rgba(120, 52, 57, 0.92)',
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

  adminRadialBackground:
    'radial-gradient(circle at 50% 42%, rgba(188, 108, 56, 0.16), transparent 34%), linear-gradient(145deg, rgba(23, 19, 15, 0.98), rgba(55, 22, 30, 0.96))',
} as const;

export type Colors = keyof typeof colorPalette;
