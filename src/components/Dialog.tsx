import React, { FC } from 'react';
import { keyframes } from '@stitches/react';
import { styled } from 'src/utils/theme';
import * as DialogPrimitive from '@radix-ui/react-dialog';

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'scale(.96)' },
  '100%': { opacity: 1, transform: 'scale(1)' },
});

const StyledOverlay = styled('div', {
  backgroundColor: '$backdrop',
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const Wrapper = styled(DialogPrimitive.Content, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '$medium',
  position: 'fixed',
  height: '100%',
  width: '100%',
  top: 0,
  left: 0,

  '@bp2': {
    alignItems: 'flex-end',
    padding: 0,
  },
});

const StyledContent = styled('div', {
  position: 'relative',
  zIndex: 1,
  backgroundColor: '$background',
  borderRadius: '$medium',
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  maxWidth: '400px',
  width: '100%',
  padding: '$huge',
  border: '1px transparent solid',
  borderColor: '$gray4',
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&:focus': { outline: 'none' },

  '@bp2': {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomWidth: 0,
  }
});

interface DialogContentProps extends DialogPrimitive.DialogContentProps {
  onBackdropClick?: () => void;
}

const Content: FC<DialogContentProps> = ({ children, onBackdropClick, ...props }) => (
  <Wrapper {...props}>
      <StyledOverlay onClick={onBackdropClick} />
      <StyledContent>
        {children}
      </StyledContent>
  </Wrapper>
)

const StyledTitle = styled(DialogPrimitive.Title, {
  margin: 0,
  fontWeight: 500,
  color: '$gray12',
  fontSize: '$big',
});

const StyledClose = styled(DialogPrimitive.Close, {
  '&[class]': {
    position: 'absolute',
    top: '$big',
    right: '$big',
  }
})

// Exports
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = Content;
export const DialogTitle = StyledTitle;
export const DialogClose = StyledClose;

export default Dialog;