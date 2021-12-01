import { styled } from "src/utils/theme";

export const IconButton = styled('button', {
  all: 'unset',

  display: 'block',
  padding: '$medium',
  borderRadius: '$small',
  cursor: 'pointer',

  transition: '$button',

  '&:focus': {
    boxShadow: '$focus',
  },

  '&:hover': {
    backgroundColor: '$gray4',
  },

  '&:active': {
    transform: 'scale(0.95)',
  },

  '& svg': {
    display: 'block',
  }
});
