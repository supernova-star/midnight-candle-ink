export const colorPalette = {
  primary: '#222222',
  background2: '#37161E',
  text: '#fff8ef',
  secondaryText: '#d8cfbf',
  white: '#ffffff',
  border: '#d8cfbf',
  accent: '#bc6c38',
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

  adminRadialBackground:
    'radial-gradient(circle at 50% 42%, rgba(188, 108, 56, 0.16), transparent 34%), linear-gradient(145deg, rgba(23, 19, 15, 0.98), rgba(55, 22, 30, 0.96))',
} as const;

export type Colors = keyof typeof colorPalette;
