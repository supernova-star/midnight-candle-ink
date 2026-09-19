import React from 'react';
import { SiteNavigation } from '@/components/siteNavigation/SiteNavigation';
import { Container } from '@/components/uiComponents/container/Container';

type ComingSoonProps = {
  pageName: string;
};

export const ComingSoon: React.FC<ComingSoonProps> = ({ pageName }) => {
  return (
    <Container
      element="main"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      backgroundColor="#ffffff"
      sx={{ color: '#111111' }}
    >
      <SiteNavigation />
      <Container
        display="grid"
        flex={1}
        alignItems="center"
        justifyContent="center"
      >
        <h1>Coming soon: {pageName}</h1>
      </Container>
    </Container>
  );
};
