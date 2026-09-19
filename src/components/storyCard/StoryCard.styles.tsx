import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ColumnFlexContainer } from '@/components/uiComponents/container/Container';

export const CardLink = styled(Link)`
  display: block;
  min-width: 0;
  color: var(--text-primary);
  cursor: pointer;

  &:focus-visible {
    border-radius: ${({ theme }) => theme.radii.md};
    outline: ${({ theme }) => theme.spacing(0.5)} solid var(--accent);
    outline-offset: ${({ theme }) => theme.spacing(1)};
  }
`;

export const Card = styled(ColumnFlexContainer)`
  height: 100%;
  overflow: hidden;
  border: ${({ theme }) => theme.spacing(0.25)} solid var(--border);
  border-radius: ${({ theme }) => theme.radii.md};
  background: var(--surface);
  box-shadow: ${({ theme }) => theme.spacing(0, 1, 3)}
    color-mix(in srgb, var(--text-primary) 7%, transparent);
  transition:
    transform ${({ theme }) => theme.transitions.default},
    border-color ${({ theme }) => theme.transitions.default},
    box-shadow ${({ theme }) => theme.transitions.default};

  ${CardLink}:hover & {
    border-color: var(--accent);
    box-shadow: ${({ theme }) => theme.spacing(0, 2, 5)}
      color-mix(in srgb, var(--text-primary) 12%, transparent);
    transform: translateY(${({ theme }) => theme.spacing(-0.5)});
  }
`;

export const StoryImage = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 6 / 5;
  object-fit: cover;
`;

export const ReadLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.5)};
  margin-top: ${({ theme }) => theme.spacing(2)};
  color: var(--button);
  font-size: 0.875rem;
  font-weight: 600;

  svg {
    width: ${({ theme }) => theme.spacing(4)};
    height: ${({ theme }) => theme.spacing(4)};
  }
`;
