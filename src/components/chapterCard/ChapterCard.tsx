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
  isAvailable?: boolean;
};

export const ChapterCard: React.FC<ChapterCardProps> = ({
  chapter,
  chapterNumber,
  storyId,
  isAvailable = true,
}) => {
  const content = (
    <ChapterCardContainer element="article" $isAvailable={isAvailable}>
      <ColumnFlexContainer gap={[1.5]}>
        <ChapterNumber>Chapter {chapterNumber}</ChapterNumber>
        <Typography variant="h6" weight="semiBold" color="var(--text-primary)">
          {chapter.title}
        </Typography>
      </ColumnFlexContainer>
      <ChapterMeta>
        <Typography variant="caption" color="var(--text-secondary)">
          {isAvailable ? `${chapter.readTime} read` : 'Coming soon'}
        </Typography>
        {isAvailable && <ChevronRight aria-hidden="true" />}
      </ChapterMeta>
    </ChapterCardContainer>
  );

  if (!isAvailable) return content;

  return (
    <ChapterCardLink
      to={`/stories/${storyId}/chapters/${chapter.id}`}
      aria-label={`Read chapter ${chapterNumber}: ${chapter.title}`}
    >
      {content}
    </ChapterCardLink>
  );
};
