import React, { FC, useEffect, useState } from 'react';
import { Modal } from '../uiComponents/modal/Modal';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '../uiComponents/container/Container';
import { Typography } from '../uiComponents/typography/Typography';
import { UserForm } from '@/pages/Profile/Profile.styles';
import { Button } from '../uiComponents/button/Button';

type FeedbackModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  titleType: string;
  isSubmitting: boolean;
  handleSubmit: (feedback: string) => void;
};

export const FeedbackModal: FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  title,
  titleType,
  isSubmitting,
  handleSubmit,
}) => {
  const [feedback, setFeedback] = useState('');
  const isDisabled = isSubmitting || !feedback.trim();

  const handleOnClose = () => {
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setFeedback('');
    }
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onClose={handleOnClose}
      aria-labelledby="user-details-title"
      aria-describedby="user-details-description"
      fullScreenOnMobile={false}
      contentStyle={{
        width: 'min(520px, calc(100vw - 32px))',
      }}
    >
      <ColumnFlexContainer
        backgroundColor="var(--surface)"
        padding={[5]}
        borderRadius={[2]}
        sx={{
          border: '2px solid var(--border)',
        }}
      >
        <Typography
          color="var(--text-primary)"
          weight="semiBold"
          variant="body1"
        >
          Share your feedback
        </Typography>
        <ColumnFlexContainer padding={[2, 0, 3]}>
          <Typography
            color="var(--text-secondary)"
            weight="regular"
            variant="caption"
          >
            ABOUT
          </Typography>
          <Typography
            color="var(--text-primary)"
            weight="semiBold"
            variant="h6"
          >
            {title}
          </Typography>
        </ColumnFlexContainer>

        <ColumnFlexContainer padding={[2, 0, 3]}>
          <Typography
            color="var(--text-secondary)"
            weight="regular"
            variant="caption"
          >
            WHAT YOU YOU THINK ABOUT THIS {titleType}
          </Typography>
          <UserForm
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(`${title}: ${feedback}`);
            }}
          >
            <textarea
              placeholder="Tell us what you liked, what could be better or any ideas you have..."
              rows={6}
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
              disabled={isSubmitting}
            />
          </UserForm>
        </ColumnFlexContainer>

        <RowFlexContainer gap={[4]} padding={[2, 0, 0]}>
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
            onClick={handleOnClose}
            sx={{
              alignSelf: 'flex-start',
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
            onClick={() => {
              handleSubmit(`${title}: ${feedback}`);
            }}
            sx={{
              alignSelf: 'flex-start',
              '&:hover': { backgroundColor: 'var(--button-hover-bg)' },
              '&:hover .MuiTypography-root': {
                color: 'var(--button-hover-text)',
              },
            }}
          />
        </RowFlexContainer>
      </ColumnFlexContainer>
    </Modal>
  );
};
