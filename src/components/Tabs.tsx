import * as TabsPrimitive from '@radix-ui/react-tabs';
import { FC, ReactNode } from 'react';
import { styled } from 'src/utils/theme';
import { Scroller } from './Scroller';

const TabsRoot = styled(TabsPrimitive.Root, {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const List = styled(TabsPrimitive.List, {
  flexShrink: 0,
  display: 'flex',
  width: 'fit-content',
});

const Trigger = styled(TabsPrimitive.Trigger, {
  all: 'unset',
  fontFamily: 'inherit',
  padding: '$big',
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '$medium',
  whiteSpace: 'nowrap',
  lineHeight: 1,
  color: '$gray11',
  cursor: 'pointer',
  userSelect: 'none',
  '&:hover': { color: '$primaryLighter' },
  '&[data-state="active"]': {
    color: '$primary',
    boxShadow: 'inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor',
  },
});

const Content = TabsPrimitive.Content;

interface Tab {
  label: string;
  value: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  margin?: number | string;
  padding?: number | string;
}

export const Tabs: FC<TabsProps> = ({ tabs, defaultTab, margin = 0, padding = 0 }) => (
  <TabsRoot defaultValue={defaultTab}>
    <Scroller margin={margin}>
      <List css={{
        paddingX: padding,
      }}>
        {tabs.map(({ value, label }) => (
          <Trigger value={value} key={value}>
            {label}
          </Trigger>
        ))}
      </List>
    </Scroller>
    {tabs.map(({ value, content }) => (
      <Content key={value} value={value}>
        {content}
      </Content>
    ))}
  </TabsRoot>
)