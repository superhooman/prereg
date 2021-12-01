import { FC, ReactNode } from "react";
import { styled } from "src/utils/theme";

export interface PlaceholderProps {
  text: string;
  icon: ReactNode;
}

const Empty = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  paddingX: '$medium',
  paddingY: 96,
  fontSize: '$small',
  gap: '$medium',
  color: '$gray11',

  '& > svg': {
    height: 24,
    width: 24,
  }
});

export const Placeholder: FC<PlaceholderProps> = ({ icon, text }) => (
  <Empty>
    {icon}
    <span>{text}</span>
  </Empty>
);
