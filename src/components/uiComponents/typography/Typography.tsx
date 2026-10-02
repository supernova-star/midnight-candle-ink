import React from 'react';
import type { TypographyProps as MuiTypographyProps } from '@mui/material';
import { Typography as MuiTypography } from '@mui/material';
import { colorPalette } from '@/theme/colors';
import type { Colors } from '@/theme/themeTypes';
import { forwardRef, type ReactNode } from 'react';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'legal'
  | 'button';

export type FontWeight = 'light' | 'regular' | 'semiBold' | 'bold';
export type TextStyle =
  'regular' | 'italic' | 'underline' | 'strikethrough' | 'uppercase';
export type TextAlign = 'left' | 'right' | 'center';

const fontWeightMap: Record<FontWeight, number> = {
  light: 300,
  regular: 400,
  semiBold: 600,
  bold: 700,
};

const textStyleMap: Record<TextStyle, React.CSSProperties> = {
  regular: {},
  italic: { fontStyle: 'italic' },
  underline: { textDecoration: 'underline' },
  strikethrough: { textDecoration: 'line-through' },
  uppercase: { textTransform: 'uppercase' },
};

const resolveColor = (color: Colors | string): string => {
  const paletteColor = colorPalette[color as Colors];

  return typeof paletteColor === 'string' ? paletteColor : color;
};

export interface TypographyProps extends Omit<MuiTypographyProps, 'variant'> {
  variant?: TypographyVariant;
  weight?: FontWeight;
  textStyle?: TextStyle;
  textAlign?: TextAlign;
  color?: Colors | string;
  children: ReactNode;
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant = 'body2',
      weight = 'regular',
      textStyle = 'regular',
      textAlign = 'left',
      color = 'text',
      children,
      sx = {},
      ...props
    },
    ref,
  ) => {
    const textColor = resolveColor(color);
    const muiVariant =
      variant === 'legal'
        ? 'caption'
        : (variant as Exclude<TypographyVariant, 'legal'>);
    const fontWeightValue = fontWeightMap[weight];
    const styleProps = textStyleMap[textStyle];
    const typographySx: MuiTypographyProps['sx'] = [
      {
        fontFamily: 'inherit',
        color: textColor,
        fontWeight: fontWeightValue,
        textAlign,
        ...(variant === 'legal' && { fontSize: '10px' }),
        ...styleProps,
      },
      ...(sx ? (Array.isArray(sx) ? sx : [sx]) : []),
    ];

    return (
      <MuiTypography
        ref={ref}
        variant={muiVariant}
        sx={typographySx}
        {...props}
      >
        {children}
      </MuiTypography>
    );
  },
);
