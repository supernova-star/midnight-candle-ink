import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { ChapterMetadata } from '@/constants/stories';
import { ColumnFlexContainer } from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import {
  ChapterCardLink,
  ChapterCardContainer,
  ChapterMeta,
  ChapterNumber,
} from './ChapterCard.styles';

type ChapterCardProps = {
  chapter: ChapterMetadata;
  chapterNumber: number;
  storyId: string;
};

export const ChapterCard: React.FC<ChapterCardProps> = ({
  chapter,
  chapterNumber,
  storyId,
}) => (
  <ChapterCardLink
    to={`/stories/${storyId}/chapters/${chapter.id}`}
    aria-label={`Read chapter ${chapterNumber}: ${chapter.title}`}
  >
    <ChapterCardContainer element="article">
      <ColumnFlexContainer gap={[1.5]}>
        <ChapterNumber>Chapter {chapterNumber}</ChapterNumber>
        <Typography variant="h6" weight="semiBold" color="var(--text-primary)">
          {chapter.title}
        </Typography>
      </ColumnFlexContainer>
      <ChapterMeta>
        <Typography variant="caption" color="var(--text-secondary)">
          {chapter.readTime} read
        </Typography>
        <ChevronRight aria-hidden="true" />
      </ChapterMeta>
    </ChapterCardContainer>
  </ChapterCardLink>
);
