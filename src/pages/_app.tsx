import { globalCss } from "@stitches/react";
import type { AppContext, AppProps } from "next/app";
import Head from "next/head";
import Cookies from 'js-cookie'
import { useCallback, useEffect, useReducer } from "react";
import { darkTheme } from "src/utils/theme";
import { appContext, AppState, initialState, reducer, Theme } from "src/utils/context";
import { ThemeToggle } from "src/components/ThemeToggle";
import { LoadingOverlay } from "src/components/LoadingOverlay";
import { NextPageContext } from "next";
import { Request } from "express";

const THEME_SETTING = 'reg.themeSetting';

const globalStyles = globalCss({
  '@import': "url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap')",
  '*': {
    boxSizing: 'border-box',
  },
  body: {
    margin: 0,
    padding: 0,
    backgroundColor: '$background',
    color: '$text',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;'
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  }
});

const Provider = appContext.Provider;

const themeToColor: Record<Theme, string> = {
  'dark': '#000000',
  'default': '#ffffff',
}

interface Props extends AppProps {
  theme: Theme;
}

const App = ({ Component, theme }: Props) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    theme,
  });

  useEffect(() => {
    if (state.theme === 'dark') {
      document.body.classList.add(darkTheme);
      return () => {
        document.body.classList.remove(darkTheme);
      }
    }
  }, [state.theme]);

  const toggleTheme = useCallback(() => {
    const newTheme = state.theme === 'default' ? 'dark' : 'default';
    Cookies.set(THEME_SETTING, newTheme);
    dispatch({ type: 'setTheme', theme: newTheme });
  }, [state.theme]) ;

  globalStyles();

  return (
    <Provider value={{
      ...state,
      dispatch,
    }}>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: `html{background-color:${themeToColor[state.theme]};}` }} />
        <meta name="theme-color" content={themeToColor[state.theme]} />
      </Head>
      <LoadingOverlay value={state.progres} active={state.isLoading} text="Fetching schedule..." />
      <Component />
      <ThemeToggle state={state.theme} onClick={toggleTheme} />
    </Provider>
  )
}

interface Ctx extends NextPageContext {
  req?: Request;
}

interface ExpressAppContext extends AppContext {
  ctx: Ctx;
}

App.getInitialProps = (appContext: ExpressAppContext) => {
  let theme: Theme = 'default';

  if (appContext.ctx.req) {
    theme = appContext.ctx.req.cookies[THEME_SETTING] === 'default' ? 'default' : 'dark';
  }

  return {
    theme,
  }
}

export default App;