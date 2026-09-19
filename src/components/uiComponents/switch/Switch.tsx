import React from 'react';
import MuiSwitch, {
  type SwitchProps as MuiSwitchProps,
} from '@mui/material/Switch';
import styled from 'styled-components';

const StyledSwitch = styled(MuiSwitch)(() => ({
  '& .MuiSwitch-switchBase': {
    color: 'var(--text-secondary)',
    '&:hover': {
      backgroundColor:
        'color-mix(in srgb, var(--text-secondary) 8%, transparent)',
    },
    '&.Mui-checked': {
      color: 'var(--accent)',
      '&:hover': {
        backgroundColor: 'color-mix(in srgb, var(--accent) 8%, transparent)',
      },
      '& + .MuiSwitch-track': {
        backgroundColor: 'var(--accent)',
        opacity: 0.5,
      },
    },
    '&.Mui-disabled': {
      color: 'var(--text-disabled)',
      '& + .MuiSwitch-track': {
        backgroundColor: 'var(--border)',
        opacity: 0.3,
      },
    },
  },
  '& .MuiSwitch-track': {
    backgroundColor: 'var(--border)',
    opacity: 1,
  },
}));

export type SwitchProps = Pick<
  MuiSwitchProps,
  'checked' | 'onChange' | 'disabled' | 'size'
>;

export const Switch: React.FC<SwitchProps> = (props) => {
  return <StyledSwitch {...props} />;
};
