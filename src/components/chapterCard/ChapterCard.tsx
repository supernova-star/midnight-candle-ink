import React from 'react';
import { CalendarDays, ChevronRight } from 'lucide-react';
import type { ChapterMetadata } from '@/constants/stories';
import { ColumnFlexContainer } from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import {
  ChapterCardLink,
  ChapterCardContainer,
  ChapterMeta,
  ChapterNumber,
} from './ChapterCard.styles';
import { useResponsive } from '@/hooks/useResponsive';
import { MetadataItem } from '@/pages/StoryDetail/StoryDetail.styles';

type ChapterCardProps = {
  chapter: ChapterMetadata;
  chapterNumber: number;
  storyId: string;
  postDate: string;
  isAvailable?: boolean;
};

export const ChapterCard: React.FC<ChapterCardProps> = ({
  chapter,
  chapterNumber,
  storyId,
  postDate,
  isAvailable = true,
}) => {
  const isMobile = useResponsive();
  const content = (
    <ChapterCardContainer element="article" $isAvailable={isAvailable}>
      <ColumnFlexContainer gap={[1.5]}>
        <ChapterNumber>Chapter {chapterNumber}</ChapterNumber>
        <Typography
          variant={isMobile ? 'subtitle1' : 'h6'}
          weight="semiBold"
          color="var(--text-primary)"
        >
          {chapter.title}
        </Typography>
      </ColumnFlexContainer>
      <ChapterMeta>
        <ColumnFlexContainer>
          <Typography variant="caption" color="var(--text-secondary)">
            {isAvailable ? `${chapter.readTime} read` : 'Coming soon'}
          </Typography>
          <MetadataItem>
            <CalendarDays aria-hidden="true" />
            <Typography variant="caption" color="var(--text-secondary)">
              {postDate}
            </Typography>
          </MetadataItem>
        </ColumnFlexContainer>

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
