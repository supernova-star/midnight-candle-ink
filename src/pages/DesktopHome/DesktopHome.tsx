import React from 'react';
import { ArrowRight, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SiteNavigation } from '@/components/siteNavigation/SiteNavigation';
import {
  HeroContent,
  HomePage,
  PrimaryAction,
  InstagramLink,
} from './DesktopHome.styles';
import {
  Container,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';

export const DesktopHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <HomePage element="main">
      <SiteNavigation />

      <HeroContent element="section">
        <h1>
          Stories for when
          <br />
          the world gets quiet.
        </h1>
        <p>
          Short fiction, strange little things,
          <br />
          and stories that stay with you.
        </p>
        <PrimaryAction type="button" onClick={() => navigate('/stories')}>
          Explore Stories
          <ArrowRight aria-hidden="true" />
        </PrimaryAction>
        <RowFlexContainer
          gap={[2]}
          width={[55]}
          justifyContent="center"
          alignItems="center"
          aria-hidden="true"
        >
          <Container
            width={[4]}
            height={[0.5]}
            flex={1}
            backgroundColor="var(--accent)"
          ></Container>
          <Typography
            variant="caption"
            weight="semiBold"
            color="var(--text-primary)"
          >
            OR
          </Typography>
          <Container
            width={[4]}
            height={[0.5]}
            flex={1}
            backgroundColor="var(--accent)"
          ></Container>
        </RowFlexContainer>
        <InstagramLink
          href="https://www.instagram.com/midnight_candle_stories/"
          target="_blank"
          rel="noreferrer"
          aria-label="Visit Midnight Candle and Ink on Instagram"
        >
          <Instagram aria-hidden="true" />
          Follow on Instagram
        </InstagramLink>
      </HeroContent>
    </HomePage>
  );
};
