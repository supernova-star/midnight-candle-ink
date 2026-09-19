import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RowFlexContainer } from '@/components/uiComponents/container/Container';

export const ChapterCardLink = styled(Link)`
  display: block;
  color: inherit;
  cursor: pointer;

  &:focus-visible {
    border-radius: ${({ theme }) => theme.radii.md};
    outline: ${({ theme }) => theme.spacing(0.5)} solid var(--accent);
    outline-offset: ${({ theme }) => theme.spacing(1)};
  }
`;

export const ChapterCardContainer = styled(RowFlexContainer)`
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(8)};
  padding: ${({ theme }) => theme.spacing(5, 6)};
  border: ${({ theme }) => theme.spacing(0.25)} solid var(--border);
  border-radius: ${({ theme }) => theme.radii.md};
  background: var(--surface);
  transition:
    border-color ${({ theme }) => theme.transitions.default},
    transform ${({ theme }) => theme.transitions.default};

  ${ChapterCardLink}:hover & {
    border-color: var(--accent);
    transform: translateY(${({ theme }) => theme.spacing(-0.25)});
  }

  > :first-child {
    min-width: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    gap: ${({ theme }) => theme.spacing(3)};
    padding: ${({ theme }) => theme.spacing(4)};
  }
`;

export const ChapterNumber = styled.span`
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const ChapterMeta = styled(RowFlexContainer)`
  align-items: center;
  gap: ${({ theme }) => theme.spacing(5)};
  flex-shrink: 0;
  color: var(--text-secondary);

  svg {
    width: ${({ theme }) => theme.spacing(5)};
    height: ${({ theme }) => theme.spacing(5)};
    color: var(--text-primary);
    stroke-width: 1.7;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    gap: ${({ theme }) => theme.spacing(3)};
  }
`;
