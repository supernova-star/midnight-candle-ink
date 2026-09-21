import React from 'react';
import { ArrowLeft, MessageCircle, Users } from 'lucide-react';
import { IconButton } from '@mui/material';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import type { AdminView } from './AdminShell';
import logoLight from '@/components/uiComponents/iconAssets/logoLight.svg';
import styled from 'styled-components';

type AdminHeaderProps = {
  activeView: AdminView;
  onViewChange: (view: AdminView) => void;
  onGoHome: () => void;
};

export const AdminHeader = ({
  activeView,
  onViewChange,
  onGoHome,
}: AdminHeaderProps) => (
  <ColumnFlexContainer
    width="100%"
    padding={[4, 5, 2]}
    gap={[4]}
    sx={{
      '@media (min-width: 600px)': {
        padding: '24px 32px 16px',
      },
      '@media (min-width: 900px)': {
        padding: '28px 64px 16px',
      },
    }}
  >
    <RowFlexContainer alignItems="center" justifyContent="between">
      <RowFlexContainer alignItems="center" gap={[3]}>
        <BrandLogo src={logoLight} alt="" aria-hidden="true" />

        <ColumnFlexContainer gap={[0]}>
          <Typography
            variant="subtitle2"
            weight="bold"
            color="var(--admin-accent)"
            sx={{
              letterSpacing: '0.12em',
            }}
          >
            MIDNIGHT CANDLE
          </Typography>

          <Typography
            variant="caption"
            weight="bold"
            color="var(--admin-text-muted)"
            sx={{
              letterSpacing: '0.14em',
            }}
          >
            ADMIN
          </Typography>
        </ColumnFlexContainer>
      </RowFlexContainer>

      <IconButton
        aria-label="Back to Home"
        title="Back to Home"
        onClick={onGoHome}
        sx={{
          width: 44,
          height: 44,
          color: 'var(--admin-brand)',
          backgroundColor: 'var(--admin-surface)',
          border: '1px solid var(--admin-border)',
          '&:hover': {
            backgroundColor: 'var(--admin-surface-hover)',
          },
        }}
      >
        <ArrowLeft size={20} />
      </IconButton>
    </RowFlexContainer>

    <RowFlexContainer
      gap={[1]}
      backgroundColor="var(--admin-surface)"
      padding={[1]}
      borderRadius={[2]}
      sx={{
        width: 'fit-content',
        border: '1px solid var(--admin-border)',
      }}
    >
      <AdminViewButton
        active={activeView === 'visitors'}
        icon={<Users size={17} />}
        label="Visitors"
        onClick={() => onViewChange('visitors')}
      />

      <AdminViewButton
        active={activeView === 'feedback'}
        icon={<MessageCircle size={17} />}
        label="Feedback"
        onClick={() => onViewChange('feedback')}
      />
    </RowFlexContainer>
  </ColumnFlexContainer>
);

type AdminViewButtonProps = {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

const AdminViewButton = ({
  active,
  icon,
  label,
  onClick,
}: AdminViewButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      border: 'none',
      borderRadius: 8,
      padding: '10px 18px',
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontSize: 14,
      fontWeight: 600,
      backgroundColor: active ? 'var(--admin-brand)' : 'transparent',
      color: active ? 'var(--admin-surface)' : 'var(--admin-text-secondary)',
      transition: 'all 160ms ease',
    }}
  >
    {icon}
    {label}
  </button>
);

export const BrandLogo = styled.img`
  display: block;
  width: ${({ theme }) => theme.spacing(12)};
  height: ${({ theme }) => theme.spacing(10)};
  object-fit: contain;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    width: ${({ theme }) => theme.spacing(9)};
    height: ${({ theme }) => theme.spacing(8)};
  }
`;
