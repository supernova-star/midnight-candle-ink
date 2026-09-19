import React from 'react';
import { ArrowLeft, BookOpen, CalendarDays, Clock } from 'lucide-react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/uiComponents/button/Button';
import { ColumnFlexContainer } from '@/components/uiComponents/container/Container';
import { SiteNavigation } from '@/components/siteNavigation/SiteNavigation';
import { ChapterCard } from '@/components/chapterCard/ChapterCard';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { stories, StoryMetadata } from '@/constants/stories';
import {
  ChaptersList,
  MetadataItem,
  StoryCover,
  StoryDetailContent,
  StoryHeader,
  StoryIntroduction,
  StoryMetadataContainer,
} from './StoryDetail.styles';
import { useResponsive } from '@/hooks/useResponsive';

type StoreMetaDataComponentProps = {
  story: StoryMetadata;
};

const StoreMetaDataComponent: React.FC<StoreMetaDataComponentProps> = ({
  story,
}) => {
  return (
    <StoryMetadataContainer aria-label="Story details">
      <MetadataItem>
        <Clock aria-hidden="true" />
        <Typography variant="caption" color="var(--text-secondary)">
          {story.readTime} min read
        </Typography>
      </MetadataItem>
      <MetadataItem>
        <BookOpen aria-hidden="true" />
        <Typography variant="caption" color="var(--text-secondary)">
          {story.chapters.length} chapters
        </Typography>
      </MetadataItem>
      <MetadataItem>
        <CalendarDays aria-hidden="true" />
        <Typography variant="caption" color="var(--text-secondary)">
          Posted {story.postedDay}
        </Typography>
      </MetadataItem>
    </StoryMetadataContainer>
  );
};

export const StoryDetail: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useResponsive();
  const { storyId } = useParams();
  const story = stories.find((item) => item.id === storyId);

  if (!story) {
    return <Navigate to="/not-found" replace />;
  }

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
      <StoryDetailContent>
        <Button
          text="Back to stories"
          variant="text"
          size="xSmall"
          iconOptions={{ icon: ArrowLeft, iconColor: 'var(--text-secondary)' }}
          textOptions={{
            textColor: 'var(--text-secondary)',
            textVariant: 'caption',
            textWeight: 'regular',
          }}
          buttonStyles={{ margin: [0, 0, 4] }}
          onClick={() => navigate('/stories')}
          sx={{
            alignSelf: 'flex-start',
            color: 'var(--text-secondary)',
            '&:hover': {
              backgroundColor: 'transparent',
            },
            '&:hover .MuiTypography-root': { color: 'var(--accent)' },
            '&:hover .MuiButton-startIcon svg': { color: 'var(--accent)' },
          }}
        />
        <StoryHeader>
          <StoryIntroduction>
            <StoryCover src={story.image} alt={`${story.title} cover`} />
            <ColumnFlexContainer flex={1} gap={[2]}>
              <Typography
                component="h1"
                variant={isMobile ? 'h5' : 'h4'}
                weight="semiBold"
                color="var(--text-primary)"
              >
                {story.title}
              </Typography>
              <Typography
                variant="body1"
                weight="light"
                color="var(--text-secondary)"
              >
                {story.summary}
              </Typography>
              {isMobile && <StoreMetaDataComponent story={story} />}
            </ColumnFlexContainer>
          </StoryIntroduction>
          {!isMobile && <StoreMetaDataComponent story={story} />}
        </StoryHeader>
        <ColumnFlexContainer
          element="section"
          flex={1}
          minHeight="0px"
          gap={[3]}
          margin={[8, 0, 0]}
          overflow="hidden"
          aria-labelledby="chapters-heading"
        >
          <Typography
            id="chapters-heading"
            component="h2"
            variant="h5"
            weight="semiBold"
            color="var(--text-primary)"
          >
            Chapters
          </Typography>
          <ChaptersList>
            {story.chapters.map((chapter, index) => (
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                chapterNumber={index + 1}
                storyId={story.id}
              />
            ))}
          </ChaptersList>
        </ColumnFlexContainer>
      </StoryDetailContent>
    </ColumnFlexContainer>
  );
};
