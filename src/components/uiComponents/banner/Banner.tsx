import React, { useEffect } from 'react';
import { Alert } from '@mui/material';

type BannerSeverity = 'success' | 'error';

export type BannerItem = {
  open: boolean;
  message: string;
  severity: BannerSeverity;
};

interface BannerProps {
  open: boolean;
  message: string;
  severity: BannerSeverity;
  onClose: () => void;
  autoDismiss?: boolean;
  dismissTime?: number;
}

export const Banner = ({
  open,
  message,
  severity,
  onClose,
  autoDismiss = true,
  dismissTime = 1000,
}: BannerProps) => {
  useEffect(() => {
    if (!open || !autoDismiss) {
      return;
    }

    const timeout = window.setTimeout(() => {
      onClose();
    }, dismissTime);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [open, autoDismiss, dismissTime, onClose]);

  if (!open) {
    return null;
  }

  const feedbackType = severity === 'success' ? 'success' : 'error';

  const feedbackColors = {
    background: `var(--feedback-${feedbackType}-background)`,
    border: `var(--feedback-${feedbackType}-border)`,
    text: `var(--feedback-${feedbackType}-text)`,
    icon: `var(--feedback-${feedbackType}-icon)`,
  };

  return (
    <Alert
      severity={severity}
      onClose={onClose}
      sx={{
        position: 'fixed',
        top: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(720px, calc(100% - 48px))',
        zIndex: 9999,

        backgroundColor: feedbackColors.background,
        color: feedbackColors.text,
        border: `1px solid ${feedbackColors.border}`,

        '& .MuiAlert-icon': {
          color: feedbackColors.icon,
        },

        '& .MuiAlert-action': {
          color: feedbackColors.text,
        },
      }}
    >
      {message}
    </Alert>
  );
};
