import React from 'react';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Switch } from '@/components/uiComponents/switch/Switch';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { IconTile } from './IconTile';

export type ToggleRowProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  checked: boolean;
  disabled?: boolean;
  isDesktop?: boolean;
  onChange: (checked: boolean) => void;
};

export const ToggleRow: React.FC<ToggleRowProps> = ({
  icon,
  title,
  subtitle,
  checked,
  isDesktop = false,
  disabled = false,
  onChange,
}) => (
  <RowFlexContainer
    alignItems="center"
    gap={[3]}
    padding={isDesktop ? [2, 3] : [3, 4]}
    minHeight={isDesktop ? '40px' : '80px'}
    style={{ opacity: disabled ? 0.5 : 1 }}
  >
    <IconTile>{icon}</IconTile>
    <ColumnFlexContainer gap={[1]} flex={1} minWidth={[0]}>
      <Typography variant="body2" weight="semiBold" color="var(--text-primary)">
        {title}
      </Typography>
      <Typography variant="caption" color="var(--text-secondary)">
        {subtitle}
      </Typography>
    </ColumnFlexContainer>
    <Switch
      checked={checked}
      disabled={disabled}
      onChange={(event) => onChange(event.target.checked)}
      size="small"
    />
  </RowFlexContainer>
);
