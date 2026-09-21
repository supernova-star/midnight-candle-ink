import styled from 'styled-components';
import {
  ColumnFlexContainer,
  Container,
} from '@/components/uiComponents/container/Container';

export const HomePage = styled(Container)`
  position: relative;
  min-width: 0;
  min-height: 100dvh;
  overflow: hidden;
  isolation: isolate;
  color: var(--text-primary);
  transition: color ${({ theme }) => theme.transitions.default};

  &::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: -2;
    background: var(--home-background-image) center / cover no-repeat;
  }

  &::after {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: -1;
    background: var(--home-overlayGradient);
  }

  @media (min-width: 769px) and (max-width: 1100px) {
    &::before {
      background-position: var(--background-image-position-tablet);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    &::before {
      background-position: var(--background-image-position);
    }
  }
`;

export const HeroContent = styled(ColumnFlexContainer)`
  position: relative;
  z-index: 1;
  align-items: center;
  padding: clamp(
      ${({ theme }) => theme.spacing(17.5)},
      13vh,
      ${({ theme }) => theme.spacing(36.25)}
    )
    ${({ theme }) => theme.spacing(10)} ${({ theme }) => theme.spacing(20)};
  text-align: center;

  h1 {
    margin: 0;
    font-family: ${({ theme }) => theme.typography.displayFontFamily};
    font-size: clamp(2.75rem, 4.2vw, 4rem);
    font-weight: 400;
    line-height: 1.16;
    letter-spacing: 0;
  }

  p {
    margin: ${({ theme }) => theme.spacing(6, 0, 7)};
    font-family: ${({ theme }) => theme.typography.displayFontFamily};
    font-size: 1.1875rem;
    font-weight: 300;
    line-height: 1.55;
    opacity: 0.88;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    padding: ${({ theme }) => theme.spacing(12, 4, 16)};

    h1 {
      font-size: 2.5rem;
    }

    p {
      margin: ${({ theme }) => theme.spacing(5, 0, 6)};
      font-size: 1rem;
    }
  }
`;

export const PrimaryAction = styled.button`
  display: inline-flex;
  min-width: ${({ theme }) => theme.spacing(48)};
  height: ${({ theme }) => theme.spacing(12)};
  width: ${({ theme }) => theme.spacing(60)};
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(3)};
  border: ${({ theme }) => theme.spacing(0.25)} solid var(--action-border);
  border-radius: ${({ theme }) => theme.radii.sm};
  background: var(--action-background);
  box-shadow: ${({ theme }) => theme.spacing(0, 2, 6.25)} rgba(0, 0, 0, 0.28);
  color: var(--action-text);
  font-family: ${({ theme }) => theme.typography.displayFontFamily};
  font-size: 0.9375rem;
  font-weight: 400;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.default};

  svg {
    width: ${({ theme }) => theme.spacing(4.25)};
  }

  &:hover {
    background: var(--action-background-hover);
  }

  &:focus-visible {
    outline: ${({ theme }) => theme.spacing(0.5)} solid var(--home-text);
    outline-offset: ${({ theme }) => theme.spacing(0.75)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    min-width: ${({ theme }) => theme.spacing(40)};
  }
`;

export const InstagramLink = styled.a`
  display: inline-flex;
  height: ${({ theme }) => theme.spacing(12)};
  background-color: var(--button-selected);
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(0, 4)};
  border: ${({ theme }) => theme.spacing(0.25)} solid var(--text-primary);
  border-radius: ${({ theme }) => theme.spacing(1)};
  color: var(--text-primary);
  font-size: 0.875rem;
  font-weight: 500;
  width: ${({ theme }) => theme.spacing(60)};
  transition:
    border-color ${({ theme }) => theme.transitions.default},
    color ${({ theme }) => theme.transitions.default},
    background ${({ theme }) => theme.transitions.default};

  svg {
    width: ${({ theme }) => theme.spacing(4.5)};
    height: ${({ theme }) => theme.spacing(4.5)};
  }

  &:hover {
    /* border-color: var(--accent); */
    /* background: color-mix(in srgb, var(--button-focus) 50%, transparent); */
    background-color: var(--button-focus);
    /* color: var(--accent); */
  }
`;
