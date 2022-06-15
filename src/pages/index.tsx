import { ArrowUpIcon, CardStackPlusIcon, MagicWandIcon, MagnifyingGlassIcon, SymbolIcon } from '@modulz/radix-icons'
import Link from 'next/link'
import { ChangeEvent, FormEvent, useCallback, useContext, useEffect, useState } from 'react';
import { Button } from 'src/components/Button';
import { CartItem } from 'src/components/CartItem';
import { Course } from 'src/components/Course';
import { Input } from "src/components/Input";
import { Layout } from 'src/components/Layout';
import { Option, Select } from 'src/components/Select';
import type { Course as CourseType, Semester } from 'src/types';
import { appContext, getCourseId, hasCourse } from 'src/utils/context';
import { styled } from 'src/utils/theme';
import { request } from 'src/utils/request';
import { Placeholder, PlaceholderProps } from 'src/components/Placeholder';
import { Loading } from 'src/components/Loading';
import axios from 'axios';

const LIMIT = 10;

const Title = styled('h1', {
  all: 'unset',
  display: 'block',
  fontSize: '$huge',
  fontWeight: 'bold',
  marginBottom: '$huge',

  '& span': {
    fontSize: '$superSmall',
    fontWeight: 'normal',
    color: '$gray9'
  }
})

const Form = styled('form', {
  display: 'grid',
  gridTemplateColumns: '3fr 1fr 1fr 1fr',
  gap: '$big',

  '@bp2': {
    gridTemplateColumns: '1fr',
  },
});

const Columns = styled('div', {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: '$huge',
  paddingY: '$huge',

  '@bp2': {
    gridTemplateColumns: '1fr',
  }
});

const Rows = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$big',
  paddingY: '$big',
});

const Label = styled('h2', {
  all: 'unset',
  display: 'block',
  fontSize: '$small',
  textTransform: 'uppercase',
  color: '$gray11',
  borderBottom: '1px $gray4 solid',
  paddingBottom: '$big',
});

interface Values {
  search: string;
  page: number;
  total: number;
  level: string;
}

enum State {
  IDLE = 'idle',
  LOADING = 'loading',
  LOADED = 'loaded',
}

interface Response {
  data: CourseType[];
  total: string;
}

const levels: Option[] = [
  {
    label: 'Not specified',
    value: '-1',
  },
  {
    label: 'Undergraduate',
    value: '1',
  },
  {
    label: 'Master',
    value: '2',
  },
  {
    label: 'PhD',
    value: '3',
  },
  {
    label: 'Doctor of Medicine',
    value: '6',
  },
  {
    label: "Zero Years of Master's Programs",
    value: '8'
  }
]

const stateToPlaceholder: Record<State, PlaceholderProps> = {
  idle: {
    icon: <ArrowUpIcon />,
    text: 'Use the form above to find courses',
  },
  loading: {
    icon: <Loading><SymbolIcon /></Loading>,
    text: 'Loading...',
  },
  loaded: {
    icon: <MagnifyingGlassIcon />,
    text: 'No courses found'
  }
}

