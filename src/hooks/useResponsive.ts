import useMediaQuery from '@mui/material/useMediaQuery';
import theme from '@/theme/theme';

type Breakpoint = keyof typeof theme.breakpoints;

export const useResponsive = (breakpoint: Breakpoint = 'mobile') =>
  useMediaQuery(`(max-width: ${theme.breakpoints[breakpoint]}px)`);
