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
        maxWidth="760px"
        height="100dvh"
        flex={1}
        backgroundColor="adminSurface"
        sx={{ mx: 'auto', minHeight: 0 }}
      >
        <AdminHeader onGoHome={onGoHome} />
        <ColumnFlexContainer
          padding={[0, 5, 22]}
          flex={1}
          data-testid="admin-shell-content"
          sx={{
            minHeight: 0,
            overflow: 'hidden',
            pb: 12,
            '@media (min-width: 600px)': { px: 4 },
          }}
        >
          <ActiveUsersList />
        </ColumnFlexContainer>
      </ColumnFlexContainer>
    </ColumnFlexContainer>
  );
};
