import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle,
  Circle,
  RefreshCw,
  Trash2,
  Users,
  XCircle,
} from 'lucide-react';
import { User, getUsers } from '@/hooks/activeUsers';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { Button } from '@/components/uiComponents/button/Button';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Modal } from '@/components/uiComponents/modal/Modal';
import { formatLastSeen } from '../utils/formatter';
import { filterTabsSx, StatusBadge, userRowSx } from './ActiveUsersList.styles';
import { TabButton } from '@/components/uiComponents/tabButton/TabButton';

const onlineThreshold = 2 * 60 * 1000;

type UserFilter = 'all' | 'online' | 'offline';

export const ActiveUsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userPendingDeletion, setUserPendingDeletion] = useState<User | null>(
    null,
  );
  const [userFilter, setUserFilter] = useState<UserFilter>('all');

  const loadUsers = async () => {
    setIsRefreshing(true);

    try {
      setUsers(await getUsers());
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    void loadUsers();
  }, []);

  const isUserOnline = (user: User) =>
    Boolean(
      user.last_seen_at &&
      Date.now() - new Date(user.last_seen_at).getTime() < onlineThreshold,
    );

  const onlineUsers = users.filter(isUserOnline);
  const offlineUsers = users.filter((user) => !isUserOnline(user));
  const visibleUsers =
    userFilter === 'online'
      ? onlineUsers
      : userFilter === 'offline'
        ? offlineUsers
        : users;

  return (
    <>
      <RowFlexContainer alignItems="end" justifyContent="between" gap={[3]}>
        <ColumnFlexContainer gap={[1]}>
          <Typography color="adminDarkBrown" variant="h5" weight="semiBold">
            Active now
          </Typography>
          <Typography color="adminMuted" variant="body2">
            {onlineUsers.length}{' '}
            {onlineUsers.length === 1 ? 'person' : 'people'} online
            {' · '}
            {users.length} {users.length === 1 ? 'user' : 'users'} total
          </Typography>
        </ColumnFlexContainer>

        <Button
          text={isRefreshing ? 'Refreshing...' : 'Refresh'}
          size="small"
          variant="contained"
          iconOptions={{ icon: RefreshCw, iconColor: 'adminDarkBrown' }}
          textOptions={{
            textColor: 'adminDarkBrown',
            textWeight: 'bold',
          }}
          buttonStyles={{
            bgColor: 'adminYellow',
            borderRadius: [3],
          }}
          disabled={isRefreshing}
          onClick={loadUsers}
          sx={{
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(86, 59, 39, 0.12)',
          }}
        />
      </RowFlexContainer>

      <RowFlexContainer
        role="tablist"
        aria-label="Filter users by status"
        gap={[1]}
        padding={[1]}
        margin={[4, 0, 0]}
        backgroundColor="adminBackground"
        borderRadius={[3]}
        sx={filterTabsSx}
      >
        <TabButton
          text={`All (${users.length})`}
          icon={Users}
          active={userFilter === 'all'}
          onClick={() => setUserFilter('all')}
        />
        <TabButton
          text={`Online (${onlineUsers.length})`}
          icon={CheckCircle}
          active={userFilter === 'online'}
          onClick={() => setUserFilter('online')}
        />
        <TabButton
          text={`Offline (${offlineUsers.length})`}
          icon={XCircle}
          active={userFilter === 'offline'}
          onClick={() => setUserFilter('offline')}
        />
      </RowFlexContainer>

      <ColumnFlexContainer
        gap={[2]}
        margin={[3, 0, 0]}
        sx={{ overflow: 'auto', minHeight: 0 }}
      >
        {users.length === 0 ? (
          <ColumnFlexContainer
            alignItems="center"
            gap={[1]}
            padding={[8, 3]}
            backgroundColor="adminBackground"
            borderRadius={[3]}
          >
            <Typography color="adminDarkBrown" weight="semiBold">
              No users yet
            </Typography>
            <Typography color="adminMuted" variant="caption">
              User activity will appear here.
            </Typography>
          </ColumnFlexContainer>
        ) : visibleUsers.length === 0 ? (
          <ColumnFlexContainer
            alignItems="center"
            gap={[1]}
            padding={[8, 3]}
            backgroundColor="adminBackground"
            borderRadius={[3]}
          >
            <Typography color="adminDarkBrown" weight="semiBold">
              No {userFilter} users
            </Typography>
            <Typography color="adminMuted" variant="caption">
              Try another status filter.
            </Typography>
          </ColumnFlexContainer>
        ) : (
          visibleUsers.map((user) => {
            const isOnline = isUserOnline(user);

            return (
              <RowFlexContainer
                key={user.browser_id}
                alignItems="center"
                gap={[3]}
                padding={[3]}
                borderRadius={[3]}
                sx={userRowSx}
              >
                <RowFlexContainer
                  alignItems="center"
                  justifyContent="center"
                  width={[8]}
                  height={[8]}
                  borderRadius={[3]}
                  backgroundColor={isOnline ? 'adminYellow' : 'adminSurface'}
                  sx={{ flexShrink: 0 }}
                >
                  <Circle
                    size={10}
                    fill={
                      isOnline
                        ? 'var(--admin-dark-brown)'
                        : 'var(--admin-muted)'
                    }
                    color={
                      isOnline
                        ? 'var(--admin-dark-brown)'
                        : 'var(--admin-muted)'
                    }
                  />
                </RowFlexContainer>

                <ColumnFlexContainer gap={[0]} flex={1} minWidth={[0]}>
                  <Typography
                    color="adminDarkBrown"
                    weight="semiBold"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {user.user_name}
                  </Typography>
                  <Typography color="adminMuted" variant="caption">
                    {isOnline
                      ? 'Online now'
                      : user.last_seen_at
                        ? `Last seen ${formatLastSeen(user.last_seen_at)}`
                        : 'Never seen'}
                  </Typography>
                </ColumnFlexContainer>

                <RowFlexContainer
                  alignItems="center"
                  gap={[2]}
                  sx={{ flexShrink: 0 }}
                >
                  <StatusBadge
                    $online={isOnline}
                    aria-label={isOnline ? 'Online' : 'Offline'}
                  >
                    {isOnline ? 'ONLINE' : 'OFFLINE'}
                  </StatusBadge>
                  <Button
                    aria-label={`Delete ${user.user_name}`}
                    title={`Delete ${user.user_name}`}
                    variant="text"
                    size="small"
                    iconOptions={{ icon: Trash2, iconColor: 'adminBrown' }}
                    text=""
                    buttonStyles={{ width: 'hugContents' }}
                    onClick={() => setUserPendingDeletion(user)}
                    sx={{ minWidth: '40px', px: 1.25 }}
                  />
                </RowFlexContainer>
              </RowFlexContainer>
            );
          })
        )}
      </ColumnFlexContainer>

      <Modal
        open={Boolean(userPendingDeletion)}
        onClose={() => setUserPendingDeletion(null)}
        aria-labelledby="delete-user-dialog-title"
        fullScreenOnMobile={false}
        contentStyle={{ width: 'min(420px, calc(100vw - 32px))' }}
      >
        <ColumnFlexContainer
          gap={[3]}
          padding={[6]}
          backgroundColor="adminSurface"
          borderRadius={[3]}
        >
          <RowFlexContainer alignItems="center" gap={[2]}>
            <AlertTriangle size={22} color="var(--admin-brown)" />
            <Typography
              id="delete-user-dialog-title"
              variant="h6"
              color="adminDarkBrown"
              weight="bold"
            >
              Delete user?
            </Typography>
          </RowFlexContainer>
          <Typography color="adminMuted">
            Are you sure you want to delete{' '}
            <strong>{userPendingDeletion?.user_name}</strong>? This action
            cannot be undone.
          </Typography>
          <RowFlexContainer justifyContent="end" gap={[2]}>
            <Button
              text="Cancel"
              variant="text"
              size="small"
              textOptions={{ textColor: 'adminDarkBrown' }}
              onClick={() => setUserPendingDeletion(null)}
            />
            <Button
              text="Delete user"
              size="small"
              disabled
              iconOptions={{ icon: Trash2, iconColor: 'adminMuted' }}
            />
          </RowFlexContainer>
        </ColumnFlexContainer>
      </Modal>
    </>
  );
};
