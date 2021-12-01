import { ArrowLeftIcon, ArrowRightIcon, Cross2Icon } from "@modulz/radix-icons";
import dynamic from "next/dynamic";
import { FC, PropsWithChildren, useCallback, useMemo, useState } from "react";
import { CalendarItem, Card as CardType, Time, Week, WeekDay } from "src/types";
import { calculateOverlap, formatTime, getTimeRange, TIMES, WEEK_DAYS } from "src/utils/calendar";
import { styled } from "src/utils/theme";
import { Card } from "./Card";
import { Item } from "./Course";
import { DialogClose, DialogContent, DialogTitle } from "./Dialog";
import { IconButton } from "./IconButton";
import { Paragraph } from "./Paragraph";

const Dialog = dynamic(() => import('./Dialog'), {
  ssr: false,
});

interface CalendarProps {
  week: Week;
};

const getShiftFromHM = (time: Time, noShift?: boolean) => {
  return (noShift ? time.hh : time.hh - 8) + time.mm / 60;
};

const WEEK_DAYS_ONLY = WEEK_DAYS.map(([key]) => key);

const CalendarGrid = styled('div', {
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '40px 1fr',
  '$$block': '96px',
  '$$header': '40px',

  '@bp2': {
    gridTemplateColumns: '48px 1fr',
    marginX: '-$huge',
  }
});

const Days = styled('div', {
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',

  '@bp2': {
    gridTemplateColumns: '1fr',
  }
})

const Day = styled('div', {
  '&::before': {
    content: '',
    position: 'absolute',
    display: 'block',
    height: '100%',
    width: 1,
    backgroundColor: '$gray4',
    transform: 'translateX(-0.5px)'
  },

  variants: {
    selected: {
      selected: {
        '@bp2': {
          display: 'block'
        }
      },
      notSelected: {
        '@bp2': {
          display: 'none'
        }
      }
    },
  },
  defaultVariants: {
    selected: 'notSelected'
  }
});

const DayTitle = styled('div', {
  fontSize: '$small',
  textTransform: 'uppercase',
  textAlign: 'center',
  lineHeight: '$$header',
  height: 'fit-content',
});

const DayItems = styled('div', {
  position: 'relative',
});

const Times = styled('div', {
  paddingTop: '$$header',
})

const TimeCell = styled('div', {
  lineHeight: '$$block',
  fontSize: '$superSmall',

  '@bp2': {
    textAlign: 'center',
  },

  '&::before': {
    content: '',
    position: 'absolute',
    display: 'block',
    height: 1,
    width: '100%',
    backgroundColor: '$gray4'
  }
});

const Overlap = styled('div', {
  zIndex: 1,
  padding: 2,
  height: '100%',

  '&::after': {
    content: '',
    display: 'block',
    height: '100%',
    width: '100%',
    backgroundColor: '$red10',
    borderRadius: '$medium',
    opacity: 0.32,
  }
});

interface CalendarElementProps extends CalendarItem {
  clickable?: boolean;
}

const CalendarElement: FC<PropsWithChildren<CalendarElementProps>> = ({ startTime, endTime, clickable = true, children }) => {
  const height = useMemo(() => getShiftFromHM({
    hh: endTime.hh - startTime.hh,
    mm: endTime.mm - startTime.mm
  }, true), [endTime, startTime]);
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        width: '100%',
        transform: `translateY(calc(var(---block) * ${getShiftFromHM(startTime)}))`,
        height: `calc(var(---block) * ${height})`,
        pointerEvents: clickable ? 'all' : 'none',
      }}
    >
      {children}
    </div>
  )
}

const Buttons = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',

  display: 'none',
  paddingY: '$small',
  paddingX: '$medium',
  justifyContent: 'space-between',

  '@bp2': {
    display: 'flex',
  }
});

const Items = styled('div', {
  display: 'grid',
  gap: '$big',
  gridTemplateColumns: '1fr',
})

export const Calendar: FC<CalendarProps> = ({ week }) => {
  const [selectedDay, setSelectedDay] = useState<WeekDay>('M');
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const nextDay = useCallback(() => {
    setSelectedDay((day) => {
      const index = WEEK_DAYS_ONLY.indexOf(day);
      return WEEK_DAYS_ONLY[(index + 1) % WEEK_DAYS_ONLY.length];
    })
  }, []);

  const prevDay = useCallback(() => {
    setSelectedDay((day) => {
      const index = WEEK_DAYS_ONLY.indexOf(day);
      return WEEK_DAYS_ONLY[(index === 0 ? WEEK_DAYS_ONLY.length : index) - 1 % WEEK_DAYS_ONLY.length];
    })
  }, []);

  const onCardClick = useCallback((card: CardType) => {
    setSelectedCard(card);
    setDialogOpen(true);
  }, []);

  return (
    <CalendarGrid>
      <Times>
        {TIMES.map((el) => (
          <TimeCell key={el}>{el}</TimeCell>
        ))}
      </Times>
      <Days>
        <Buttons>
          <IconButton onClick={prevDay}>
            <ArrowLeftIcon height={16} />
          </IconButton>
          <IconButton onClick={nextDay}>
            <ArrowRightIcon height={16} />
          </IconButton>
        </Buttons>
        {WEEK_DAYS.map(([key, day]) => (
          <Day selected={selectedDay === key ? 'selected' : 'notSelected'} key={key}>
            <DayTitle>{day}</DayTitle>
            <DayItems>
              {week[key].map((item, i) => (
                <CalendarElement startTime={item.startTime} endTime={item.endTime} key={`${item.id}_${i}`}>
                  <Card onClick={onCardClick} {...item} />
                </CalendarElement>
              ))}
              {calculateOverlap(week[key]).map(({ startTime, endTime }, i) => (
                <CalendarElement clickable={false} key={`${key}-overlap-${i}`} startTime={startTime} endTime={endTime}>
                  <Overlap />
                </CalendarElement>
              ))}
            </DayItems>
          </Day>
        ))}
      </Days>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {selectedCard && (
          <DialogContent onBackdropClick={() => setDialogOpen(false)}>
            <DialogTitle>{selectedCard.abbr} • {selectedCard.ST}</DialogTitle>
            <Paragraph css={{ marginTop: '$small', marginBottom: '$big' }}>{selectedCard.title}</Paragraph>
            <Items>
              <Item label="Time" value={getTimeRange(selectedCard)} />
              <Item label="Instructor(s)" value={selectedCard.faculty.split('<br>').join(';')} />
              <Item label="Capacity" value={selectedCard.capacity} />
              <Item label="Room" value={selectedCard.room} />
            </Items>
            <DialogClose asChild>
              <IconButton>
                <Cross2Icon />
              </IconButton>
            </DialogClose>
          </DialogContent>
        )}
      </Dialog>
    </CalendarGrid>
  )
}