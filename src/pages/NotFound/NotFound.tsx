import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { SiteNavigation } from '@/components/siteNavigation/SiteNavigation';
import {
  Actions,
  CandleMark,
  ErrorCode,
  ErrorMessage,
  ErrorTitle,
  HomeLink,
  NotFoundContent,
  NotFoundPage,
} from './NotFound.styles';

export const NotFound: React.FC = () => {
  return (
    <NotFoundPage element="main" display="flex" flexDirection="column">
      <SiteNavigation />
      <NotFoundContent>
        <CandleMark aria-hidden="true" />
        <ErrorCode>404 · Page not found</ErrorCode>
        <ErrorTitle>This story ends before it begins.</ErrorTitle>
        <ErrorMessage>
          The page you followed has slipped into the quiet. Let&apos;s return to
          the light and find another story.
        </ErrorMessage>
        <Actions>
          <HomeLink to="/">
            <ArrowLeft aria-hidden="true" />
            Return home
          </HomeLink>
        </Actions>
      </NotFoundContent>
    </NotFoundPage>
  );
};
