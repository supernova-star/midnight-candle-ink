import React from 'react';
import { ColumnFlexContainer } from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';

type SettingsGroupProps = React.PropsWithChildren<{
  title: string;
}>;

export const SettingsGroup: React.FC<SettingsGroupProps> = ({
  title,
  children,
}) => (
  <ColumnFlexContainer gap={[2]} flex={1} overflow="auto" hideScrollbar>
    <Typography variant="body2" weight="semiBold" color="var(--text-secondary)">
      {title}
    </Typography>
    <ColumnFlexContainer
      style={{
        overflow: 'auto',
        flex: 1,
        borderRadius: '12px',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
      }}
    >
      {children}
    </ColumnFlexContainer>
  </ColumnFlexContainer>
);
