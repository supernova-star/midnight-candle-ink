import React, { useState } from 'react';
import { ColumnFlexContainer } from '@/components/uiComponents/container/Container';
import { AdminHeader } from './AdminHeader';
import { ActiveUsersList } from './ActiveUsersList';
import { FeedbackList } from './FeedbackList';

export type AdminView = 'visitors' | 'feedback';

type AdminShellProps = {
  onGoHome: () => void;
};

export const AdminShell = ({ onGoHome }: AdminShellProps) => {
  const [activeView, setActiveView] = useState<AdminView>('visitors');

  return (
    <ColumnFlexContainer
      height="100dvh"
      flex={1}
      backgroundColor="var(--admin-background)"
      sx={{
        color: 'var(--admin-text-primary)',
        overflow: 'hidden',
      }}
    >
      <ColumnFlexContainer
        width="100%"
        height="100dvh"
        flex={1}
        backgroundColor="var(--admin-background)"
        sx={{ minHeight: 0 }}
      >
        <AdminHeader
          activeView={activeView}
          onViewChange={setActiveView}
          onGoHome={onGoHome}
        />

        <ColumnFlexContainer
          padding={[0, 5, 8]}
          flex={1}
          data-testid="admin-shell-content"
          sx={{
            minHeight: 0,
            overflow: 'hidden',
            '@media (min-width: 900px)': {
              px: 8,
            },
          }}
        >
          {activeView === 'visitors' && <ActiveUsersList />}

          {activeView === 'feedback' && <FeedbackList />}
        </ColumnFlexContainer>
      </ColumnFlexContainer>
    </ColumnFlexContainer>
  );
};
