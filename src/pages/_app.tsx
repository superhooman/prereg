import { globalCss } from "@stitches/react";
import type { AppContext, AppProps } from "next/app";
import Head from "next/head";
import Cookies from 'js-cookie'
import { useCallback, useEffect, useReducer } from "react";
import { darkTheme } from "src/utils/theme";
import { appContext, initialState, reducer, Theme } from "src/utils/context";
import { ThemeToggle } from "src/components/ThemeToggle";
import { LoadingOverlay } from "src/components/LoadingOverlay";
import { NextPageContext } from "next";
import { Request } from "express";

const TITLE = 'PreReg | superhooman';
const DESCRIPTION = 'Get your perfect schedule';

const URL = 'https://prereg.superhooman.co/';
const OPENGRAPH = `${URL}opengraph.png`;
const THEME_SETTING = 'reg.themeSetting';

const globalStyles = globalCss({
  body: {
    backgroundColor: '$background',
    color: '$text',
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
          <title>{TITLE}</title>
          <meta name="title" content={DESCRIPTION} />
          <meta name="description" content={DESCRIPTION} />

          <meta property="og:type" content="website" />
          <meta property="og:url" content={URL} />
          <meta property="og:title" content={TITLE} />
          <meta property="og:description" content={DESCRIPTION} />
          <meta property="og:image" content={OPENGRAPH} />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={URL} />
          <meta property="twitter:title" content={TITLE} />
          <meta property="twitter:description" content={DESCRIPTION} />
          <meta property="twitter:image" content={OPENGRAPH} />

          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#272727" />
          <meta name="msapplication-TileColor" content="#272727" />

          <meta name="keywords" content="Registrar, Nazarbayev University, Courses, Online, Tool" />
          <meta name="author" content="superhooman" />

          <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="theme-color" content={themeToColor[state.theme]} />
          <style id="ssr_theme" dangerouslySetInnerHTML={{ __html: `html{background-color:${themeToColor[state.theme]};}` }} />
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