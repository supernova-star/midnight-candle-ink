import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '../button/Button';
import { tabButtonSx } from './TabButton.styles';

type TabButtonProps = {
  text: string;
  icon: LucideIcon;
  active: boolean;
  onClick: () => void;
};

export const TabButton = ({ text, icon, active, onClick }: TabButtonProps) => {
  const textColor = active ? 'adminSurface' : 'adminDarkBrown';

  return (
    <Button
      text={text}
      size="small"
      iconOptions={{ icon, iconColor: textColor }}
      textOptions={{ textColor, textWeight: 'bold', textVariant: 'caption' }}
      buttonStyles={{ borderRadius: [2], bgColor: 'adminDarkBrown' }}
      fullWidth
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      variant={active ? 'contained' : 'outlined'}
      sx={tabButtonSx(active)}
    />
  );
};
