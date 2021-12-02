import { SymbolIcon } from "@modulz/radix-icons";
import { VariantProps } from "@stitches/react";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { styled } from "src/utils/theme";
import { Loading } from "./Loading";

const ButtonBase = styled('button', {
  all: 'unset',
  boxSizing: 'border-box',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',

  borderRadius: '$medium',
  borderWidth: '$medium',
  borderColor: 'transparent',
  borderStyle: 'solid',
  transform: 'none',
  transition: '$button',
  textAlign: 'center',

  cursor: 'pointer',

  '&:focus': {
    boxShadow: '$focus',
  },

  variants: {
    color: {
      red: {
        color: '$red10',
        borderColor: '$red10',

        '&:hover': {
          backgroundColor: '$red4',
        },
      
        '&:active': {
          backgroundColor: '$red10',
          color: '#fff',
        },
      },
      primary: {
        backgroundColor: '$primary',
        color: '$primaryText',

        '&:hover': {
          backgroundColor: '$primaryLighter',
        },
      
        '&:active': {
          transform: 'scale(0.95)'
        },
      }
    },
    size: {
      medium: {
        fontSize: '$medium',
        lineHeight: '1.2',
        paddingY: '$medium',
        paddingX: '$big',
        $$size: '36px'
      }
    },
    state : {
      idle: {},
      loading: {
        backgroundColor: '$gray8!important',
        cursor: 'not-allowed',
      }
    }
  },

  defaultVariants: {
    size: 'medium',
    color: 'primary',
    state: 'idle',
  },
});

const Icon = styled('div', {
  marginRight: '$medium',

  '& svg': {
    display: 'block',
  },
});

type StyledInputVariants = VariantProps<typeof ButtonBase>;

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> & Omit<StyledInputVariants, 'icon'> & {
  icon?: ReactNode;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ loading = false, icon, children, ...props }, ref) => (
  <ButtonBase ref={ref} state={loading ? 'loading' : 'idle'} {...props}>
    {loading ? <Icon><Loading><SymbolIcon /></Loading></Icon> : (
      icon ? <Icon>{icon}</Icon> : null
    )}
    {children}
  </ButtonBase>
));
