import React from 'react';
import { SiteNavigation } from '@/components/siteNavigation/SiteNavigation';
import { StoryCard } from '@/components/storyCard/StoryCard';
import { stories } from '@/constants/stories';
import { Typography } from '@/components/uiComponents/typography/Typography';
import theme from '@/theme/theme';
import { StoriesContent, StoryGrid } from './Stories.styles';
import { ColumnFlexContainer } from '@/components/uiComponents/container/Container';
import { useResponsive } from '@/hooks/useResponsive';

export const Stories: React.FC = () => {
  const isMobile = useResponsive();
  return (
    <ColumnFlexContainer
      element="main"
      minWidth="0"
      height="100dvh"
      overflow="hidden"
      backgroundColor="var(--background)"
      sx={{ color: 'var(--text-primary)' }}
    >
      <SiteNavigation />
      <StoriesContent>
        <ColumnFlexContainer
          alignItems="center"
          margin={[0, 0, 5]}
          element="header"
          gap={[3]}
        >
          <Typography
            component="h1"
            variant={isMobile ? 'h5' : 'h3'}
            weight="semiBold"
            color="var(--text-primary)"
            textAlign="center"
          >
            Stories for quieter days
          </Typography>
          <Typography
            weight="light"
            color="var(--text-secondary)"
            textAlign="center"
            variant={isMobile ? 'caption' : 'body1'}
          >
            A collection of short stories for late nights, slow mornings,
            <br />
            and everything in between.
          </Typography>
        </ColumnFlexContainer>
        <StoryGrid>
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </StoryGrid>
      </StoriesContent>
    </ColumnFlexContainer>
  );
};
