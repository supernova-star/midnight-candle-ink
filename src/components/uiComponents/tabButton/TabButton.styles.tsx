import type { SxProps, Theme } from '@mui/material/styles';
import theme from '@/theme/theme';

export const tabButtonSx = (active: boolean): SxProps<Theme> => ({
  flex: 1,
  minWidth: 0,
  whiteSpace: 'nowrap',
  px: { xs: 1, sm: 2 },
  '& .MuiButton-startIcon': { marginRight: theme.spacing(1.5) },
  ...(active
    ? { boxShadow: theme.shadows.md }
    : { borderColor: theme.colors.adminBorder }),
});
