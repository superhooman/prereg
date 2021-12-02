import { ButtonHTMLAttributes, FC, forwardRef, HTMLAttributes, PropsWithChildren, Ref } from 'react';
import type { Course as CourseType } from 'src/types';
import { styled } from 'src/utils/theme';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { CSS, keyframes } from '@stitches/react';
import { ChevronDownIcon } from '@modulz/radix-icons';

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-accordion-content-height)' },
});

const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0 },
});

const AccordionRoot = AccordionPrimitive.Root;

const AccordionItem = styled(AccordionPrimitive.Item, {
  marginBottom: '$medium',
})

const StyledHeader = styled(AccordionPrimitive.Header, {
  all: 'unset',
  display: 'block',
});

const StyledTrigger = styled(AccordionPrimitive.Trigger, {
  all: 'unset',
  display: 'flex',
  gap: '$small',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',

  fontSize: '$small',
  fontWeight: 'normal',
  color: '$primary',

  '&[data-state="open"]': {
    color: '$gray10',
  }
});

const StyledContent = styled(AccordionPrimitive.Content, {
  overflow: 'hidden',

  '&[data-state="open"]': {
    animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
});

const Chevron = styled(ChevronDownIcon, {
  transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
  '[data-state=open] &': { transform: 'rotate(180deg)' },
});

const AccordionTrigger = forwardRef(({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>, forwardedRef: Ref<HTMLButtonElement>) => (
  <StyledHeader>
    <StyledTrigger {...props} ref={forwardedRef}>
      {children}
      <Chevron aria-hidden />
    </StyledTrigger>
  </StyledHeader>
));

const AccordionContent = forwardRef(({ children, ...props }: HTMLAttributes<HTMLDivElement>, forwardedRef: Ref<HTMLDivElement>) => (
  <StyledContent {...props} ref={forwardedRef}>
    {children}
  </StyledContent>
));

interface CourseProps {
  course: CourseType;
}

const Card = styled('div', {
  border: '1px transparent solid',
  borderColor: '$gray4',
  borderRadius: '$medium',
  overflow: 'hidden',

  '& .Course-Content': {
    padding: '$huge',
  },

  '& .Course-Content h2': {
    all: 'unset',
    display: 'block',
    fontWeight: 600,
    fontSize: '$big',
    marginBottom: '$medium',
  },

  '& .Course-Content h5': {
    all: 'unset',
    display: 'block',
    fontWeight: 400,
    fontSize: '$small',
    textTransform: 'uppercase',
    color: '$gray10',
    marginBottom: '$medium',
  },

  '& .Course-Content p': {
    all: 'unset',
    display: 'block',
    fontWeight: 400,
    fontSize: '$medium',
    maxWidth: 600,
    paddingTop: '$medium',
  },
});

const CardFooter = styled('div', {
  paddingX: '$huge',
  paddingY: '$big',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderTop: '1px transparent solid',
  borderColor: '$gray4',
  backgroundColor: '$gray2',

  '& > i': {
    all: 'unset',

    fontSize: '$small',
  },
})

const Items = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '$big',
  marginTop: '$medium',

  '@bp2': {
    gridTemplateColumns: '1fr',
  },
});

const ItemBase = styled('div', {
  '& label': {
    display: 'block',
    fontSize: '$superSmall',
    textTransform: 'uppercase',
    fontWeight: 600,
    marginBottom: '$small',
    color: '$gray11',
  },

  '& span': {
    display: 'block',
    fontSize: '$small',
  }
});

interface ItemProps {
  label: string;
  value: string;
  css?: CSS;
}

export const Item: FC<ItemProps> = ({ label, value, css }) => (
  <ItemBase css={css}>
    <label>{label}</label>
    <span>{value}</span>
  </ItemBase>
)

export const Course: FC<PropsWithChildren<CourseProps>> = ({ course, children }) => (
  <Card>
    <div className='Course-Content'>
      <h2>{course.ABBR}</h2>
      <h5>{course.TITLE}</h5>
        <AccordionRoot type="single" collapsible>
          <AccordionItem value="description">
            <AccordionTrigger>Description</AccordionTrigger>
            <AccordionContent>
              <p>{course.SHORTDESC}</p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
        <Items>
          <Item label="School" value={course.SCHOOL} />
          <Item label="Department" value={course.DEPARTMENT} />
          <Item label="Level" value={course.ACADEMICLEVEL} />
        </Items>
        {course.PREREQ && (
          <Item css={{
            marginTop: '$big'
          }} label="Pre-req" value={course.PREREQ} />
        )}
    </div>
    <CardFooter>
      <i>ECTS Credits: {course.CRECTS}</i>
      {children}
    </CardFooter>
  </Card>
)