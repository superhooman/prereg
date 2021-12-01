import { VariantProps } from "@stitches/react";
import { FC, InputHTMLAttributes, ReactNode } from "react";
import { styled } from "src/utils/theme";

const InputBase = styled('input', {
  all: 'unset',
  boxSizing: 'border-box',

  display: 'block',

  backgroundColor: 'transparent',
  borderRadius: '$medium',
  borderWidth: '$medium',
  borderColor: '$gray4',
  borderStyle: 'solid',

  '&:focus': {
    borderColor: '$primary',
  },

  variants: {
    width: {
      max: {
        width: '100%',
      },
      min: {
        width: 'fit-content',
      },
      unset: {
        width: 'unset',
      }
    },
    size: {
      medium: {
        fontSize: '$medium',
        lineHeight: '$medium',
        paddingY: '$medium',
        paddingX: '$big',
        $$size: '36px'
      }
    },
    icon: {
      noIcon: {
        
      },
      withIcon: {
        paddingLeft: '$$size',
      }
    }
  },

  defaultVariants: {
    icon: 'noIcon',
    size: 'medium',
    width: 'unset',
  },
});

const InputWrapper = styled('div', {
  all: 'unset',
  display: 'block',
  position: 'relative',

  variants: {
    width: {
      max: {
        width: '100%',
      },
      min: {
        width: 'fit-content',
      },
      unset: {
        width: 'unset',
      }
    },
  },

  defaultVariants: {
    width: 'unset',
  }
});

const Icon = styled('div', {
  position: 'absolute',
  pointerEvents: 'none',
  top: 0,
  left: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  opacity: 0.5,

  transition: '$opacity',

  'input:focus + &': {
    opacity: 1,
  },

  variants: {
    size: {
      medium: {
        height: 36,
        width: 36,
      }
    }
  },

  defaultVariants: {
    size: 'medium',
  }
})

type StyledInputVariants = VariantProps<typeof InputBase>;

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & Omit<StyledInputVariants, 'icon'> & {
  icon?: ReactNode;
}

export const Input: FC<InputProps> = ({ icon, size, width, ...props }) => (
  <InputWrapper width={width}>
    <InputBase {...props} width={width} icon={icon ? 'withIcon' : 'noIcon'} />
    {icon && <Icon>{icon}</Icon>}
  </InputWrapper>
)
