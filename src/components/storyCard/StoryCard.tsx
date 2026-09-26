import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { StoryMetadata } from '@/constants/stories';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { ColumnFlexContainer } from '@/components/uiComponents/container/Container';
import theme from '@/theme/theme';
import { Card, CardLink, ReadLabel, StoryImage } from './StoryCard.styles';

type StoryCardProps = {
  story: StoryMetadata;
};

const isStoryPublished = (postedDay: string) => {
  const postedDate = new Date(postedDay);
  const today = new Date();

  // Remove the time portion
  postedDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return postedDate > today ? false : true;
};

export const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  const isPublished = isStoryPublished(story.postedDay);
  return (
    <CardLink
      to={isPublished ? `/stories/${story.id}` : '#'}
      aria-label={`Read ${story.title}`}
      aria-disabled={!isPublished}
      onClick={(event) => {
        if (!isPublished) {
          event.preventDefault();
        }
      }}
    >
      <Card>
        <StoryImage src={story.image} alt="" />
        <ColumnFlexContainer flex={1} padding={[3, 2]}>
          <Typography
            variant="h6"
            weight="semiBold"
            color="var(--text-primary)"
            sx={{ margin: 0 }}
          >
            {story.title}
          </Typography>
          <Typography
            variant="caption"
            color="var(--text-secondary)"
            sx={{ marginTop: theme.spacing(2) }}
          >
            {story.genre} · {story.readTime} min read
          </Typography>
          <ReadLabel>
            {isPublished ? 'Read Story' : 'Coming Soon'}
            {isPublished && <ArrowRight aria-hidden="true" />}
          </ReadLabel>
        </ColumnFlexContainer>
      </Card>
    </CardLink>
  );
};
