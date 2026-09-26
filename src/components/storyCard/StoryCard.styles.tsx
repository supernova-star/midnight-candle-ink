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
  &[aria-disabled='true'] {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const Card = styled(ColumnFlexContainer)`
  position: relative;
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

  ${CardLink}:hover:not([aria-disabled='true']) & {
    border-color: var(--accent);
    box-shadow: ${({ theme }) => theme.spacing(0, 2, 5)}
      color-mix(in srgb, var(--text-primary) 12%, transparent);
    transform: translateY(${({ theme }) => theme.spacing(-0.5)});
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    flex-direction: row;
    align-items: center;
    min-height: ${({ theme }) => theme.spacing(30)};

    > div:last-child {
      align-self: stretch;
      justify-content: center;
      padding: ${({ theme }) => theme.spacing(3, 10, 3, 2)};
    }
  }
`;

export const StoryImage = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 6 / 5;
  object-fit: cover;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    width: ${({ theme }) => theme.spacing(26)};
    height: ${({ theme }) => theme.spacing(26)};
    flex-shrink: 0;
    margin: ${({ theme }) => theme.spacing(2)};
    border-radius: ${({ theme }) => theme.radii.md};
  }
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    position: absolute;
    top: 50%;
    right: ${({ theme }) => theme.spacing(3)};
    margin-top: 0;
    transform: translateY(-50%);
    font-size: 0;

    svg {
      width: ${({ theme }) => theme.spacing(5)};
      height: ${({ theme }) => theme.spacing(5)};
      color: var(--text-primary);
    }
  }
`;
