import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { FC } from 'react';
import { ActionButton } from './Reader.styles';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { useResponsive } from '@/hooks/useResponsive';

type ActionButtonContainerProps = {
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
  previousChapterName: string;
  nextChapterName: string;
  onPreviousClick: () => void;
  onNextClick: () => void;
};

export const ActionButtonContainer: FC<ActionButtonContainerProps> = ({
  isPreviousDisabled,
  isNextDisabled,
  previousChapterName,
  nextChapterName,
  onPreviousClick,
  onNextClick,
}) => {
  const isMobile = useResponsive();
  return (
    <RowFlexContainer padding={[2, 3, 0]} gap={[5]}>
      <ActionButton
        flex={1}
        justifyContent="center"
        borderRadius={[1]}
        alignItems="center"
        padding={[1, 2]}
        gap={[4]}
        isDisabled={isPreviousDisabled}
        onClick={onPreviousClick}
      >
        <ArrowLeft
          size={20}
          color={
            isPreviousDisabled
              ? 'var(--button-disabled-bg)'
              : 'var(--button-primary-bg)'
          }
        />
        <ColumnFlexContainer>
          <Typography variant="legal" weight="semiBold">
            PREVIOUS
          </Typography>
          {!isMobile && (
            <Typography variant="body2" weight="semiBold">
              {previousChapterName}
            </Typography>
          )}
        </ColumnFlexContainer>
      </ActionButton>
      <ActionButton
        flex={1}
        borderRadius={[1]}
        justifyContent="center"
        alignItems="center"
        padding={[1, 2]}
        gap={[4]}
        isDisabled={isNextDisabled}
        onClick={onNextClick}
      >
        <ColumnFlexContainer>
          <Typography variant="legal" weight="semiBold">
            NEXT
          </Typography>
          {!isMobile && (
            <Typography variant="body2" weight="semiBold">
              {nextChapterName}
            </Typography>
          )}
        </ColumnFlexContainer>
        <ArrowRight
          size={20}
          color={
            isNextDisabled
              ? 'var(--button-disabled-bg)'
              : 'var(--button-primary-bg)'
          }
        />
      </ActionButton>
    </RowFlexContainer>
  );
};
