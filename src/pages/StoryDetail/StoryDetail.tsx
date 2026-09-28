import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Clock,
  MessagesSquare,
} from 'lucide-react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/uiComponents/button/Button';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
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
  StoryMetadataContainer,
} from './StoryDetail.styles';
import { useResponsive } from '@/hooks/useResponsive';
import { Banner, BannerItem } from '@/components/uiComponents/banner/Banner';
import { FeedbackModal } from '@/components/feedbackModal/FeedbackModal';
import { submitFeedback } from '@/utils/visitorTracking';
import { useFeedback } from '@/hooks/useFeedback';

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

  const {
    isFeedbackModalOpen,
    setIsFeedbackModalOpen,
    title,
    isSubmitting,
    banner,
    setBanner,
    handleModalDetails,
    handleSubmitFeedback,
  } = useFeedback();

  // const [isfeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  // const [title, setTitle] = useState('');
  // const [isSubmitting, setIsSubmitting] = useState(false);

  // const [banner, setBanner] = useState<BannerItem>({
  //   open: false,
  //   message: '',
  //   severity: 'success',
  // });

  // const handleSubmitFeedback = async (feedback: string): Promise<void> => {
  //   const trimmedFeedback = feedback.trim();
  //   if (!trimmedFeedback || isSubmitting) {
  //     return;
  //   }
  //   setIsSubmitting(true);
  //   const response = await submitFeedback(trimmedFeedback);
  //   if (response) {
  //     setIsFeedbackModalOpen(false);
  //     setIsSubmitting(false);
  //     setBanner({
  //       open: true,
  //       message: 'Thank you for sharing your thoughts! It really means a lot!',
  //       severity: 'success',
  //     });
  //     return;
  //   }
  //   setIsFeedbackModalOpen(false);
  //   setBanner({
  //     open: true,
  //     message: 'Failed to submit feedback. Please try again.',
  //     severity: 'error',
  //   });
  //   setIsSubmitting(false);
  // };

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
      <Banner
        open={banner.open}
        message={banner.message}
        severity={banner.severity}
        onClose={() =>
          setBanner((previous) => ({
            ...previous,
            open: false,
          }))
        }
      />
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => {
          setIsFeedbackModalOpen(false);
        }}
        title={title}
        titleType="STORY"
        handleSubmit={handleSubmitFeedback}
        isSubmitting={isSubmitting}
      />
      <StoryDetailContent>
        <RowFlexContainer justifyContent="between" alignItems="center">
          <Button
            text="Back to stories"
            size="xSmall"
            iconOptions={{
              icon: ArrowLeft,
              iconColor: 'var(--button-primary-text)',
            }}
            textOptions={{
              textColor: 'var(--button-primary-text)',
              textVariant: 'caption',
              textWeight: 'semiBold',
            }}
            buttonStyles={{
              bgColor: 'var(--button-primary-bg)',
              borderRadius: [2],
            }}
            onClick={() => navigate(`/stories`)}
            sx={{
              alignSelf: 'flex-start',
              margin: '0 0 16px 0',
              '&:hover': { backgroundColor: 'var(--button-hover-bg)' },
              '&:hover .MuiTypography-root': {
                color: 'var(--button-hover-text)',
              },
              '&:hover .MuiButton-startIcon svg': {
                color: 'var(--button-hover-text)',
              },
            }}
          />
          <Button
            text="Give Feedback"
            size="xSmall"
            variant="outlined"
            onClick={() => {
              handleModalDetails(story.title);
            }}
            iconOptions={{
              icon: MessagesSquare,
              iconColor: 'var(--button-primary-bg)',
            }}
            textOptions={{
              textColor: 'var(--button-primary-bg)',
              textVariant: 'caption',
              textWeight: 'semiBold',
            }}
            buttonStyles={{
              bgColor: 'var(--button-primary-bg)',
              borderRadius: [2],
            }}
            sx={{
              alignSelf: 'flex-start',
              margin: '0 0 16px 0',
              '&:hover': { backgroundColor: 'var(--background)' },
            }}
          />
        </RowFlexContainer>
        <StoryHeader>
          <RowFlexContainer
            minWidth={[0]}
            flex={1}
            alignItems="start"
            gap={[5]}
          >
            <StoryCover src={story.image} alt={`${story.title} cover`} />
            <ColumnFlexContainer flex={1} gap={[2]}>
              <Typography
                component={isMobile ? 'h3' : 'h1'}
                variant={isMobile ? 'h6' : 'h4'}
                weight="semiBold"
                color="var(--text-primary)"
              >
                {story.title}
              </Typography>
              <Typography
                variant={isMobile ? 'body2' : 'body1'}
                weight="light"
                color="var(--text-secondary)"
              >
                {story.summary}
              </Typography>
              {isMobile && <StoreMetaDataComponent story={story} />}
            </ColumnFlexContainer>
          </RowFlexContainer>
          {!isMobile && <StoreMetaDataComponent story={story} />}
        </StoryHeader>
        <ColumnFlexContainer
          element="section"
          flex={1}
          minHeight="0px"
          gap={[3]}
          margin={[3, 0, 0]}
          overflow="hidden"
          aria-labelledby="chapters-heading"
        >
          <Typography
            id="chapters-heading"
            component="h2"
            variant="subtitle2"
            color="var(--accent)"
            textStyle="uppercase"
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
                postDate={chapter.postedDate}
                isAvailable={chapter.isAvailable}
              />
            ))}
          </ChaptersList>
        </ColumnFlexContainer>
      </StoryDetailContent>
    </ColumnFlexContainer>
  );
};
