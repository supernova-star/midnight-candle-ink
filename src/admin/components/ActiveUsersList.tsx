import React, { useEffect, useState } from 'react';
import { RefreshCw, Trash2 } from 'lucide-react';
import { deleteUser, getUsers, UsersResponse } from '@/hooks/activeUsers';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { Button } from '@/components/uiComponents/button/Button';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';

const formatCreatedAt = (createdAt: string) =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(createdAt));

export const ActiveUsersList: React.FC = () => {
  const [userData, setUserData] = useState<UsersResponse>({
    users: [],
    totalUsers: 0,
    activeUsers: 0,
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [deletingBrowserId, setDeletingBrowserId] = useState<string | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState('');

  const loadUsers = async () => {
    setIsRefreshing(true);
    setErrorMessage('');
    try {
      setUserData(await getUsers());
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDelete = async (browserId: string) => {
    if (!window.confirm('Delete this visitor from Supabase?')) return;

    setDeletingBrowserId(browserId);
    setErrorMessage('');

    try {
      await deleteUser(browserId);
      await loadUsers();
    } catch {
      setErrorMessage('Unable to delete this visitor. Please try again.');
    } finally {
      setDeletingBrowserId(null);
    }
  };

  useEffect(() => {
    void loadUsers();
  }, []);

  return (
    <ColumnFlexContainer gap={[3]} padding={[5, 0]}>
      <RowFlexContainer alignItems="center" justifyContent="between" gap={[3]}>
        <ColumnFlexContainer gap={[1]}>
          <Typography color="adminDarkBrown" variant="h5" weight="semiBold">
            Visitors
          </Typography>
          <Typography color="adminMuted" variant="body2">
            {userData.activeUsers} active · {userData.totalUsers} total
          </Typography>
        </ColumnFlexContainer>
        <Button
          text={isRefreshing ? 'Refreshing...' : 'Refresh'}
          size="small"
          variant="contained"
          iconOptions={{ icon: RefreshCw, iconColor: 'adminDarkBrown' }}
          textOptions={{ textColor: 'adminDarkBrown', textWeight: 'bold' }}
          buttonStyles={{ bgColor: 'adminYellow', borderRadius: [3] }}
          disabled={isRefreshing}
          onClick={loadUsers}
        />
      </RowFlexContainer>

      {errorMessage && (
        <Typography color="adminDanger" variant="body2">
          {errorMessage}
        </Typography>
      )}

      <ColumnFlexContainer gap={[2]}>
        {userData.users.length === 0 ? (
          <Typography color="adminMuted">No visitors yet.</Typography>
        ) : (
          userData.users.map((user) => (
            <RowFlexContainer
              key={user.browser_id}
              alignItems="center"
              justifyContent="between"
              gap={[3]}
              padding={[3]}
              backgroundColor="adminBackground"
              borderRadius={[3]}
              sx={{
                border: '1px solid #e7dbcd',
                boxShadow: '0 4px 12px rgba(86, 59, 39, 0.06)',
              }}
            >
              <ColumnFlexContainer gap={[1]} minWidth={[0]} flex={1}>
                <Typography
                  color="adminDarkBrown"
                  weight="semiBold"
                  sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {user.browser_id}
                </Typography>
                <Typography color="adminMuted" variant="caption">
                  Created {formatCreatedAt(user.created_at)}
                </Typography>
              </ColumnFlexContainer>
              <Typography
                color={user.is_active ? 'adminDarkBrown' : 'adminMuted'}
                weight="semiBold"
                variant="caption"
              >
                {user.is_active ? 'ACTIVE' : 'INACTIVE'}
              </Typography>
              <Button
                text=""
                variant="text"
                size="small"
                iconOptions={{ icon: Trash2, iconColor: 'adminDanger' }}
                aria-label={`Delete visitor ${user.browser_id}`}
                title="Delete visitor"
                disabled={deletingBrowserId === user.browser_id}
                buttonStyles={{ width: 'hugContents' }}
                sx={{ minWidth: 40, px: 1 }}
                onClick={() => void handleDelete(user.browser_id)}
              />
            </RowFlexContainer>
          ))
        )}
      </ColumnFlexContainer>
    </ColumnFlexContainer>
  );
};
