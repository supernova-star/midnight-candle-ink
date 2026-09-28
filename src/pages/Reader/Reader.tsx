import React, { useEffect, useState } from 'react';
import { ArrowLeft, MessagesSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/uiComponents/button/Button';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { SiteNavigation } from '@/components/siteNavigation/SiteNavigation';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { stories } from '@/constants/stories';
import { useResponsive } from '@/hooks/useResponsive';
import { ReaderContent, ReadingBody } from './Reader.styles';
import theme from '@/theme/theme';
import { ActionButtonContainer } from './ActionButtonContainer';
import { isDateTodayOrBefore } from '@/admin/utils/formatter';
import { useFeedback } from '@/hooks/useFeedback';
import { Banner } from '@/components/uiComponents/banner/Banner';
import { FeedbackModal } from '@/components/feedbackModal/FeedbackModal';

export const Reader: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useResponsive();
  const [markdown, setMarkdown] = useState('');
  const [hasLoadError, setHasLoadError] = useState(false);
  const { storyId, chapterId } = useParams();
  const story = stories.find((item) => item.id === storyId);
  const chapterIndex = story?.chapters.findIndex(
    (item) => item.id === chapterId,
  );
  const chapter =
    story && chapterIndex !== undefined && chapterIndex >= 0
      ? story.chapters[chapterIndex]
      : undefined;

  useEffect(() => {
    if (!chapter) {
      setMarkdown('');
      setHasLoadError(false);
      return;
    }

    const controller = new AbortController();

    setMarkdown('');
    setHasLoadError(false);

    fetch(chapter.markdownUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load chapter');
        }

        return response.text();
      })
      .then(setMarkdown)
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setHasLoadError(true);
      });

    return () => controller.abort();
  }, [chapter]);

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

  if (!story || !chapter || chapterIndex === undefined) {
    return <Navigate to="/not-found" replace />;
  }

  const isFirstChapter = chapterIndex === 0;
  const isLastChapter = chapterIndex === story.chapters.length - 1;

  const previousChapter = !isFirstChapter
    ? story.chapters[chapterIndex - 1]
    : undefined;

  const nextChapter = !isLastChapter
    ? story.chapters[chapterIndex + 1]
    : undefined;

  const previousChapterName = previousChapter?.title ?? 'No previous chapter';

  const nextChapterName = nextChapter?.title ?? 'No next chapter';

  const isPreviousChapterPublished = previousChapter
    ? isDateTodayOrBefore(previousChapter.postedDate)
    : false;

  const isNextChapterPublished = nextChapter
    ? isDateTodayOrBefore(nextChapter.postedDate)
    : false;

  const isPreviousDisabled = isFirstChapter || !isPreviousChapterPublished;

  const isNextDisabled = isLastChapter || !isNextChapterPublished;

  const handlePrevious = () => {
    if (isPreviousDisabled || !previousChapter) {
      return;
    }

    navigate(`/stories/${story.id}/chapters/${previousChapter.id}`);
  };

  const handleNext = () => {
    if (isNextDisabled || !nextChapter) {
      return;
    }

    navigate(`/stories/${story.id}/chapters/${nextChapter.id}`);
  };

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
        titleType="CHAPTER"
        handleSubmit={handleSubmitFeedback}
        isSubmitting={isSubmitting}
      />
      <ReaderContent $isMobile={isMobile}>
        <RowFlexContainer justifyContent="between" alignItems="center">
          <Button
            text={`Back to ${story.title}`}
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
            onClick={() => navigate(`/stories/${story.id}`)}
            sx={{
              alignSelf: 'flex-start',
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
              handleModalDetails(`${story.title} - ${chapter.title}`);
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
        <Typography
          component="h1"
          variant={isMobile ? 'body2' : 'h6'}
          weight="semiBold"
          color="var(--accent)"
          sx={{ margin: theme.spacing(2, 0), padding: theme.spacing(0, 3) }}
        >
          Chapter {chapterIndex + 1} - {chapter.title}
        </Typography>

        <ReadingBody>
          {hasLoadError ? (
            <Typography variant="body1" color="var(--text-secondary)">
              This chapter could not be loaded.
            </Typography>
          ) : markdown ? (
            <ReactMarkdown
              components={{
                p: ({ children }) => {
                  const content = String(children).trim();

                  const isSceneBreak = content === '...';
                  const isStoryEnd = content === '❦';

                  return (
                    <p
                      className={
                        isSceneBreak
                          ? 'scene-break'
                          : isStoryEnd
                            ? 'story-end-ornament'
                            : undefined
                      }
                    >
                      {children}
                    </p>
                  );
                },

                h3: ({ children }) => <h3 className="story-end">{children}</h3>,
              }}
            >
              {markdown}
            </ReactMarkdown>
          ) : (
            <Typography variant="body1" color="var(--text-secondary)">
              Loading chapter...
            </Typography>
          )}
        </ReadingBody>
        <ActionButtonContainer
          isPreviousDisabled={isPreviousDisabled}
          isNextDisabled={isNextDisabled}
          previousChapterName={previousChapterName}
          nextChapterName={nextChapterName}
          onPreviousClick={handlePrevious}
          onNextClick={handleNext}
        />
      </ReaderContent>

      <Typography
        variant="caption"
        color="var(--text-secondary)"
        sx={{
          display: 'block',
          textAlign: 'center',
          marginTop: theme.spacing(2),
          padding: theme.spacing(0, 3, 3),
          opacity: 0.7,
        }}
      >
        © 2026 Midnight Candle & Ink. All rights reserved.
      </Typography>
    </ColumnFlexContainer>
  );
};
