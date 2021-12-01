import { FC } from "react";
import type { Card as CardType } from "src/types";
import { getTimeRange } from "src/utils/calendar";
import { styled } from "src/utils/theme";

const CardBase = styled('div', {
  height: '100%',
  width: '100%',
  padding: 2,
});

const CardContent = styled('div', {
  height: '100%',
  width: '100%',
  borderRadius: '$medium',
  padding: '$big',
  backgroundColor: '$primary',
  color: '$primaryText',
  position: 'relative',
  fontSize: '$superSmall',
  overflow: 'hidden',
  cursor: 'pointer',

  '& > h2': {
    all: 'unset',
    display: 'block',
    fontWeight: 600,
    fontSize: '$small',
  },

  '& > div': {
    marginTop: '$small',
    opacity: 0.9
  },

  '& b': {
    fontWeight: 600,
  },

  '&:after': {
    backgroundColor: '$primary',
    content: '',
    display: 'block',
    position: 'absolute',
    width: '100%',
    height: 8,
    left: 0,
    bottom: -4,
    filter: 'blur(4px)',
  }
});

interface CardProps extends CardType {
  onClick?: (card: CardType) => void;
}

export const Card: FC<CardProps> = ({ onClick, ...cardProps }) => (
  <CardBase>
    <CardContent onClick={() => onClick && onClick(cardProps)}>
      <h2>{cardProps.abbr} • {cardProps.ST}</h2>
      <div>
        <b>Time: </b><span>{getTimeRange(cardProps)}</span>
      </div>
      <div>
        <b>Instructor(s): </b><span>{cardProps.faculty.split('<br>').join(';')}</span>
      </div>
    </CardContent>
  </CardBase>
);
