import React from 'react';
import { Calendar, Clock, Globe, MapPin, UserCircle } from 'lucide-react';

import { User } from '@/hooks/activeUsers';

import { Typography } from '@/components/uiComponents/typography/Typography';
import { Button } from '@/components/uiComponents/button/Button';
import { Modal } from '@/components/uiComponents/modal/Modal';

import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';

interface UserDetailsModalProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
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

const getLocation = (user: User): string => {
  return [user.city, user.region, user.country].filter(Boolean).join(', ');
};

const DetailRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  secondaryValue?: string;
}> = ({ icon, label, value, secondaryValue }) => (
  <RowFlexContainer
    alignItems="start"
    gap={[2]}
    sx={{
      minWidth: 0,
    }}
  >
    <span
      style={{
        width: 20,
        height: 20,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: 'var(--admin-text-muted)',
      }}
    >
      {icon}
    </span>

    <ColumnFlexContainer
      gap={[0]}
      sx={{
        minWidth: 0,
        flex: 1,
      }}
    >
      <Typography
        color="var(--admin-text-muted)"
        variant="caption"
        sx={{
          fontSize: 11,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </Typography>

      <Typography
        color="var(--admin-text-primary)"
        variant="body2"
        sx={{
          overflowWrap: 'anywhere',
        }}
      >
        {value}
      </Typography>

      {secondaryValue && (
        <Typography color="var(--admin-text-muted)" variant="caption">
          {secondaryValue}
        </Typography>
      )}
    </ColumnFlexContainer>
  </RowFlexContainer>
);

export const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  user,
  open,
  onClose,
}) => {
  if (!user) {
    return null;
  }

  const location = getLocation(user);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="user-details-title"
      aria-describedby="user-details-description"
      fullScreenOnMobile={false}
      contentStyle={{
        width: 'min(520px, calc(100vw - 32px))',
      }}
    >
      <ColumnFlexContainer
        gap={[4]}
        padding={[6]}
        backgroundColor="var(--admin-surface)"
        borderRadius={[3]}
      >
        {/* Header */}
        <RowFlexContainer alignItems="start" justifyContent="between" gap={[3]}>
          <ColumnFlexContainer
            gap={[1]}
            sx={{
              minWidth: 0,
            }}
          >
            <Typography
              id="user-details-title"
              variant="h6"
              color="var(--admin-text-primary)"
              weight="bold"
              sx={{
                overflowWrap: 'anywhere',
              }}
            >
              {user.user_name || 'Anonymous'}
            </Typography>

            <Typography
              id="user-details-description"
              color="var(--admin-text-muted)"
              variant="body2"
            >
              Visitor details
            </Typography>
          </ColumnFlexContainer>

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
              flexShrink: 0,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: user.is_active
                  ? 'var(--admin-success)'
                  : 'var(--admin-danger)',
              }}
            />

            {user.is_active ? 'ACTIVE' : 'INACTIVE'}
          </span>
        </RowFlexContainer>

        {/* Details */}
        <ColumnFlexContainer
          gap={[4]}
          padding={[4]}
          backgroundColor="var(--admin-surface-hover)"
          borderRadius={[2]}
          sx={{
            border: '1px solid var(--admin-border)',
          }}
        >
          <DetailRow
            icon={<UserCircle size={17} />}
            label="Username"
            value={user.user_name || 'Anonymous'}
          />

          <DetailRow
            icon={<Globe size={17} />}
            label="Browser ID"
            value={user.browser_id}
          />

          <DetailRow
            icon={<MapPin size={17} />}
            label="Location"
            value={location || 'Location unavailable'}
          />

          <DetailRow
            icon={<Calendar size={17} />}
            label="Joined"
            value={formatDate(user.created_at)}
          />

          <DetailRow
            icon={<Clock size={17} />}
            label="Last Seen"
            value={formatDate(user.last_seen_at)}
            secondaryValue={formatRelativeTime(user.last_seen_at)}
          />
        </ColumnFlexContainer>

        {/* Footer */}
        <RowFlexContainer justifyContent="end">
          <Button
            text="Close"
            variant="text"
            size="small"
            textOptions={{
              textColor: 'var(--admin-text-primary)',
            }}
            onClick={onClose}
          />
        </RowFlexContainer>
      </ColumnFlexContainer>
    </Modal>
  );
};
