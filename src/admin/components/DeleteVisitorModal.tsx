import React from 'react';

import { AlertTriangle, Trash2 } from 'lucide-react';

import type { User } from '@/hooks/activeUsers';

import { Button } from '@/components/uiComponents/button/Button';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Modal } from '@/components/uiComponents/modal/Modal';
import { Typography } from '@/components/uiComponents/typography/Typography';

interface DeleteVisitorModalProps {
  user: User | null;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteVisitorModal: React.FC<DeleteVisitorModalProps> = ({
  user,
  isDeleting,
  onClose,
  onConfirm,
}) => (
  <Modal
    open={Boolean(user)}
    onClose={onClose}
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
          {user?.user_name || 'Anonymous'}
        </Typography>
        <Typography
          color="var(--admin-text-muted)"
          variant="caption"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {user?.browser_id}
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
          onClick={onClose}
          disabled={isDeleting}
        />
        <Button
          text={isDeleting ? 'Deleting...' : 'Delete visitor'}
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
          onClick={onConfirm}
          disabled={isDeleting}
        />
      </RowFlexContainer>
    </ColumnFlexContainer>
  </Modal>
);
