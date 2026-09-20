import styled from 'styled-components';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';

export const StoryDetailContent = styled(ColumnFlexContainer)`
  width: min(
    calc(100% - ${({ theme }) => theme.spacing(30)}),
    ${({ theme }) => theme.spacing(240)}
  );
  min-height: 0;
  flex: 1;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(4, 0, 8)};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    width: calc(100% - ${({ theme }) => theme.spacing(8)});
    padding: ${({ theme }) => theme.spacing(4, 0)};
  }
`;

export const StoryHeader = styled(RowFlexContainer)`
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(16)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(5)};
  }
`;

export const StoryIntroduction = styled(RowFlexContainer)`
  min-width: 0;
  flex: 1;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(5)};
`;

export const StoryMetadataContainer = styled(ColumnFlexContainer)`
  width: ${({ theme }) => theme.spacing(62)};
  flex-shrink: 0;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(1, 0, 0)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing(3, 4)};
    padding: 0;
  }
`;

export const StoryCover = styled.img`
  display: block;
  width: ${({ theme }) => theme.spacing(28)};
  height: ${({ theme }) => theme.spacing(32)};
  flex-shrink: 0;
  border: ${({ theme }) => theme.spacing(0.25)} solid var(--border);
  border-radius: ${({ theme }) => theme.radii.md};
  object-fit: cover;
`;

export const ChaptersList = styled(ColumnFlexContainer)`
  min-height: 0;
  flex: 1;
  gap: ${({ theme }) => theme.spacing(3)};
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing(1, 3, 3, 1)};
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    padding: ${({ theme }) => theme.spacing(1, 0, 3)};
  }
`;

export const MetadataItem = styled(RowFlexContainer)`
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  color: var(--text-secondary);

  svg {
    width: ${({ theme }) => theme.spacing(4)};
    height: ${({ theme }) => theme.spacing(4)};
    flex-shrink: 0;
    color: var(--accent);
    stroke-width: 1.6;
  }
`;
