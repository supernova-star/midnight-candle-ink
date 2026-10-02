import React, { FC } from 'react';
import { ArrowRight, Lock, MessagesSquare } from 'lucide-react';
import type { StoryMetadata } from '@/constants/stories';
import { Typography } from '@/components/uiComponents/typography/Typography';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import theme from '@/theme/theme';
import { Card, CardLink, ReadLabel, StoryImage } from './StoryCard.styles';
import { useResponsive } from '@/hooks/useResponsive';

type StoryCardProps = {
  story: StoryMetadata;
  sendModalDetails: (title: string) => void;
};

const isStoryPublished = (postedDay: string) => {
  const postedDate = new Date(postedDay);
  const today = new Date();

  // Remove the time portion
  postedDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return postedDate > today ? false : true;
};

const formatShortDate = (date: string): string =>
  new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));

export const StoryCard: FC<StoryCardProps> = ({ story, sendModalDetails }) => {
  const isPublished = isStoryPublished(story.postedDay);
  const isMobile = useResponsive();
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
          {isMobile && !isPublished && (
            <Typography
              variant="caption"
              color="var(--text-secondary)"
              sx={{ marginTop: theme.spacing(2) }}
            >
              Coming Soon - {formatShortDate(story.postedDay)}
            </Typography>
          )}
          <ReadLabel>
            {isPublished
              ? 'Read Story'
              : `Coming Soon - ${formatShortDate(story.postedDay)}`}
            {isPublished ? (
              <ArrowRight aria-hidden="true" />
            ) : (
              <Lock aria-hidden="true" />
            )}
          </ReadLabel>
        </ColumnFlexContainer>
        {isPublished && (
          <RowFlexContainer
            backgroundColor="#F4EBDD"
            padding={[2, 3]}
            gap={[2]}
            position="absolute"
            borderRadius={[10]}
            top={isMobile ? '8px' : '50%'}
            right={isMobile ? '8px' : '8px'}
            width="fit-content"
            cursor="pointer"
            onClick={(event) => {
              event.preventDefault();
              sendModalDetails(story.title);
            }}
            sx={{
              boxShadow: '0 2px 8px rgb(0 0 0 / 12%)',
              transition:
                'background-color 150ms ease, transform 150ms ease, box-shadow 150ms ease',

              '&:hover': {
                backgroundColor: 'white',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgb(0 0 0 / 16%)',
              },
            }}
          >
            <MessagesSquare size={isMobile ? 16 : 16} color="#222222" />
            {!isMobile && (
              <Typography
                variant="legal"
                weight="semiBold"
                color="#222222"
                sx={{ margin: 0 }}
              >
                Feedback
              </Typography>
            )}
          </RowFlexContainer>
        )}
      </Card>
    </CardLink>
  );
};
