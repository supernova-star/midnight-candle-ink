import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SiteNavigation } from '@/components/siteNavigation/SiteNavigation';
import { HeroContent, HomePage, PrimaryAction } from './DesktopHome.styles';

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
      </HeroContent>
    </HomePage>
  );
};
