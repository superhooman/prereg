import { ChevronDownIcon } from "@modulz/radix-icons";
import { VariantProps } from "@stitches/react";
import { FC, ReactNode, SelectHTMLAttributes } from "react";
import { styled } from "src/utils/theme";

const SelectBase = styled('select', {
  all: 'unset',
  boxSizing: 'border-box',

  display: 'block',

  backgroundColor: 'transparent',
  borderRadius: '$medium',
  borderWidth: '$medium',
  borderColor: '$gray4',
  borderStyle: 'solid',

  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

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
        $$size: '36px',
        paddingRight: '$$size',
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
  },
});

const SelectWrapper = styled('div', {
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

  'select:focus + &': {
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

type StyledInputVariants = VariantProps<typeof SelectBase>;

export interface Option {
  label: string;
  value: string;
}

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'onChange'> & Omit<StyledInputVariants, 'icon'> & {
  icon?: ReactNode;
  options: Option[];
  onChange?: (v: string) => void;
}

export const Select: FC<SelectProps> = ({ icon, size, options, onChange, width, ...props }) => (
  <SelectWrapper width={width}>
    <SelectBase {...props} width={width} onChange={(e) => {
      const { value } = e.target;
      onChange && onChange(value);
    }} icon={icon ? 'withIcon' : 'noIcon'}>
      {options.map(({ value, label }) => (
        <option value={value} key={value}>{label}</option>
      ))}
    </SelectBase>
    {icon && <Icon>{icon}</Icon>}
    <Icon
      css={{
        left: 'unset',
        right: 1,
      }}
    >
      <ChevronDownIcon/>
    </Icon>
  </SelectWrapper>
)
