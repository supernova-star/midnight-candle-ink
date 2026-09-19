import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ErrorPage = styled.main`
  display: grid;
  min-width: 900px;
  min-height: 100vh;
  place-items: center;
  padding: 48px;
  background: ${({ theme }) => theme.colors.adminRadialBackground};
  color: ${({ theme }) => theme.colors.text};
`;

const ErrorContent = styled.section`
  width: 360px;

  h1 {
    margin: 0 0 12px;
    font-family: ${({ theme }) => theme.typography.displayFontFamily};
    font-size: 38px;
    font-weight: 400;
  }

  p {
    margin: 0 0 24px;
    color: ${({ theme }) => theme.colors.secondaryText};
  }

  a {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const AdminError: React.FC = () => (
  <ErrorPage>
    <ErrorContent>
      <h1>Something went wrong</h1>
      <p>Wrong password or something went wrong. Please try again.</p>
      <Link to="/adminsupa">Return to admin access</Link>
    </ErrorContent>
  </ErrorPage>
);
