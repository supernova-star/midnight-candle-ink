import React from 'react';
import { ColumnFlexContainer } from '@/components/uiComponents/container/Container';
import { AdminHeader } from './AdminHeader';
import { ActiveUsersList } from './ActiveUsersList';

type AdminShellProps = {
  onGoHome: () => void;
};

export const AdminShell = ({ onGoHome }: AdminShellProps) => {
  return (
    <ColumnFlexContainer
      height="100dvh"
      flex={1}
      backgroundColor="adminBackground"
      sx={{ color: 'adminDarkBrown', overflow: 'hidden' }}
    >
      <ColumnFlexContainer
        width="100%"
        height="100dvh"
        flex={1}
        backgroundColor="adminSurface"
        sx={{ minHeight: 0 }}
      >
        <AdminHeader onGoHome={onGoHome} />
        <ColumnFlexContainer
          padding={[0, 8, 22]}
          flex={1}
          data-testid="admin-shell-content"
          sx={{
            minHeight: 0,
            overflow: 'hidden',
            pb: 12,
            '@media (min-width: 900px)': { px: 10 },
          }}
        >
          <ActiveUsersList />
        </ColumnFlexContainer>
      </ColumnFlexContainer>
    </ColumnFlexContainer>
  );
};
