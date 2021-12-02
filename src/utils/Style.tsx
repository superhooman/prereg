import type { FC, StyleHTMLAttributes } from "react";

interface StyleProps extends StyleHTMLAttributes<HTMLStyleElement> {
  text: string;
}

export const Style: FC<StyleProps> = ({ text }) => (
  <style dangerouslySetInnerHTML={{ __html: text }} />
);
