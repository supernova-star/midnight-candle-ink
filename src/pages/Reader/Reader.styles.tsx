import styled from 'styled-components';
import { ColumnFlexContainer } from '@/components/uiComponents/container/Container';

export const ReaderContent = styled(ColumnFlexContainer)<{
  $isMobile: boolean;
}>`
  width: min(
    calc(100% - ${({ $isMobile, theme }) => theme.spacing($isMobile ? 8 : 30)}),
    ${({ theme }) => theme.spacing(240)}
  );
  min-height: 0;
  flex: 1;
  margin: 0 auto;
  padding: ${({ $isMobile, theme }) => theme.spacing(4, 0, $isMobile ? 4 : 8)};
  overflow: hidden;
`;

export const ReadingBody = styled.article`
  width: 100%;
  max-width: ${({ theme }) => theme.spacing(200)};
  min-height: 0;
  flex: 1;
  margin: 0 auto;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing(1, 3, 8)};
  color: var(--text-primary);
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

  p {
    margin: ${({ theme }) => theme.spacing(0, 0, 5)};
    font-size: 1.0625rem;
    font-weight: 300;
    line-height: 1.9;
  }

  .scene-break {
    margin: ${({ theme }) => theme.spacing(7, 0)};
    color: var(--accent);
    font-size: 2rem;
    letter-spacing: ${({ theme }) => theme.spacing(4)};
    line-height: 1;
    text-align: center;
  }

  .story-end-ornament {
    text-align: center;
    font-size: 2rem;
    margin: 24px 0 8px;
  }

  .story-end {
    text-align: center;
    font-size: 1.125rem;
    font-weight: 500;
    letter-spacing: 4px;
    margin-top: 0px;
  }
  h2 {
    margin: ${({ theme }) => theme.spacing(1, 0)};
    letter-spacing: 0;
  }
  h3 {
    margin: ${({ theme }) => theme.spacing(8, 0, 3)};
    letter-spacing: 0;
  }

  blockquote {
    margin: ${({ theme }) => theme.spacing(6, 0)};
    padding-left: ${({ theme }) => theme.spacing(4)};
    border-left: ${({ theme }) => theme.spacing(0.5)} solid var(--accent);
    color: var(--text-secondary);
  }
`;
