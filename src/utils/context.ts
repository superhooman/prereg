import { createContext } from "react";
import { Course } from "src/types";

type Theme = 'default' | 'dark';

type Action = 
  | { type: 'addToCart', course: Course }
  | { type: 'removeFromCart', course: Course }
  | { type: 'getSchedule', courseIds: string[] }
  | { type: 'selectTerm', term: string }
  | { type: 'loadDataStart' }
  | { type: 'loadDataProgress', value: number }
  | { type: 'loadDataEnd' }
  | { type: 'setTheme', theme: Theme }

interface AppState {
  courses: Course[];
  isLoading: boolean;
  progres: number;
  term: string;
  theme: Theme,
}

interface AppContext extends AppState {
  dispatch: (action: Action) => void;
}

export const getCourseId = ({ COURSEID, LASTTAUGHT }: Course) => `${COURSEID}_${LASTTAUGHT}`;

export const hasCourse = (courses: Course[], course: Course) => courses.map(getCourseId).indexOf(getCourseId(course)) > -1;

export const initialState: AppState = {
  courses: [],
  isLoading: false,
  progres: 0,
  term: '',
  theme: 'default',
}

export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'addToCart': {
      if (hasCourse(state.courses, action.course)) {
        return state;
      }
      return {
        ...state,
        courses: [...state.courses, action.course],
      }
    }
    case 'removeFromCart': {
      const courses = state.courses.filter((course) => getCourseId(course) !== getCourseId(action.course));
      return {
        ...state,
        courses,
      }
    }
    case 'selectTerm': {
      return {
        ...state,
        term: action.term,
      }
    }
    case 'setTheme': {
      return {
        ...state,
        theme: action.theme,
      }
    }
    case 'loadDataStart': {
      return {
        ...state,
        isLoading: true,
        progres: 0,
      }
    }
    case 'loadDataEnd': {
      return {
        ...state,
        isLoading: false,
        progres: 0,
      }
    }
    case 'loadDataProgress': {
      return {
        ...state,
        progres: action.value,
      }
    }
    default:
      return state;
  }
}

export const appContext = createContext<AppContext>({
  ...initialState,
  dispatch: () => {},
});
