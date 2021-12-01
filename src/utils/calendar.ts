import { CalendarItem, Time, WeekDay } from "src/types"

export const TIMES = [
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

export const WEEK_DAYS: [WeekDay, string][] = [["M", "Monday"], ["T", "Tuesday"], ["W", "Wednesday"], ["R", "Thursday"], ["F", "Friday"], ["S", "Saturday"]]

export const parseTime = (str: string): Time => {
  const [time, modifier] = str.split(' ');
  let [hh, mm] = time.split(':').map((el) => parseInt(el, 10));
  if (hh == 12) {
    hh = 0
  }
  if (modifier === 'PM') {
    hh = hh + 12
  }
  return { hh, mm }
}

const pad2 = (n: number) => `${n > 9 ? '' : 0}${n}`;

export const formatTime = (time: Time) => `${pad2(time.hh)}:${pad2(time.mm)}`;

export const getTimeRange = (a: CalendarItem) => `${formatTime(a.startTime)} - ${formatTime(a.endTime)}`

export const getStartTime = (a: CalendarItem) => (a.startTime.hh * 60 + a.startTime.mm);
export const getEndTime = (a: CalendarItem) => (a.endTime.hh * 60 + a.endTime.mm);

export const calculateOverlap = (day: CalendarItem[]) => {
  const result: CalendarItem[] = [];
  day.forEach((card, i) => {
    if (i + 1 === day.length) {
      return;
    }
    const current = {
      card: card,
      start: getStartTime(card),
      end: getEndTime(card),
    };
    const next = {
      card: day[i + 1],
      start: getStartTime(day[i + 1]),
      end: getEndTime(day[i + 1]),
    };
    if (current.end > next.start && current.start <= next.start) {
      result.push({
        startTime: next.card.startTime,
        endTime: current.card.endTime,
      })
    } else if (current.start <= next.start && current.end >= next.end) {
      result.push({
        startTime: next.card.startTime,
        endTime: next.card.endTime,
      });
    }
  });
  return result;
};
