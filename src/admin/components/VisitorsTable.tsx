import React from 'react';

import { Calendar, MapPin, Trash2 } from 'lucide-react';

import type { User } from '@/hooks/activeUsers';

import { Button } from '@/components/uiComponents/button/Button';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';

interface VisitorsTableProps {
  users: User[];
  hasAnyUsers: boolean;
  isLoading: boolean;
  deletingBrowserId: string | null;
  onSelectUser: (user: User) => void;
  onRequestDelete: (user: User) => void;
}

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

const getLocation = (user: User): string =>
  [user.city, user.region, user.country].filter(Boolean).join(', ');

export const VisitorsTable: React.FC<VisitorsTableProps> = ({
  users,
  hasAnyUsers,
  isLoading,
  deletingBrowserId,
  onSelectUser,
  onRequestDelete,
}) => (
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
    ) : users.length === 0 ? (
      <ColumnFlexContainer
        padding={[6]}
        alignItems="center"
        justifyContent="center"
        flex={1}
      >
        <Typography color="var(--admin-text-muted)" variant="body2">
          {hasAnyUsers ? 'No visitors match this filter.' : 'No visitors yet.'}
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

        <thead style={{ position: 'sticky', top: 0, zIndex: 2 }}>
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
            <th style={{ ...headerCellStyle, textAlign: 'center' }}> </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => {
            const location = getLocation(user);

            return (
              <tr
                key={user.browser_id}
                onClick={() => onSelectUser(user)}
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
                <td style={bodyCellStyle}>
                  <ColumnFlexContainer gap={[1]} sx={{ minWidth: 0 }}>
                    <Typography
                      color="var(--admin-text-primary)"
                      weight="semiBold"
                      sx={{ fontSize: 15 }}
                    >
                      {user.user_name || 'Anonymous'}
                    </Typography>

                    <RowFlexContainer
                      alignItems="center"
                      gap={[1]}
                      sx={{ minWidth: 0 }}
                    >
                      <Calendar
                        size={14}
                        color="var(--admin-text-muted)"
                        style={{ flexShrink: 0 }}
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

                <td style={bodyCellStyle}>
                  <RowFlexContainer
                    alignItems="center"
                    gap={[2]}
                    sx={{ minWidth: 0 }}
                  >
                    <MapPin
                      size={18}
                      color="var(--admin-text-muted)"
                      style={{ flexShrink: 0 }}
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
                      sx={{ fontSize: 11 }}
                    >
                      {formatDate(user.last_seen_at)}
                    </Typography>
                  </ColumnFlexContainer>
                </td>

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

                <td style={{ ...bodyCellStyle, textAlign: 'center' }}>
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
                    buttonStyles={{ width: 'hugContents' }}
                    sx={{ minWidth: 40, px: 1 }}
                    onClick={(event) => {
                      event.stopPropagation();
                      onRequestDelete(user);
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
);

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
