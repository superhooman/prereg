import { keyframes } from "@stitches/react";
import { styled } from "src/utils/theme";

const loading = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(359deg)' },
});

export const Loading = styled('div', {
  animation: `${loading} 1s infinite linear`,
});
