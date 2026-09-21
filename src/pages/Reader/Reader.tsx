import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/uiComponents/button/Button';
import { ColumnFlexContainer } from '@/components/uiComponents/container/Container';
import { SiteNavigation } from '@/components/siteNavigation/SiteNavigation';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { stories } from '@/constants/stories';
import { useResponsive } from '@/hooks/useResponsive';
import { ReaderContent, ReadingBody } from './Reader.styles';
import theme from '@/theme/theme';

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

  if (!story || !chapter || chapterIndex === undefined) {
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
      <ReaderContent $isMobile={isMobile}>
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
      </ReaderContent>
    </ColumnFlexContainer>
  );
};
