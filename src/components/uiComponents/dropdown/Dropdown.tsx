import React from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  type SelectChangeEvent,
} from '@mui/material';
import { colorPalette } from '@/theme/colors';
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
}) => {
  const textColor = textOptions?.textColor ?? 'surface';
  const textWeight = textOptions?.textWeight ?? 'regular';
  const textVariant = textOptions?.textVariant ?? 'body2';
  const textStyle = textOptions?.textStyle ?? 'regular';
  const radius = getSpacing(borderRadius, theme.spacing);

  const handleChange = (e: SelectChangeEvent) => onChange(e.target.value);

  return (
    <FormControl size={size} disabled={disabled} sx={{ width }}>
      <Select
        value={value}
        onChange={handleChange}
        sx={{
          borderRadius: radius,
          color: 'var(--text-primary)',
          backgroundColor: 'var(--surface)',
          ...(padding && {
            '& .MuiSelect-select': {
              padding: getSpacing(padding, theme.spacing),
            },
          }),
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: hasBorder ? 'var(--border)' : 'transparent',
            borderRadius: radius,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: hasBorder ? 'var(--accent)' : 'transparent',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: hasBorder ? 'var(--accent)' : 'transparent',
          },
          '& .MuiSelect-icon': {
            color: 'var(--accent)',
          },
          '&.Mui-disabled': {
            opacity: 0.5,
            '& .MuiSelect-select': {
              WebkitTextFillColor: 'var(--text-disabled)',
            },
            '& .MuiSelect-icon': { color: 'var(--text-disabled)' },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: colorPalette.border,
            },
          },
        }}
        MenuProps={{
          slotProps: {
            paper: {
              sx: {
                backgroundColor: 'var(--surface)',
                borderRadius: radius,
                border: hasBorder ? `1px solid var(--border)` : 'none',
                '& .MuiMenuItem-root': {
                  color: 'var(--text-primary)',
                  '&:hover': {
                    backgroundColor:
                      'color-mix(in srgb, var(--accent) 10%, transparent)',
                  },
                  '&.Mui-selected': {
                    backgroundColor:
                      'color-mix(in srgb, var(--accent) 18%, transparent)',
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
