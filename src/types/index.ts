export interface Semester {
  ID: string;
  NAME: string;
}

export interface Schedule {
  CAPACITY: string;
  DAYS: string;
  ENR: number;
  FACULTY: string;
  FINALEXAM: boolean;
  INSTANCEID: string;
  ROOM: string;
  ST: string;
  TIMES: string;
}

export interface Course {
  ABBR: string;
  ACADEMICLEVEL: string;
  ACADEMICLEVELID: string;
  ANTIREQ: string;
  BREADTH: string;
  CCDISPLAY: string;
  COREQ: string;
  COURSEID: string;
  CRECTS: string;
  CRUS: string;
  DEPARTMENT: string;
  LASTTAUGHT: string;
  PREREQ: string;
  RNO: string;
  SCHOOL: string;
  SCHOOLABBR: string;
  SCHOOLID: string;
  SHORTDESC: string;
  TERMNAME: string;
  TITLE: string;
}

export type WeekDay = 'M' | 'T' | 'W' | 'R' | 'F' | 'S';

export interface Time {
  hh: number;
  mm: number;
}

export interface CalendarItem {
  startTime: Time;
  endTime: Time;
}

export interface Card extends CalendarItem {
  abbr: string;
  title: string;
  capacity: string;
  faculty: string;
  room: string;
  ST: string;
  id: string;
}

export type Week = Record<WeekDay, Card[]>;