import React, { useEffect, useState } from 'react';

import {
  AlertTriangle,
  Calendar,
  MapPin,
  RefreshCw,
  Trash2,
} from 'lucide-react';

import { deleteUser, getUsers, User, UsersResponse } from '@/hooks/activeUsers';

import { Typography } from '@/components/uiComponents/typography/Typography';
import { Button } from '@/components/uiComponents/button/Button';
import { Modal } from '@/components/uiComponents/modal/Modal';

import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';

import { UserDetailsModal } from './UserDetailsModal';

const formatDate = (date: string): string =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date));

const formatRelativeTime = (date: string): string => {
  const diff = Date.now() - new Date(date).getTime();

  const minutes = Math.floor(diff / (1000 * 60));

  if (minutes < 1) {
    return 'Just now';
  }

  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }

  const days = Math.floor(hours / 24);

  return `${days} ${days === 1 ? 'day' : 'days'} ago`;
};

const getLocation = (user: User): string => {
  return [user.city, user.region, user.country].filter(Boolean).join(', ');
};

export const ActiveUsersList: React.FC = () => {
  const [userData, setUserData] = useState<UsersResponse>({
    users: [],
    totalUsers: 0,
    activeUsers: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [deletingBrowserId, setDeletingBrowserId] = useState<string | null>(
    null,
  );

  const [userPendingDeletion, setUserPendingDeletion] = useState<User | null>(
    null,
  );

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [errorMessage, setErrorMessage] = useState('');

  const loadUsers = async (): Promise<void> => {
    setIsRefreshing(true);
    setErrorMessage('');

    try {
      setUserData(await getUsers());
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleDelete = async (): Promise<void> => {
    if (!userPendingDeletion) {
      return;
    }

    const browserId = userPendingDeletion.browser_id;

    setDeletingBrowserId(browserId);
    setErrorMessage('');

    try {
      await deleteUser(browserId);
      await loadUsers();
    } catch {
      setErrorMessage('Unable to delete this visitor. Please try again.');
    } finally {
      setDeletingBrowserId(null);
      setUserPendingDeletion(null);
    }
  };

  useEffect(() => {
    void loadUsers();
  }, []);

  return (
    <ColumnFlexContainer
      gap={[4]}
      padding={[4, 0]}
      flex={1}
      minHeight={[0]}
      sx={{
        minWidth: 0,
      }}
    >
      {/* Page heading */}
      <RowFlexContainer
        alignItems="center"
        justifyContent="between"
        gap={[3]}
        sx={{
          '@media (max-width: 600px)': {
            alignItems: 'flex-start',
          },
        }}
      >
        <ColumnFlexContainer gap={[1]}>
          <Typography
            color="var(--admin-text-primary)"
            variant="h5"
            weight="semiBold"
          >
            Visitors
          </Typography>

          <Typography color="var(--admin-text-muted)" variant="body2">
            {userData.activeUsers} active · {userData.totalUsers} total
          </Typography>
        </ColumnFlexContainer>

        <Button
          text={isRefreshing ? 'Refreshing...' : 'Refresh'}
          size="small"
          variant="contained"
          iconOptions={{
            icon: RefreshCw,
            iconColor: 'var(--admin-button-primary-text)',
          }}
          textOptions={{
            textColor: 'var(--admin-button-primary-text)',
            textWeight: 'bold',
          }}
          buttonStyles={{
            bgColor: 'var(--admin-button-primary)',
            borderRadius: [2],
          }}
          disabled={isRefreshing}
          onClick={() => void loadUsers()}
          sx={{
            flexShrink: 0,
            '&:hover': {
              backgroundColor: 'var(--admin-button-primary-hover)',
            },
          }}
        />
      </RowFlexContainer>

      {errorMessage && (
        <Typography color="var(--admin-danger)" variant="body2">
          {errorMessage}
        </Typography>
      )}

      {/* Visitors table */}
      <ColumnFlexContainer
        flex={1}
        minHeight={[0]}
        overflow="auto"
        sx={{
          minWidth: 0,
          scrollbarGutter: 'stable',
          border: '1px solid var(--admin-border)',
          borderRadius: '12px',
          backgroundColor: 'var(--admin-surface)',
          overflowX: 'auto',
        }}
      >
        {isLoading ? (
          <ColumnFlexContainer
            flex={1}
            alignItems="center"
            justifyContent="center"
            padding={[6]}
          >
            <Typography color="var(--admin-text-muted)" variant="body2">
              Loading visitors...
            </Typography>
          </ColumnFlexContainer>
        ) : userData.users.length === 0 ? (
          <ColumnFlexContainer
            padding={[6]}
            alignItems="center"
            justifyContent="center"
            flex={1}
          >
            <Typography color="var(--admin-text-muted)" variant="body2">
              No visitors yet.
            </Typography>
          </ColumnFlexContainer>
        ) : (
          <table
            style={{
              width: '100%',
              minWidth: 680,
              borderCollapse: 'collapse',
              tableLayout: 'fixed',
            }}
          >
            <colgroup>
              <col style={{ width: '31%' }} />
              <col style={{ width: '25%' }} />
              <col style={{ width: '24%' }} />
              <col style={{ width: '14%' }} />
              <col style={{ width: '6%' }} />
            </colgroup>

            <thead
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 2,
              }}
            >
              <tr
                style={{
                  backgroundColor: 'var(--admin-table-header)',
                  borderBottom: '1px solid var(--admin-border-strong)',
                }}
              >
                <th style={headerCellStyle}>VISITOR</th>

                <th style={headerCellStyle}>LOCATION</th>

                <th style={headerCellStyle}>LAST SEEN</th>

                <th style={headerCellStyle}>STATUS</th>

                <th
                  style={{
                    ...headerCellStyle,
                    textAlign: 'center',
                  }}
                >
                  {' '}
                </th>
              </tr>
            </thead>

            <tbody>
              {userData.users.map((user) => {
                const location = getLocation(user);

                return (
                  <tr
                    key={user.browser_id}
                    onClick={() => setSelectedUser(user)}
                    style={{
                      borderBottom: '1px solid var(--admin-border)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(event) => {
                      event.currentTarget.style.backgroundColor =
                        'var(--admin-surface-hover)';
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {/* Visitor */}
                    <td style={bodyCellStyle}>
                      <ColumnFlexContainer
                        gap={[1]}
                        sx={{
                          minWidth: 0,
                        }}
                      >
                        <Typography
                          color="var(--admin-text-primary)"
                          weight="semiBold"
                          sx={{
                            fontSize: 15,
                          }}
                        >
                          {user.user_name || 'Anonymous'}
                        </Typography>

                        <RowFlexContainer
                          alignItems="center"
                          gap={[1]}
                          sx={{
                            minWidth: 0,
                          }}
                        >
                          <Calendar
                            size={14}
                            color="var(--admin-text-muted)"
                            style={{
                              flexShrink: 0,
                            }}
                          />

                          <Typography
                            color="var(--admin-text-muted)"
                            variant="caption"
                            sx={{
                              fontSize: 11,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            Joined {formatDate(user.created_at)}
                          </Typography>
                        </RowFlexContainer>
                      </ColumnFlexContainer>
                    </td>

                    {/* Location */}
                    <td style={bodyCellStyle}>
                      <RowFlexContainer
                        alignItems="center"
                        gap={[2]}
                        sx={{
                          minWidth: 0,
                        }}
                      >
                        <MapPin
                          size={18}
                          color="var(--admin-text-muted)"
                          style={{
                            flexShrink: 0,
                          }}
                        />

                        <Typography
                          color={
                            location
                              ? 'var(--admin-text-primary)'
                              : 'var(--admin-text-muted)'
                          }
                          variant="body2"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                          title={location || 'Location unavailable'}
                        >
                          {location || 'Location unavailable'}
                        </Typography>
                      </RowFlexContainer>
                    </td>

                    {/* Last Seen */}
                    <td style={bodyCellStyle}>
                      <ColumnFlexContainer gap={[0]}>
                        <Typography
                          color="var(--admin-text-primary)"
                          variant="body2"
                        >
                          {formatRelativeTime(user.last_seen_at)}
                        </Typography>

                        <Typography
                          color="var(--admin-text-muted)"
                          variant="caption"
                          sx={{
                            fontSize: 11,
                          }}
                        >
                          {formatDate(user.last_seen_at)}
                        </Typography>
                      </ColumnFlexContainer>
                    </td>

                    {/* Status */}
                    <td style={bodyCellStyle}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 7,
                          padding: '6px 11px',
                          borderRadius: 999,
                          backgroundColor: user.is_active
                            ? 'var(--admin-success-background)'
                            : 'var(--admin-danger-background)',
                          border: `1px solid ${
                            user.is_active
                              ? 'var(--admin-success-border)'
                              : 'var(--admin-danger-border)'
                          }`,
                          color: user.is_active
                            ? 'var(--admin-success-text)'
                            : 'var(--admin-danger-text)',
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: '0.05em',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            flexShrink: 0,
                            borderRadius: '50%',
                            backgroundColor: user.is_active
                              ? 'var(--admin-success)'
                              : 'var(--admin-danger)',
                          }}
                        />

                        {user.is_active ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    </td>

                    {/* Delete */}
                    <td
                      style={{
                        ...bodyCellStyle,
                        textAlign: 'center',
                      }}
                    >
                      <Button
                        text=""
                        variant="text"
                        size="small"
                        iconOptions={{
                          icon: Trash2,
                          iconColor: 'var(--admin-danger)',
                        }}
                        aria-label={`Delete visitor ${
                          user.user_name || user.browser_id
                        }`}
                        title="Delete visitor"
                        disabled={deletingBrowserId === user.browser_id}
                        buttonStyles={{
                          width: 'hugContents',
                        }}
                        sx={{
                          minWidth: 40,
                          px: 1,
                        }}
                        onClick={(event) => {
                          event.stopPropagation();
                          setUserPendingDeletion(user);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </ColumnFlexContainer>

      {/* User details modal */}
      <UserDetailsModal
        user={selectedUser}
        open={Boolean(selectedUser)}
        onClose={() => setSelectedUser(null)}
      />

      {/* Delete modal */}
      <Modal
        open={Boolean(userPendingDeletion)}
        onClose={() => setUserPendingDeletion(null)}
        aria-labelledby="delete-visitor-title"
        aria-describedby="delete-visitor-description"
        fullScreenOnMobile={false}
        contentStyle={{
          width: 'min(420px, calc(100vw - 32px))',
        }}
      >
        <ColumnFlexContainer
          gap={[3]}
          padding={[6]}
          backgroundColor="var(--admin-surface)"
          borderRadius={[3]}
        >
          <RowFlexContainer alignItems="center" gap={[2]}>
            <AlertTriangle size={22} color="var(--admin-danger)" />

            <Typography
              id="delete-visitor-title"
              variant="h6"
              color="var(--admin-text-primary)"
              weight="bold"
            >
              Delete visitor?
            </Typography>
          </RowFlexContainer>

          <Typography
            id="delete-visitor-description"
            color="var(--admin-text-muted)"
          >
            This will permanently remove this browser from Supabase.
          </Typography>

          <ColumnFlexContainer gap={[1]}>
            <Typography color="var(--admin-text-primary)" weight="semiBold">
              {userPendingDeletion?.user_name || 'Anonymous'}
            </Typography>

            <Typography
              color="var(--admin-text-muted)"
              variant="caption"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {userPendingDeletion?.browser_id}
            </Typography>
          </ColumnFlexContainer>

          <RowFlexContainer justifyContent="end" gap={[2]}>
            <Button
              text="Cancel"
              variant="text"
              size="small"
              textOptions={{
                textColor: 'var(--admin-text-primary)',
              }}
              onClick={() => setUserPendingDeletion(null)}
              disabled={Boolean(deletingBrowserId)}
            />

            <Button
              text={deletingBrowserId ? 'Deleting...' : 'Delete visitor'}
              size="small"
              variant="contained"
              iconOptions={{
                icon: Trash2,
                iconColor: 'var(--admin-button-primary-text)',
              }}
              textOptions={{
                textColor: 'var(--admin-button-primary-text)',
              }}
              buttonStyles={{
                bgColor: 'var(--admin-danger)',
                borderRadius: [2],
              }}
              onClick={() => void handleDelete()}
              disabled={Boolean(deletingBrowserId)}
            />
          </RowFlexContainer>
        </ColumnFlexContainer>
      </Modal>
    </ColumnFlexContainer>
  );
};

const headerCellStyle: React.CSSProperties = {
  padding: '12px 12px',
  textAlign: 'left',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.08em',
  color: 'var(--admin-text-secondary)',
  backgroundColor: 'var(--admin-table-header)',
};

const bodyCellStyle: React.CSSProperties = {
  padding: '12px 12px',
  verticalAlign: 'middle',
};
