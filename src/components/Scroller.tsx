import { FC, PropsWithChildren } from "react";
import { styled } from "src/utils/theme";

const ScrollerBase = styled('div', {
  display: 'block',
  position: 'relative',

  '& > div': {
    overflowY: 'auto',
    scrollBehavior: 'smooth',
  },

  '&:before, &:after': {
    content: '',
    display: 'block',
    position: 'absolute',
    height: '100%',
    width: 8,
    top: 0,
  },

  '&:before': {
    background: 'linear-gradient(to left, $backgroundTransparent, $background)',
    left: 0,
  },

  '&:after': {
    background: 'linear-gradient(to right, $backgroundTransparent, $background)',
    right: 0,
  }
});

interface ScrollerProps {
  margin?: string | number;
}

export const Scroller: FC<PropsWithChildren<ScrollerProps>> = ({ margin, children }) => (
  <ScrollerBase css={{
    marginX: margin,
  }}>
    <div>
      {children}
    </div>
  </ScrollerBase>
);
