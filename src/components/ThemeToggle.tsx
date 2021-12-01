import { MoonIcon, SunIcon } from "@modulz/radix-icons";
import { FC } from "react";
import { styled } from "src/utils/theme";
import { IconButton } from "./IconButton";

const ThemeToggleBase = styled('div', {
  all: 'unset',
  display: 'block',

  position: 'fixed',
  left: '$big',
  bottom: '$big',

  zIndex: 10,
});

interface ThemeToggleProps {
  state: 'default' | 'dark';
  onClick: () => void;
}

export const ThemeToggle: FC<ThemeToggleProps> = ({ state, onClick }) => (
  <ThemeToggleBase>
    <IconButton css={{
      backgroundColor: '$background',
      border: '1px $gray4 solid',
      padding: '$big',
    }} onClick={onClick}>
      {state === 'dark' ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  </ThemeToggleBase>
);
