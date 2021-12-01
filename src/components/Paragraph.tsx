import { styled } from "src/utils/theme";

export const Paragraph = styled('p', {
  all: 'unset',
  display: 'block',

  color: '$gray11',

  variants: {
    size: {
      medium: {
        fontSize: '$medium',
      }
    }
  },
  defaultVariants: {
    size: 'medium',
  },
});
