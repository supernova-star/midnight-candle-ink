import styled from 'styled-components';
import { ColumnFlexContainer } from '@/components/uiComponents/container/Container';

export const ProfileContent = styled(ColumnFlexContainer)`
  width: min(
    calc(100% - ${({ theme }) => theme.spacing(120)}),
    ${({ theme }) => theme.spacing(320)}
  );
  min-height: 0;
  flex: 1;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(4, 0, 8)};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    width: calc(100% - ${({ theme }) => theme.spacing(12)});
    padding: ${({ theme }) => theme.spacing(4, 0)};
  }

  @media (min-width: 769px) and (max-width: 1100px) {
    width: calc(100% - ${({ theme }) => theme.spacing(50)});
    padding: ${({ theme }) => theme.spacing(4, 0)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    width: calc(100% - ${({ theme }) => theme.spacing(8)});
    padding: ${({ theme }) => theme.spacing(4, 0)};
  }
`;

export const UserForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
  position: relative;

  svg {
    color: ${({ theme }) => theme.colors.accent};
  }

  input {
    width: 100%;
    height: 48px;
    padding: 0 14px;
    border: 1px solid ${({ theme }) => theme.colors.adminBorder};
    border-radius: ${({ theme }) => theme.radii.sm};
    background: rgba(255, 255, 255, 0.08);
    color: var(--text-primary);
    outline: none;

    &:focus {
      border-color: ${({ theme }) => theme.colors.accent};
    }
  }

  textarea {
    width: 100%;
    margin-top: 7px;
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.colors.adminBorder};
    border-radius: ${({ theme }) => theme.radii.sm};
    background: rgba(255, 255, 255, 0.08);
    color: var(--text-primary);
    outline: none;
    resize: none;

    &:focus {
      border-color: ${({ theme }) => theme.colors.accent};
    }
  }
`;
