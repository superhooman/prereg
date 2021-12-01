import { globalCss } from "@stitches/react";
import type { AppProps } from "next/app";
import { useCallback, useEffect, useReducer } from "react";
import { darkTheme } from "src/utils/theme";
import { appContext, initialState, reducer } from "src/utils/context";
import { ThemeToggle } from "src/components/ThemeToggle";
import { LoadingOverlay } from "src/components/LoadingOverlay";

const THEME_SETTING = 'reg:themeSetting';

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

const App = ({ Component, pageProps }: AppProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.theme === 'dark') {
      document.body.classList.add(darkTheme);
      return () => {
        document.body.classList.remove(darkTheme);
      }
    }
  }, [state.theme]);

  useEffect(() => {
    const themeSetting = localStorage.getItem(THEME_SETTING);
    if (themeSetting === 'dark' || themeSetting === 'default') {
      dispatch({ type: 'setTheme', theme: themeSetting });
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      dispatch({ type: 'setTheme', theme: 'dark' });
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = state.theme === 'default' ? 'dark' : 'default';
    localStorage.setItem(THEME_SETTING, newTheme)
    dispatch({ type: 'setTheme', theme: newTheme });
  }, [state.theme]) ;

  globalStyles();

  return (
    <Provider value={{
      ...state,
      dispatch,
    }}>
      <LoadingOverlay value={state.progres} active={state.isLoading} text="Fetching schedule..." />
      <Component {...pageProps} />
      <ThemeToggle state={state.theme} onClick={toggleTheme} />
    </Provider>
  )
}

export default App;