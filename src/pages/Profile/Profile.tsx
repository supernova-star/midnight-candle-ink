import React from 'react';
import { SiteNavigation } from '@/components/siteNavigation/SiteNavigation';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { ColumnFlexContainer } from '@/components/uiComponents/container/Container';
import { useResponsive } from '@/hooks/useResponsive';
import { ProfileContent } from './Profile.styles';
import { UserNameSection } from './UserNameSection';
import { FeedbackSection } from './FeedbackSection';

export const Profile: React.FC = () => {
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

      <ProfileContent>
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          color="var(--text-primary)"
          weight="semiBold"
        >
          Your Profile
        </Typography>

        <Typography
          variant={isMobile ? 'caption' : 'subtitle2'}
          color="var(--text-secondary)"
          weight="semiBold"
          sx={{ marginTop: '4px' }}
        >
          Same stories. A newer you.
        </Typography>

        <UserNameSection isMobile={isMobile} />

        <FeedbackSection isMobile={isMobile} />
      </ProfileContent>
    </ColumnFlexContainer>
  );
};
