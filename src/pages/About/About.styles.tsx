import styled from 'styled-components';
import { RowFlexContainer } from '@/components/uiComponents/container/Container';

export const AboutDivider = styled.div`
  width: ${({ theme }) => theme.spacing(12)};
  height: ${({ theme }) => theme.spacing(0.25)};
  background: var(--accent);
  opacity: 0.65;
`;

export const InstagramLink = styled.a`
  display: inline-flex;
  min-height: ${({ theme }) => theme.spacing(11)};
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(0, 4)};
  border: ${({ theme }) => theme.spacing(0.25)} solid var(--border);
  border-radius: ${({ theme }) => theme.radii.sm};
  color: var(--text-primary);
  font-size: 0.875rem;
  font-weight: 500;
  transition:
    border-color ${({ theme }) => theme.transitions.default},
    color ${({ theme }) => theme.transitions.default},
    background ${({ theme }) => theme.transitions.default};

  svg {
    width: ${({ theme }) => theme.spacing(4.5)};
    height: ${({ theme }) => theme.spacing(4.5)};
    color: var(--accent);
  }

  &:hover {
    border-color: var(--accent);
    background: color-mix(in srgb, var(--accent) 8%, transparent);
    color: var(--accent);
  }

  &:focus-visible {
    outline: ${({ theme }) => theme.spacing(0.5)} solid var(--accent);
    outline-offset: ${({ theme }) => theme.spacing(1)};
  }
`;

export const Signature = styled(RowFlexContainer)`
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-top: ${({ theme }) => theme.spacing(2)};
  color: var(--text-secondary);
`;