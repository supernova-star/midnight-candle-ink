import React from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  type SelectChangeEvent,
} from '@mui/material';
import type { Spacing } from '@/theme/themeTypes';
import { getSpacing } from '@/theme/spacing';
import theme from '@/theme/theme';
import {
  Typography,
  type FontWeight,
  type TextStyle,
  type TypographyVariant,
} from '@/components/uiComponents/typography/Typography';
import type { Colors } from '@/theme/themeTypes';

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownTextOptions {
  textColor?: Colors | string;
  textStyle?: TextStyle;
  textWeight?: FontWeight;
  textVariant?: TypographyVariant;
}

export interface DropdownColorOptions {
  surface?: string;
  text?: string;
  border?: string;
  accent?: string;
  disabledText?: string;
  hover?: string;
  selected?: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  size?: 'small' | 'medium';
  borderRadius?: Spacing;
  width?: string | number;
  disabled?: boolean;
  textOptions?: DropdownTextOptions;
  hasBorder?: boolean;
  padding?: Spacing;
  ariaLabel?: string;
  colors?: DropdownColorOptions;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  size = 'small',
  borderRadius = [2],
  width = 'fit-content',
  disabled = false,
  textOptions,
  hasBorder = true,
  padding,
  ariaLabel,
  colors,
}) => {
  const textColor = textOptions?.textColor ?? 'surface';
  const textWeight = textOptions?.textWeight ?? 'regular';
  const textVariant = textOptions?.textVariant ?? 'body2';
  const textStyle = textOptions?.textStyle ?? 'regular';
  const radius = getSpacing(borderRadius, theme.spacing);
  const surfaceColor = colors?.surface ?? 'var(--surface)';
  const controlTextColor = colors?.text ?? 'var(--text-primary)';
  const borderColor = colors?.border ?? 'var(--border)';
  const accentColor = colors?.accent ?? 'var(--accent)';
  const disabledTextColor = colors?.disabledText ?? 'var(--text-disabled)';
  const hoverColor =
    colors?.hover ?? 'color-mix(in srgb, var(--accent) 10%, transparent)';
  const selectedColor =
    colors?.selected ?? 'color-mix(in srgb, var(--accent) 18%, transparent)';

  const handleChange = (e: SelectChangeEvent) => onChange(e.target.value);

  return (
    <FormControl size={size} disabled={disabled} sx={{ width }}>
      <Select
        value={value}
        onChange={handleChange}
        inputProps={{ 'aria-label': ariaLabel }}
        sx={{
          borderRadius: radius,
          color: controlTextColor,
          backgroundColor: surfaceColor,
          ...(padding && {
            '& .MuiSelect-select': {
              padding: getSpacing(padding, theme.spacing),
            },
          }),
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: hasBorder ? borderColor : 'transparent',
            borderRadius: radius,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: hasBorder ? accentColor : 'transparent',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: hasBorder ? accentColor : 'transparent',
          },
          '& .MuiSelect-icon': {
            color: accentColor,
          },
          '&.Mui-disabled': {
            opacity: 0.5,
            '& .MuiSelect-select': {
              WebkitTextFillColor: disabledTextColor,
            },
            '& .MuiSelect-icon': { color: disabledTextColor },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor,
            },
          },
        }}
        MenuProps={{
          slotProps: {
            paper: {
              sx: {
                backgroundColor: surfaceColor,
                borderRadius: radius,
                border: hasBorder ? `1px solid ${borderColor}` : 'none',
                '& .MuiMenuItem-root': {
                  color: controlTextColor,
                  '&:hover': {
                    backgroundColor: hoverColor,
                  },
                  '&.Mui-selected': {
                    backgroundColor: `${selectedColor} !important`,
                  },
                },
              },
            },
          },
        }}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            <Typography
              variant={textVariant}
              weight={textWeight}
              textStyle={textStyle}
              color={textColor}
            >
              {opt.label}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
