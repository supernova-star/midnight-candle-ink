import React, { FormEvent, useState } from 'react';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginPage = styled.main`
  display: grid;
  min-width: 900px;
  min-height: 100vh;
  place-items: center;
  padding: 48px;
  background: ${({ theme }) => theme.colors.adminRadialBackground};
  color: ${({ theme }) => theme.colors.text};
`;

const LoginForm = styled.form`
  display: flex;
  width: 360px;
  flex-direction: column;
  gap: 18px;

  svg {
    margin-bottom: 4px;
    color: ${({ theme }) => theme.colors.accent};
  }

  h1 {
    margin: 0;
    font-family: ${({ theme }) => theme.typography.displayFontFamily};
    font-size: 38px;
    font-weight: 400;
    letter-spacing: 0;
  }

  label {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.secondaryText};
  }

  input {
    width: 100%;
    height: 48px;
    margin-top: 7px;
    padding: 0 14px;
    border: 1px solid ${({ theme }) => theme.colors.adminBorder};
    border-radius: ${({ theme }) => theme.radii.sm};
    background: rgba(255, 255, 255, 0.08);
    color: ${({ theme }) => theme.colors.text};
    outline: none;

    &:focus {
      border-color: ${({ theme }) => theme.colors.accent};
    }
  }

  button {
    height: 48px;
    border: 1px solid ${({ theme }) => theme.colors.actionBorderDark};
    border-radius: ${({ theme }) => theme.radii.sm};
    background: ${({ theme }) => theme.colors.actionDark};
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;

    &:disabled {
      cursor: wait;
      opacity: 0.65;
    }
  }

  p {
    min-height: 20px;
    margin: 0;
    color: ${({ theme }) => theme.colors.secondaryText};
    font-size: 14px;
  }
`;

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        throw new Error('Unable to sign in with that password.');
      }

      navigate('/admin', { replace: true });
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Unable to sign in.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LoginPage>
      <LoginForm onSubmit={handleSubmit}>
        <Lock size={30} strokeWidth={1.5} aria-hidden="true" />
        <h1>Admin access</h1>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
            autoFocus
          />
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>
        <p role="alert">{error}</p>
      </LoginForm>
    </LoginPage>
  );
};
