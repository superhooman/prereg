import { TrashIcon } from "@modulz/radix-icons";
import { FC } from "react";
import { styled } from "src/utils/theme";

const CartItemBase = styled('div', {
  padding: '$big',
  display: 'flex',
  alignItems: 'flex-start',

  border: '1px transparent solid',
  borderColor: '$gray4',
  borderRadius: '$medium',

  '& > div': {
    flexGrow: 1,
    marginRight: '$small',
  },

  '& > button': {
    flexShrink: 0,
  },

  '& h3': {
    all: 'unset',
    display: 'block',
    fontSize: '$small',
    fontWeight: 600,
    marginBottom: '$small',
  },

  '& span': {
    all: 'unset',
    display: 'block',
    fontSize: '$superSmall',
    textTransform: 'uppercase',
    color: '$gray10',
  },
});

const RemoveButton = styled('button', {
  all: 'unset',
  display: 'block',
  backgroundColor: 'transparent',

  border: '1px transparent solid',
  borderColor: '$red10',
  cursor: 'pointer',

  color: '$red10',
  padding: '$medium',

  borderRadius: '$medium',

  transition: '$color',

  '&:hover': {
    backgroundColor: '$red4',
  },

  '&:focus': {
    backgroundColor: '$red6',
  },

  '&:active': {
    backgroundColor: '$red10',
    color: '#fff',
  },

  '& svg': {
    display: 'block',
  }
})

interface CartItemProps {
  title: string;
  subtitle: string;
  onRemove: () => void;
}

export const CartItem: FC<CartItemProps> = ({ title, subtitle, onRemove }) => (
  <CartItemBase>
    <div>
      <h3>{title}</h3>
      <span>{subtitle}</span>
    </div>
    <RemoveButton onClick={onRemove}>
      <TrashIcon />
    </RemoveButton>
  </CartItemBase>
);