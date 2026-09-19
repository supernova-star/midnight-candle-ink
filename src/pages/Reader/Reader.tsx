import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/uiComponents/button/Button';
import {
  ColumnFlexContainer,
  Container,
} from '@/components/uiComponents/container/Container';
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
        <Container
          display="flex"
          flexDirection={isMobile ? 'column' : 'row'}
          gap={[1]}
          alignItems="center"
        >
          <Button
            text={`Back to ${story.title}`}
            variant="text"
            size="small"
            iconOptions={{
              icon: ArrowLeft,
              iconColor: 'var(--text-secondary)',
            }}
            textOptions={{
              textColor: 'var(--text-secondary)',
              textVariant: 'caption',
              textWeight: 'regular',
            }}
            onClick={() => navigate(`/stories/${story.id}`)}
            sx={{
              alignSelf: 'flex-start',
              '&:hover': { backgroundColor: 'transparent' },
              '&:hover .MuiTypography-root': { color: 'var(--accent)' },
              '&:hover .MuiButton-startIcon svg': { color: 'var(--accent)' },
            }}
          />
          <Typography
            component="h1"
            variant={isMobile ? 'body2' : 'h6'}
            weight="semiBold"
            color="var(--accent)"
            sx={{ flex: 1, margin: theme.spacing(2, 0) }}
          >
            Chapter {chapterIndex + 1} - {chapter.title}
          </Typography>
        </Container>

        <ReadingBody>
          {hasLoadError ? (
            <Typography variant="body1" color="var(--text-secondary)">
              This chapter could not be loaded.
            </Typography>
          ) : markdown ? (
            <ReactMarkdown
              components={{
                p: ({ children }) => {
                  const isSceneBreak = String(children).trim() === '...';

                  return (
                    <p className={isSceneBreak ? 'scene-break' : undefined}>
                      {children}
                    </p>
                  );
                },
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
