import { useCallback, useContext, useEffect, useState } from "react";
import { Course, Schedule } from "src/types";
import { appContext, getCourseId } from "src/utils/context";
import { request } from "src/utils/request";

export type ScheduleList = Record<string, Schedule[]>;

export const useGetSchedule = () => {
  const [schedule, setSchedule] = useState<ScheduleList>({});
  const { courses, term, dispatch } = useContext(appContext);

  const getSchedule = useCallback(async (course: Course, value: number) => request({
    method: 'getSchedule',
    termId: term,
    courseId: course.COURSEID,
  }).then((res) => {
    const schedule: Schedule[] = res.data;
    dispatch({ type: 'loadDataProgress', value })
    setSchedule((values) => ({
      ...values,
      [getCourseId(course)]: schedule,
    }));
  }), [term, dispatch]);

  useEffect(() => {
    const fetchData = () => {
      dispatch({ type: 'loadDataStart' });
      Promise.all(courses.map((course, i) => getSchedule(course, (i + 1) / courses.length))).then(() => {
        dispatch({ type: 'loadDataEnd' });
      });
    };
    fetchData();
    return () => {
      dispatch({ type: 'loadDataEnd' });
      setSchedule({});
    }
  }, [courses, getSchedule, dispatch]);

  return schedule;
}
