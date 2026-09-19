import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import {
  ColumnFlexContainer,
  Container,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';

const flicker = keyframes`
  0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.92; }
  45% { transform: translateX(-48%) scale(0.94, 1.06); opacity: 1; }
  70% { transform: translateX(-52%) scale(1.04, 0.96); opacity: 0.86; }
`;

export const NotFoundPage = styled(Container)`
  position: relative;
  min-width: 0;
  min-height: 100vh;
  overflow: hidden;
  isolation: isolate;
  background:
    radial-gradient(
      circle at 50% 58%,
      rgba(201, 112, 61, 0.2),
      transparent 28%
    ),
    linear-gradient(145deg, #21150f, #100d0b 72%);
  color: #f8ecda;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background-image: linear-gradient(
      rgba(255, 255, 255, 0.018) 1px,
      transparent 1px
    );
    background-size: 100% ${({ theme }) => theme.spacing(9)};
    pointer-events: none;
  }
`;

export const NotFoundContent = styled(ColumnFlexContainer)`
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: ${({ theme }) => theme.spacing(15, 8, 22)};
  text-align: center;
`;

export const CandleMark = styled(Container)`
  position: relative;
  width: ${({ theme }) => theme.spacing(11)};
  height: ${({ theme }) => theme.spacing(18)};
  margin-bottom: ${({ theme }) => theme.spacing(6)};
  border-radius: ${({ theme }) => theme.spacing(1, 1, 2, 2)};
  background: linear-gradient(90deg, #d9c4a2, #fff2d7 55%, #cdb28e);
  box-shadow: ${({ theme }) => theme.spacing(0, 4, 18)} rgba(186, 83, 40, 0.2);

  &::before {
    content: '';
    position: absolute;
    bottom: calc(100% + ${({ theme }) => theme.spacing(1)});
    left: 50%;
    width: ${({ theme }) => theme.spacing(4)};
    height: ${({ theme }) => theme.spacing(7)};
    border-radius: 55% 45% 55% 45%;
    background: linear-gradient(#ffe9a6, #dc632e 72%);
    box-shadow: 0 0 ${({ theme }) => theme.spacing(7)} rgba(236, 128, 54, 0.72);
    transform-origin: bottom;
    animation: ${flicker} 2.8s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: ${({ theme }) => theme.spacing(-1.5)};
    left: 50%;
    width: ${({ theme }) => theme.spacing(0.5)};
    height: ${({ theme }) => theme.spacing(3)};
    background: #493328;
    transform: translateX(-50%);
  }
`;

export const ErrorCode = styled.p`
  margin: 0;
  color: #d99361;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

export const ErrorTitle = styled.h1`
  max-width: ${({ theme }) => theme.spacing(170)};
  margin: ${({ theme }) => theme.spacing(3, 0, 4)};
  font-size: clamp(2.5rem, 4vw, 4.25rem);
  font-weight: 300;
  line-height: 1.13;
  letter-spacing: 0;
`;

export const ErrorMessage = styled.p`
  max-width: ${({ theme }) => theme.spacing(135)};
  margin: 0;
  color: rgba(248, 236, 218, 0.7);
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.7;
`;

export const Actions = styled(RowFlexContainer)`
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing(8)};
`;

export const HomeLink = styled(Link)`
  display: inline-flex;
  min-height: ${({ theme }) => theme.spacing(12)};
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(0, 5)};
  border: ${({ theme }) => theme.spacing(0.25)} solid rgba(225, 153, 143, 0.55);
  border-radius: ${({ theme }) => theme.radii.sm};
  background: rgba(120, 52, 57, 0.88);
  color: #fff4e5;
  font-size: 0.9375rem;
  transition:
    background ${({ theme }) => theme.transitions.default},
    transform ${({ theme }) => theme.transitions.default};

  svg {
    width: ${({ theme }) => theme.spacing(4)};
    height: ${({ theme }) => theme.spacing(4)};
  }

  &:hover {
    background: rgba(142, 63, 68, 0.98);
    transform: translateY(${({ theme }) => theme.spacing(-0.25)});
  }

  &:focus-visible {
    outline: ${({ theme }) => theme.spacing(0.5)} solid #fff4e5;
    outline-offset: ${({ theme }) => theme.spacing(0.75)};
  }
`;
