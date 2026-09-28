import { useState } from 'react';
import { BannerItem } from '@/components/uiComponents/banner/Banner';
import { submitFeedback } from '@/utils/visitorTracking';

export const useFeedback = () => {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [banner, setBanner] = useState<BannerItem>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleModalDetails = (selectedTitle: string) => {
    setTitle(selectedTitle);
    setIsFeedbackModalOpen(true);
  };

  const handleSubmitFeedback = async (feedback: string): Promise<void> => {
    const trimmedFeedback = feedback.trim();

    if (!trimmedFeedback || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const response = await submitFeedback(trimmedFeedback);

    if (response) {
      setIsFeedbackModalOpen(false);
      setIsSubmitting(false);

      setBanner({
        open: true,
        message: 'Thank you for sharing your thoughts! It really means a lot!',
        severity: 'success',
      });

      return;
    }

    setIsFeedbackModalOpen(false);

    setBanner({
      open: true,
      message: 'Failed to submit feedback. Please try again.',
      severity: 'error',
    });

    setIsSubmitting(false);
  };

  return {
    isFeedbackModalOpen,
    setIsFeedbackModalOpen,
    title,
    isSubmitting,
    banner,
    setBanner,
    handleModalDetails,
    handleSubmitFeedback,
  };
};
