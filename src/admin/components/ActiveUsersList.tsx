import React, { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { getUsers, UsersResponse } from '@/hooks/activeUsers';
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

  const loadUsers = async () => {
    setIsRefreshing(true);
    try {
      setUserData(await getUsers());
    } finally {
      setIsRefreshing(false);
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
            </RowFlexContainer>
          ))
        )}
      </ColumnFlexContainer>
    </ColumnFlexContainer>
  );
};