const Home = () => {
  const [state, setState] = useState<State>(State.IDLE);
  const [semesters, setSemesters] = useState<Option[]>([]);
  const [results, setResults] = useState<CourseType[]>([]);
  const [values, setValues] = useState<Values>({
    search: '',
    page: 1,
    total: 1,
    level: '1',
  });

  const { dispatch, courses, term } = useContext(appContext);

  const getSemesters = useCallback(() => {
    axios('/api/getSemesters').then((res) => {
      const data = res.data as Semester[];
      if (!term) {
        dispatch({ type: 'selectTerm', term: data[0].ID })
      }
      setSemesters(data.map(({ ID, NAME }) => ({ label: NAME, value: ID })));
    });
  }, [dispatch, term]);

  const setSemester = useCallback((value: string) => {
    dispatch({ type: 'selectTerm', term: value })
  }, [dispatch]);

  const setLevel = useCallback((value: string) => {
    setValues(values => ({
      ...values,
      level: value,
    }));
  }, []);

  const setSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValues(values => ({
      ...values,
      search: value,
    }));
  }, []);

  useEffect(getSemesters, [getSemesters]);

  const getCourses = useCallback((search: string, page: number, level: string) => {
    setState(State.LOADING);
    if (page === 1) {
      setResults([]);
    }
    request({
      'method': 'getSearchData',
      'searchParams[formSimple]': 'false',
      'searchParams[limit]': LIMIT,
      'searchParams[page]': page,
      'searchParams[start]': 0,
      'searchParams[quickSearch]': search,
      'searchParams[sortField]': -1,
      'searchParams[sortDescending]': -1,
      'searchParams[semester]': term,
      'searchParams[schools]': '',
      'searchParams[departments]': '',
      'searchParams[levels][]': level,
      'searchParams[subjects]': '',
      'searchParams[instructors]': '',
      'searchParams[breadths]': '',
      'searchParams[abbrNum]': '',
      'searchParams[credit]': '',
    }).then((res) => {
      const response: Response = res.data;
      const { data, total } = response
      if (Array.isArray(data)) {
        setResults(prev => page === 1 ? data : [...prev, ...data]);
        setValues(values => ({
          ...values,
          page,
          total: Math.round(Number(total) / LIMIT),
        }))
      }
    }).finally(() => {
      setState(State.LOADED);
    });
  }, [term]);

  const nextPage = useCallback(() => {
    setValues((values) => {
      const newPage = values.page + 1;
      getCourses(values.search, newPage, values.level);
      return {
        ...values,
        page: newPage,
      }
    })
  }, [getCourses]);

  const addToCart = useCallback((course: CourseType) => {
    dispatch({ type: 'addToCart', course });
  }, [dispatch]);

  const removeFromCart = useCallback((course: CourseType) => {
    dispatch({ type: 'removeFromCart', course });
  }, [dispatch]);

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getCourses(values.search, 1, values.level);
  }, [getCourses, values]);

  const loading = state === State.LOADING;

  return (
    <Layout>
      <Title>PreReg <span>by superhooman</span></Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={setSearch}
          value={values.search}
          width="max"
          placeholder="Course abbr (ex. CSCI 152) or title"
          icon={<MagnifyingGlassIcon />}
          spellCheck="false"
          autoCorrect="off"
        />
        <Select
          value={values.level}
          onChange={setLevel}
          width="max"
          options={levels}
        />
        <Select
          value={term}
          onChange={setSemester}
          width="max"
          options={semesters}
        />
        <Button loading={loading} disabled={loading}>Search</Button>
      </Form>
      <Columns>
        <div>
          <Label>Results</Label>
          {results.length ? (
            <Rows>
              {results.map((course) => (
                <Course course={course} key={getCourseId(course)}>
                  {!hasCourse(courses, course) ? (
                    <Button onClick={() => addToCart(course)}>Select</Button>
                  ) : (
                    <Button color="red" onClick={() => removeFromCart(course)}>Remove</Button>
                  )}
                </Course>
              ))}
              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
                  <Loading>
                    <SymbolIcon width={24} height={24} style={{ display: 'block' }} />
                  </Loading>
                </div>
              ) : (values.page < values.total ? (
                <Button onClick={nextPage} style={{ maxWidth: 240, width: '100%', margin: 'auto' }}>Load more</Button>
              ) : null)}
            </Rows>
          ) : (
            <Placeholder
              {...stateToPlaceholder[state]}
            />
          )}
        </div>
        <div>
          <Label>Cart</Label>
          {courses.length ? (
            <Rows>
              {courses.map((course) => (
                <CartItem
                  key={getCourseId(course)}
                  title={course.ABBR}
                  subtitle={course.TITLE}
                  onRemove={() => removeFromCart(course)}
                />
              ))}
              <Link passHref href="/calendar">
                <Button icon={<MagicWandIcon />}>Proceed</Button>
              </Link>
            </Rows>
          ) : (
            <Placeholder
              icon={<CardStackPlusIcon />}
              text="Select some courses"
            />
          )}
        </div>
      </Columns>
    </Layout>
  )
};

export default Home;