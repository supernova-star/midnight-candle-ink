import styled from 'styled-components';
import type { CSSObject } from 'styled-components';
import theme from '@/theme/theme';

export const StatusBadge = styled.span<{ $online: boolean }>`
  display: inline-flex;
  align-items: center;
  min-height: ${({ theme }) => theme.spacing(6)};
  padding: 0 ${({ theme }) => theme.spacing(2.25)};
  border-radius: 999px;
  color: ${({ theme, $online }) =>
    $online ? theme.colors.adminGreen : theme.colors.adminMuted};
  background: ${({ $online }) =>
    $online ? 'rgba(56, 142, 85, 0.16)' : 'rgba(133, 111, 96, 0.1)'};
  border: 1px solid
    ${({ theme, $online }) =>
      $online
        ? `${theme.colors.adminGreen}66`
        : `${theme.colors.adminMuted}33`};
  font-size: ${({ theme }) => theme.spacing(2.75)};
  font-weight: 700;
  letter-spacing: ${({ theme }) => theme.spacing(0.2)};
`;

export const filterTabsSx: CSSObject = {
  border: `1px solid ${theme.colors.adminBorder}`,
};

export const userRowSx: CSSObject = {
  minHeight: theme.spacing(18),
  border: `1px solid ${theme.colors.adminBorder}`,
  boxShadow: theme.shadows.md,
};
