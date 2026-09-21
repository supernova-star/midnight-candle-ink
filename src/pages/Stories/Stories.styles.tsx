import styled from 'styled-components';
import {
  ColumnFlexContainer,
  Container,
} from '@/components/uiComponents/container/Container';

export const StoriesContent = styled(ColumnFlexContainer)`
  width: min(
    calc(100% - ${({ theme }) => theme.spacing(30)}),
    ${({ theme }) => theme.spacing(320)}
  );
  min-height: 0;
  flex: 1;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(8, 0, 8)};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    width: calc(100% - ${({ theme }) => theme.spacing(12)});
    padding: ${({ theme }) => theme.spacing(4, 0)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    width: calc(100% - ${({ theme }) => theme.spacing(8)});
    padding: ${({ theme }) => theme.spacing(4, 0)};
  }
`;

export const StoryGrid = styled(Container)`
  display: grid;
  min-height: 0;
  flex: 1;
  grid-template-columns: repeat(
    4,
    minmax(0, ${({ theme }) => theme.spacing(60)})
  );
  align-content: start;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(8)};
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing(1, 3)};
  scrollbar-color: var(--border) transparent;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: ${({ theme }) => theme.spacing(1.5)};
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: ${({ theme }) => theme.radii.sm};
    background: var(--border);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    grid-template-columns: minmax(0, 1fr);
    gap: ${({ theme }) => theme.spacing(4)};
    padding: ${({ theme }) => theme.spacing(1, 0, 3)};
  }
`;
