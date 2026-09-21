import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { PenLine, Save, User, X } from 'lucide-react';
import React, { FC, useEffect, useState } from 'react';
import { UserForm } from './Profile.styles';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { Button } from '@/components/uiComponents/button/Button';
import theme from '@/theme/theme';
import { getUsername, updateUsername } from '@/utils/visitorTracking';
import { Banner, BannerItem } from '@/components/uiComponents/banner/Banner';

type UserNameSectionProps = {
  isMobile: boolean;
};

export const UserNameSection: FC<UserNameSectionProps> = ({ isMobile }) => {
  const [username, setUsername] = useState('');
  const [initialUsername, setInitialUsername] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [banner, setBanner] = useState<BannerItem>({
    open: false,
    message: '',
    severity: 'success',
  });

  const loadUsername = async (): Promise<void> => {
    const currentUsername = await getUsername();

    if (currentUsername) {
      setUsername(currentUsername);
      setInitialUsername(currentUsername);
    }
  };

  useEffect(() => {
    loadUsername();
  }, []);

  const handleStartEditing = (): void => {
    setInitialUsername(username);
    setIsEditing(true);
  };

  const handleCancel = (): void => {
    setUsername(initialUsername);
    setIsEditing(false);
  };

  const handleSave = async (): Promise<void> => {
    const trimmedUsername = username.trim();

    if (!trimmedUsername || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const success = await updateUsername(trimmedUsername);

    if (success) {
      setUsername(trimmedUsername);
      setInitialUsername(trimmedUsername);
      setIsEditing(false);
      setIsSubmitting(false);
      setBanner({
        open: true,
        message: 'Username updated successfully!',
        severity: 'success',
      });
      return;
    }

    setBanner({
      open: true,
      message: 'Failed to update username. Please try again.',
      severity: 'error',
    });
    setIsSubmitting(false);
  };

  const isDisabled =
    isSubmitting ||
    !username.trim() ||
    !isEditing ||
    username === initialUsername;

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
          <User size={24} color="var(--accent)" />
        </RowFlexContainer>

        <Typography
          variant={isMobile ? 'subtitle2' : 'subtitle1'}
          color="var(--text-primary)"
          weight="semiBold"
        >
          UserName
        </Typography>
      </RowFlexContainer>

      {!isEditing && (
        <RowFlexContainer
          alignItems="center"
          justify-content="between"
          position="relative"
          width="100%"
          height="48px"
          gap={[2]}
        >
          <Typography
            variant={isMobile ? 'subtitle1' : 'h6'}
            color="var(--text-primary)"
            weight="semiBold"
            sx={{
              marginTop: '4px',
              width: '100%',
            }}
          >
            {username}
          </Typography>

          <RowFlexContainer
            backgroundColor="var(--accent-selected)"
            padding={[2]}
            borderRadius={[1]}
            cursor="pointer"
            onClick={handleStartEditing}
          >
            <PenLine size={12} />
          </RowFlexContainer>
        </RowFlexContainer>
      )}

      {isEditing && (
        <UserForm
          onSubmit={(event) => {
            event.preventDefault();
            handleSave();
          }}
        >
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
            autoFocus
            autoComplete="username"
          />

          <RowFlexContainer
            cursor="pointer"
            onClick={handleCancel}
            style={{
              position: 'absolute',
              right: '5%',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <X />
          </RowFlexContainer>
        </UserForm>
      )}

      <Button
        text={isSubmitting ? 'Saving ...' : 'Save Changes'}
        size="small"
        disabled={isDisabled}
        iconOptions={{
          icon: Save,
          iconColor: isDisabled
            ? 'var(--button-disabled-text)'
            : 'var(--button-primary-text)',
        }}
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
        onClick={handleSave}
        sx={{
          alignSelf: 'flex-start',
          '&:hover': {
            backgroundColor: 'var(--button-hover-bg)',
          },
          '&:hover .MuiTypography-root': {
            color: 'var(--button-hover-text)',
          },
          '&:hover .MuiButton-startIcon svg': {
            color: 'var(--button-hover-text)',
          },
        }}
      />
    </ColumnFlexContainer>
  );
};
