import React from 'react';
import {
  ColumnFlexContainer,
  Container,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import styled, { keyframes } from 'styled-components';
import { BookOpen, Feather, Loader2, Sparkles } from 'lucide-react';

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(-4deg); opacity: 0.55; }
  50% { transform: translateY(-8px) rotate(4deg); opacity: 1; }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Mark = styled.div`
  isolation: isolate;
  position: relative;
  display: grid;
  place-items: center;
  width: 88px;
  height: 88px;
  margin-bottom: 28px;
  border: 1px solid ${({ theme }) => theme.colors.adminBorder};
  border-radius: ${({ theme }) => theme.radii.lg};
  color: ${({ theme }) => theme.colors.adminBrown};
  background: ${({ theme }) => theme.colors.adminSurface};
  box-shadow:
    0 0 0 12px rgba(215, 166, 56, 0.08),
    0 16px 42px rgba(86, 59, 39, 0.12);
  animation: ${float} 3.2s ease-in-out infinite;

  &::after {
    content: '';
    position: absolute;
    inset: -7px;
    border: 1px solid ${({ theme }) => theme.colors.adminBorder};
    border-radius: ${({ theme }) => theme.radii.lg};
  }
`;

const StoryDetail = styled.div<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: ${({ theme }) => theme.spacing(-5)};
  ${({ $position }) => $position}: ${({ theme }) => theme.spacing(-8)};
  color: ${({ theme }) => theme.colors.adminYellow};
  animation: ${float} 2.6s ease-in-out infinite;
`;

const Progress = styled.div`
  width: 42%;
  height: 100%;
  border-radius: inherit;
  background: ${({ theme }) => theme.colors.adminYellow};
  animation: ${float} 1.8s ease-in-out infinite;
`;

const Spinner = styled(Loader2)`
  position: absolute;
  right: -4px;
  bottom: -3px;
  padding: 4px;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.adminSurface};
  background: ${({ theme }) => theme.colors.adminBrown};
  animation: ${spin} 1.1s linear infinite;
`;

export const AuthenticationLoading = () => {
  return (
    <ColumnFlexContainer minHeight="100dvh" aria-busy="true" aria-live="polite">
      <Container
        width="100%"
        minHeight="100dvh"
        display="grid"
        flex={1}
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        padding={[8, 5]}
        backgroundColor="adminBackground"
        sx={{
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'linear-gradient(rgba(255,255,255,0.34), rgba(255,255,255,0)), repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(133,111,96,0.06) 32px)',
          },
        }}
      >
        <ColumnFlexContainer
          width="min(100%, 440px)"
          alignItems="center"
          textAlign="center"
        >
          <Mark aria-hidden="true">
            <StoryDetail $position="left">
              <Feather size={18} strokeWidth={1.7} />
            </StoryDetail>
            <BookOpen size={38} strokeWidth={1.5} />
            <StoryDetail $position="right">
              <Sparkles size={17} strokeWidth={1.7} />
            </StoryDetail>
            <Spinner size={24} strokeWidth={2} />
          </Mark>
          <Typography
            variant="h4"
            weight="semiBold"
            color="adminDarkBrown"
            textAlign="center"
            sx={{ margin: 0 }}
          >
            Authenticating
          </Typography>
          <Typography
            variant="body2"
            color="secondaryText"
            textAlign="center"
            sx={{ maxWidth: 360, margin: '10px 0 28px', lineHeight: 1.6 }}
          >
            Checking your access.
          </Typography>
          <Container
            width="min(100%, 260px)"
            height="3px"
            overflow="hidden"
            sx={{ background: 'rgba(216, 207, 191, 0.18)', borderRadius: 999 }}
            aria-hidden="true"
          >
            <Progress />
          </Container>
        </ColumnFlexContainer>
      </Container>
    </ColumnFlexContainer>
  );
};
