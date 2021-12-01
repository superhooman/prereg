import {
  gray,
  blue,
  red,
  green,
  grayDark,
  blueDark,
  redDark,
  greenDark,
} from '@radix-ui/colors';
import { createStitches, createTheme } from '@stitches/react';

export const { styled, getCssText } = createStitches({
  media: {
    bp1: '(max-width: 640px)',
    bp2: '(max-width: 768px)',
    bp3: '(max-width: 1024px)',
  },
  utils: {
    paddingX: (value: string | number) => ({
      paddingLeft: value,
      paddingRight: value
    }),
    paddingY: (value: string | number) => ({
      paddingTop: value,
      paddingBottom: value
    }),
    marginX: (value: string | number) => ({
      marginLeft: value,
      marginRight: value
    }),
    marginY: (value: string | number) => ({
      marginTop: value,
      marginBottom: value
    }),
  },
  theme: {
    colors: {
      ...gray,
      ...blue,
      ...red,
      ...green,
      primary: '$blue10',
      primaryLighter: '$blue9',
      primaryDarker: '$blue11',
      primaryText: '#ffffff',
      background: '#fff',
      backgroundTransparent: 'rgba(255,255,255,0)',
      backdrop: 'rgba(0,0,0,.28)',
      text: '#222',
    },
    fontSizes: {
      superSmall: '12px',
      small: '14px',
      medium: '15px',
      big: '20px',
      bigger: '24px',
      huge: '32px',
    },
    lineHeights: {
      superSmall: '12px',
      small: '16px',
      medium: '20px',
      big: '24px',
      bigger: '28px',
      huge: '36px',
    },
    radii: {
      small: '5px',
      medium: '9px',
      big: '13px',
    },
    space: {
      small: '4px',
      medium: '8px',
      big: '12px',
      bigger: '16px',
      huge: '24px',
    },
    transitions: {
      'opacity': 'opacity .2s ease-in-out',
      'color': 'color .2s ease-in-out, background-color .2s ease-in-out, border-color .2s ease-in-out',
      'button': 'transform .2s ease-in-out, background-color .2s ease-in-out',
    },
    borderWidths: {
      medium: '1px',
    },
    shadows: {
      focus: '0px 0px 0px 2px rgba(0,0,0,.24)'
    }
  },
});

export const darkTheme = createTheme({
  colors: {
    ...grayDark,
    ...blueDark,
    ...redDark,
    ...greenDark,
    background: '#000',
    backgroundTransparent: 'rgba(0,0,0,0)',
    backdrop: 'rgba(0,0,0,.48)',
    text: '#fff',
  },
  shadows: {
    focus: '0px 0px 0px 2px rgba(255,255,255,.24)'
  }
});
