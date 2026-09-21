import React from 'react';
import { BookOpen, Instagram } from 'lucide-react';
import { SiteNavigation } from '@/components/siteNavigation/SiteNavigation';
import { ColumnFlexContainer } from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import theme from '@/theme/theme';
import { AboutDivider, InstagramLink, Signature } from './About.styles';

export const About: React.FC = () => (
  <ColumnFlexContainer
    element="main"
    minWidth="0"
    minHeight="100dvh"
    backgroundColor="var(--background)"
    sx={{
      color: 'var(--text-primary)',
      backgroundImage:
        'repeating-linear-gradient(0deg, transparent, transparent 35px, color-mix(in srgb, var(--border) 18%, transparent) 36px)',
    }}
  >
    <SiteNavigation />
    <ColumnFlexContainer
      flex={1}
      alignItems="center"
      justifyContent="center"
      gap={[4]}
      padding={[12, 8, 20]}
      textAlign="center"
    >
      <BookOpen
        size={theme.spacing(9)}
        strokeWidth={1.5}
        color="var(--accent)"
        aria-hidden="true"
      />
      <Typography
        component="h1"
        variant="h3"
        weight="semiBold"
        color="var(--text-primary)"
        textAlign="center"
      >
        About Midnight Candle &amp; Ink
      </Typography>
      <Typography
        variant="body1"
        weight="light"
        color="var(--text-secondary)"
        textAlign="center"
        sx={{ maxWidth: theme.spacing(150), lineHeight: 1.8 }}
      >
        A quiet corner for short stories made for late nights, slow mornings,
        and the moments in between. Settle in, turn the page, and stay awhile.
      </Typography>
      <AboutDivider aria-hidden="true" />
      <Signature>
        <Typography
          variant="caption"
          weight="light"
          color="var(--text-secondary)"
        >
          Written slowly. Shared warmly.
        </Typography>
      </Signature>
      <InstagramLink
        href="https://www.instagram.com/midnight_candle_stories/"
        target="_blank"
        rel="noreferrer"
        aria-label="Visit Midnight Candle and Ink on Instagram"
      >
        <Instagram aria-hidden="true" />
        Instagram
      </InstagramLink>
    </ColumnFlexContainer>
  </ColumnFlexContainer>
);
