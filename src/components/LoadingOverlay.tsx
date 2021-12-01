import * as ProgressPrimitive from '@radix-ui/react-progress';
import { FC } from 'react';
import { styled } from "src/utils/theme";

const Progress = styled(ProgressPrimitive.Root, {
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: '$gray3',
  borderRadius: '$medium',
  width: 240,
  height: 6,
  border: '1px transparent solid',
  borderColor: '$gray3'
});

const ProgressIndicator = styled(ProgressPrimitive.Indicator, {
  backgroundColor: '$primary',
  height: '100%',
  transition: 'width 200ms cubic-bezier(0.65, 0, 0.35, 1)',
});

const ProgressText = styled('div', {
  fontSize: '$medium',
  textAlign: 'center',
})

const OverlayBase = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  backgroundColor: '$backdrop',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 100,

  transition: '$opacity',

  variants: {
    active: {
      'yes': {
        opacity: 1,
        pointerEvents: 'all',
      },
      'no': {
        opacity: 0,
        pointerEvents: 'none',
      }
    }
  }
});

const OverlayCard = styled('div', {
  padding: '$huge',
  borderRadius: '$medium',
  backgroundColor: '$background',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$big',
  border: '1px transparent solid',
  borderColor: '$gray3'
});

interface OverlayProps {
  text: string;
  value: number;
  active: boolean;
}

export const LoadingOverlay: FC<OverlayProps> = ({ text, value, active }) => (
  <OverlayBase active={active ? 'yes' : 'no'}>
    <OverlayCard>
    <ProgressText>{text}</ProgressText>
    <Progress max={100} value={value * 100}>
      <ProgressIndicator style={{ width: `${value * 100}%` }} />
    </Progress>
    </OverlayCard>
  </OverlayBase>
);
