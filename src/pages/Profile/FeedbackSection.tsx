import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { Quote } from 'lucide-react';
import React, { FC, useState } from 'react';
import { UserForm } from './Profile.styles';
import theme from '@/theme/theme';
import { Button } from '@/components/uiComponents/button/Button';
import { Banner, BannerItem } from '@/components/uiComponents/banner/Banner';
import { submitFeedback } from '@/utils/visitorTracking';

type FeedbackSectionProps = {
  isMobile: boolean;
};

export const FeedbackSection: FC<FeedbackSectionProps> = ({ isMobile }) => {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [banner, setBanner] = useState<BannerItem>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleCancel = (): void => {
    setFeedback('');
  };

  const handleSubmit = async (): Promise<void> => {
    const trimmedFeedback = feedback.trim();

    if (!trimmedFeedback || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const success = await submitFeedback(trimmedFeedback);

    if (success) {
      setFeedback('');
      setIsSubmitting(false);

      setBanner({
        open: true,
        message: 'Thank you for sharing your thoughts!',
        severity: 'success',
      });

      return;
    }

    setBanner({
      open: true,
      message: 'Failed to submit feedback. Please try again.',
      severity: 'error',
    });

    setIsSubmitting(false);
  };

  const isDisabled = isSubmitting || !feedback.trim();

  return (
    <ColumnFlexContainer
      backgroundColor="var(--surface)"
      padding={[4]}
      gap={[3]}
      borderRadius={[2]}
      margin={[4, 0, 0]}
      sx={{
        boxShadow: theme.shadows.md,
      }}
    >
      <Banner
        open={banner.open}
        message={banner.message}
        severity={banner.severity}
        onClose={() =>
          setBanner((previous) => ({
            ...previous,
            open: false,
          }))
        }
      />
      <RowFlexContainer gap={[2]} alignItems="center">
        <RowFlexContainer
          padding={[2]}
          borderRadius={[20]}
          backgroundColor="var(--accent-selected)"
        >
          <Quote size={24} color="var(--accent)" />
        </RowFlexContainer>
        <Typography
          variant={isMobile ? 'subtitle2' : 'subtitle1'}
          color="var(--text-primary)"
          weight="semiBold"
          sx={{ marginTop: '4px' }}
        >
          Share your thoughts.
        </Typography>
      </RowFlexContainer>

      <UserForm
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <textarea
          placeholder="Share your thoughts here..."
          rows={isMobile ? 10 : 4}
          value={feedback}
          onChange={(event) => setFeedback(event.target.value)}
          disabled={isSubmitting}
        />
      </UserForm>
      <RowFlexContainer gap={[4]}>
        <Button
          text="Cancel"
          variant="outlined"
          size="small"
          disabled={isSubmitting}
          textOptions={{
            textColor: 'var(--button-primary-bg)',
            textVariant: 'button',
            textWeight: 'semiBold',
          }}
          buttonStyles={{
            bgColor: 'var(--button-primary-bg)',
            borderRadius: [1],
            width: 'fullWidth',
          }}
          onClick={handleCancel}
          sx={{
            alignSelf: 'flex-start',
            margin: '0 0 16px 0',
            '&:hover': { backgroundColor: 'var(--button-hover-bg)' },
            '&:hover .MuiTypography-root': {
              color: 'var(--button-hover-text)',
            },
          }}
        />
        <Button
          text={isSubmitting ? 'Submitting ...' : 'Submit'}
          size="small"
          disabled={isDisabled}
          textOptions={{
            textColor: isDisabled
              ? 'var(--button-disabled-text)'
              : 'var(--button-primary-text)',
            textVariant: 'button',
            textWeight: 'semiBold',
          }}
          buttonStyles={{
            bgColor: isDisabled
              ? 'var(--button-disabled-bg)'
              : 'var(--button-primary-bg)',
            borderRadius: [1],
            width: 'fullWidth',
          }}
          onClick={handleSubmit}
          sx={{
            alignSelf: 'flex-start',
            margin: '0 0 16px 0',
            '&:hover': { backgroundColor: 'var(--button-hover-bg)' },
            '&:hover .MuiTypography-root': {
              color: 'var(--button-hover-text)',
            },
          }}
        />
      </RowFlexContainer>
    </ColumnFlexContainer>
  );
};
