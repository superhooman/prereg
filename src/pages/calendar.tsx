import { ArrowLeftIcon, Cross2Icon } from "@modulz/radix-icons";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { Button } from "src/components/Button";
import { Calendar as CalendarGrid } from "src/components/Calendar";
import { DialogClose, DialogContent, DialogTitle } from "src/components/Dialog";
import { IconButton } from "src/components/IconButton";
import { Layout } from "src/components/Layout";
import { Paragraph } from "src/components/Paragraph";
import { Select } from "src/components/Select";
import { Tabs } from "src/components/Tabs";
import { ScheduleList, useGetSchedule } from "src/hooks/getSchedule";
import type { Card, Course, Schedule, WeekDay } from "src/types"
import { getEndTime, getStartTime, getTimeRange, parseTime, WEEK_DAYS } from "src/utils/calendar";
import { appContext, getCourseId } from "src/utils/context";
import { styled } from "src/utils/theme";

const Dialog = dynamic(() => import('src/components/Dialog'), {
  ssr: false,
});

type SelectedSchedule = Record<string, Record<string, string>>;

interface TabContentProps {
  courseId: string;
  schedule: Schedule[];
  selection: SelectedSchedule;
  onSelect: (courseId: string, type: string) => (v: string) => void;
}

interface TypeProps extends TabContentProps {
  type: string;
}

interface SelectedCourse {
  course: Course;
  scheduleList: Schedule[];
}

const dict: Record<string, string> = {
  "L": "Lecture",
  "R": "Recitation",
  "S": "Seminar",
  "PLb": "PhysLab",
  "CLb": "CompLab",
  "Lb": "Lab"
};

const typeReg = /[a-zA-Z]+/

const getType = (ST: string) => {
  const match = ST.match(typeReg);
  return match ? match[0] : '';
}

const getTypes = (schedules: Schedule[]) => new Set(schedules.map(({ ST }) => getType(ST)).filter((st) => st.length));

const getInitialSelection = (courses: Course[]) => courses.reduce((res: SelectedSchedule, course) => {
  res[getCourseId(course)] = {}
  return res;
}, {});

const getCalendarItems = (selection: SelectedSchedule, courses: Course[], schedule: ScheduleList): SelectedCourse[] => {
  if (!schedule) {
    return [];
  }
  return courses.map((course) => {
    const courseId = getCourseId(course);
    const selected = selection[courseId];
    const schedules = schedule[courseId] || [];
  
    const types = Object.keys(selected);
  
    return {
      course,
      scheduleList: types.map((type) => (
        schedules.filter(({ ST }) => getType(ST) === type)[Number(selected[type])]
      )).filter((s) => s),
    }
  });
}

const getWeek = (items: SelectedCourse[]) => {
  const week: Record<WeekDay, Card[]> = {
    M: [],
    T: [],
    W: [],
    R: [],
    F: [],
    S: []
  }
  
  items.forEach(({ course, scheduleList }) => {
    scheduleList.forEach((schedule) => {
      if (!schedule.DAYS) {
        return;
      }

      const days = schedule.DAYS.trim().split(' ') as WeekDay[];
      const times = schedule.TIMES.split('-');

      if (times.length < 2) {
        return;
      }

      const card: Card = {
        abbr: course.ABBR,
        title: course.TITLE,
        capacity: schedule.CAPACITY,
        faculty: schedule.FACULTY,
        room: schedule.ROOM,
        ST: schedule.ST,
        id: schedule.INSTANCEID,
        startTime: parseTime(times[0]),
        endTime: parseTime(times[1]),
      };

      days.forEach((day) => {
        week[day].push(card);
      });
    });
  })
  WEEK_DAYS.forEach(([key]) => {
    week[key].sort((a, b) => {
      const A = {
        start: getStartTime(a),
        end: getEndTime(a),
      }
      const B = {
        start: getStartTime(b),
        end: getEndTime(b),
      }
      if (A.start === B.start) {
        return A.end - B.end;
      }
      return A.start - B.start;
    });
  })
  return week;
}

const Grid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '$medium',
  paddingY: '$bigger',
  borderTop: '1px transparent solid',
  borderBottom: '1px transparent solid',
  borderColor: '$gray4',

  '@bp2': {
    gridTemplateColumns: '1fr',
    marginX: '-$huge',
    paddingX: '$big',
  }
});

const getRange = (str: string) => {
  const times = str.split('-').map(parseTime);

  return getTimeRange({ startTime: times[0], endTime: times[1] });
}

const Type: FC<TypeProps> = ({ selection, type, schedule, courseId, onSelect }) => {
  const options = useMemo(() => schedule.filter(({ ST }) => ST.match(typeReg)?.[0] === type).map(({ ST, TIMES, DAYS }, i) => ({
    label: `${ST} ${getRange(TIMES)} ${DAYS}`,
    value: `${i}`,
  })), [schedule, type]);

  return (
    <Select
      width="max"
      value={selection[courseId][type] || '-1'}
      onChange={onSelect(courseId, type)}
      options={[
        {
          label: `Select ${dict[type] || type}`,
          value: '-1'
        },
        ...options,
      ]}
    />
  )
}


const TabContent: FC<TabContentProps> = ({ courseId, schedule, onSelect, selection }) => {
  const types = useMemo<string[]>(() => Array.from(getTypes(schedule)), [schedule]);
  return (
    <Grid>
      {types.map((type) => (
        <Type
          key={`${courseId}_${type}`}
          type={type}
          courseId={courseId}
          onSelect={onSelect}
          selection={selection}
          schedule={schedule}
        />
      ))}
    </Grid>
  )
}

const Calendar = () => {
  const [noCoursesWarining, setNoCoursesWarning] = useState(false);
  const { courses, isLoading } = useContext(appContext);
  const schedule = useGetSchedule();
  const [selection, setSelection] = useState<SelectedSchedule>(getInitialSelection(courses));

  const week = useMemo(() => getWeek(getCalendarItems(selection, courses, schedule)), [selection, courses, schedule]);

  const tabs = useMemo(() => courses.map((course) => {
    const setTypeSelection = (courseId: string, type: string) => (v: string) => {
      setSelection((s) => ({
        ...s,
        [courseId]: {
          ...s[courseId],
          [type]: v,
        }
      }));
    };
    const courseId = getCourseId(course)
    return ({
      value: courseId,
      label: course.ABBR,
      content: (
        <TabContent
          schedule={schedule[courseId] || []}
          courseId={courseId}
          selection={selection}
          onSelect={setTypeSelection}
        />
      )
    })
  }), [courses, schedule, selection]);

  useEffect(() => {
    if (courses.length < 1) {
      setNoCoursesWarning(true);
    }
  }, [courses]);

  return (
    <Layout>
      {!isLoading && courses.length ? (
        <Tabs
          margin="-$huge"
          padding="$huge"
          defaultTab={getCourseId(courses[0])}
          tabs={tabs}
        />
      ) : null}
      <CalendarGrid week={week} />
      <Dialog open={noCoursesWarining} onOpenChange={setNoCoursesWarning}>
        <DialogContent onBackdropClick={() => setNoCoursesWarning(false)}>
          <DialogTitle>Oops...</DialogTitle>
          <Paragraph css={{ marginY: '$big' }}>
            Seems like you forgot to choose your courses.
          </Paragraph>
          <Link passHref href="/">
            <Button style={{ width: '100%' }} icon={<ArrowLeftIcon />}>Select courses</Button>
          </Link>
          <DialogClose asChild>
            <IconButton>
              <Cross2Icon />
            </IconButton>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </Layout>
  )
};

export default Calendar;