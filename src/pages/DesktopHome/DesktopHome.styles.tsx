import styled from 'styled-components';
import {
  ColumnFlexContainer,
  Container,
} from '@/components/uiComponents/container/Container';
import { MIDNIGHT_CANDLE_BACKGROUND_URL } from '@/constants/assets';

export const HomePage = styled(Container)`
  position: relative;
  min-width: 0;
  min-height: 100vh;
  overflow: hidden;
  isolation: isolate;
  color: var(--home-text);
  transition: color ${({ theme }) => theme.transitions.default};

  &::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: -1;
    background: url(${MIDNIGHT_CANDLE_BACKGROUND_URL}) center / cover no-repeat;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    &::before {
      background-position: 30% center;
    }
  }
`;

export const HeroContent = styled(ColumnFlexContainer)`
  position: relative;
  z-index: 1;
  margin: ${({ theme }) => theme.spacing(12, 0, 0)};
  min-height: calc(100vh - ${({ theme }) => theme.spacing(26.25)});
  align-items: center;
  padding: clamp(
      ${({ theme }) => theme.spacing(17.5)},
      13vh,
      ${({ theme }) => theme.spacing(36.25)}
    )
    ${({ theme }) => theme.spacing(10)} ${({ theme }) => theme.spacing(20)};
  text-align: center;
  text-shadow: ${({ theme }) => theme.spacing(0, 0.5, 4.5)} rgba(0, 0, 0, 0.72);

  h1 {
    margin: 0;
    font-family: ${({ theme }) => theme.typography.displayFontFamily};
    font-size: clamp(2.75rem, 4.2vw, 4rem);
    font-weight: 300;
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
    min-height: calc(100dvh - ${({ theme }) => theme.spacing(18.5)});
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
  height: ${({ theme }) => theme.spacing(12.5)};
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
