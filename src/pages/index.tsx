import { ArrowUpIcon, CardStackPlusIcon, MagicWandIcon, MagnifyingGlassIcon, SymbolIcon } from '@modulz/radix-icons'
import Link from 'next/link'
import { ChangeEvent, FormEvent, useCallback, useContext, useEffect, useState } from 'react';
import { Button } from 'src/components/Button';
import { CartItem } from 'src/components/CartItem';
import { Course } from 'src/components/Course';
import { Input } from "src/components/Input";
import { Layout } from 'src/components/Layout';
import { Option, Select } from 'src/components/Select';
import type { Course as CourseType } from 'src/types';
import { appContext, getCourseId, hasCourse } from 'src/utils/context';
import { styled } from 'src/utils/theme';
import { request } from 'src/utils/request';
import { Placeholder, PlaceholderProps } from 'src/components/Placeholder';

const SEMESTERS: Option[] = [
  {
    label: "Sprint 2022",
    value: "603",
  },
  {
    label: "Fall 2021",
    value: "602",
  },
];

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
  gridTemplateColumns: '3fr 1fr 1fr',
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
}

enum State {
  IDLE = 'idle',
  LOADING = 'loading',
  LOADED = 'loaded',
}

const stateToPlaceholder: Record<State, PlaceholderProps> = {
  idle: {
    icon: <ArrowUpIcon/>,
    text: 'Use the form above to find courses',
  },
  loading: {
    icon: <SymbolIcon />,
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
  });

  const { dispatch, courses, term } = useContext(appContext);

  const getSemesters = useCallback(() => {
    setSemesters(SEMESTERS);
    dispatch({ type: 'selectTerm', term: SEMESTERS[0].value })
    // axios('/api/getSemesters').then((res) => {
    //   const data = res.data as Semester[];
    //   if (!term) {
    //     dispatch({ type: 'selectTerm', term: data[0].ID })
    //   }
    //   setSemesters(data.map(({ ID, NAME }) => ({ label: NAME, value: ID })));
    // });
  }, [dispatch]);

  const setSemester = useCallback((value: string) => {
    dispatch({ type: 'selectTerm', term: value })
  }, [dispatch]);

  const setSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValues(values => ({
      ...values,
      search: value,
    }));
  }, []);

  useEffect(getSemesters, [getSemesters]);

  const getCourses = useCallback(({ search, page }: Values) => {
    setState(State.LOADING);
    request({
      'method': 'getSearchData',
      'searchParams[formSimple]': 'false',
      'searchParams[limit]': 10,
      'searchParams[page]': page,
      'searchParams[start]': 0,
      'searchParams[quickSearch]': search,
      'searchParams[sortField]': -1,
      'searchParams[sortDescending]': -1,
      'searchParams[semester]': term,
      'searchParams[schools]': '',
      'searchParams[departments]': '',
      'searchParams[levels]': '',
      'searchParams[subjects]': '',
      'searchParams[instructors]': '',
      'searchParams[breadths]': '',
      'searchParams[abbrNum]': '',
      'searchParams[credit]': '',
    }).then((res) => {
      const { data } = res.data
      if (Array.isArray(data)) {
        setResults(data);
      }
    }).finally(() => {
      setState(State.LOADED);
    });
  }, [term]);

  const addToCart = useCallback((course: CourseType) => {
    dispatch({ type: 'addToCart', course });
  }, [dispatch]);

  const removeFromCart = useCallback((course: CourseType) => {
    dispatch({ type: 'removeFromCart', course });
  }, [dispatch]);

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getCourses(values);
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
          placeholder="Course abbr (ex. CSCI 152)"
          icon={<MagnifyingGlassIcon />}
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