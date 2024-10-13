'use client'
import { createContext, ReactElement, useEffect, useState } from "react";
import Cookie from "js-cookie";

const ThemeContext = createContext({ isDarkTheme: true, toggleThemeHandler: () => {} });

interface ThemePropsInterface {
  children: JSX.Element | JSX.Element[];
}

export function ThemeContextProvider(props: ThemePropsInterface): ReactElement {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  function initializeTheme(): void {
    const storedTheme = Cookie.get("isDarkTheme");
    if (storedTheme === undefined) {
      Cookie.set("isDarkTheme", "true");
      setIsDarkTheme(true);
      document.body.classList.add("dark-mode");
    } else {
      const parsedTheme = JSON.parse(storedTheme);
      setIsDarkTheme(parsedTheme);
      if (parsedTheme) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    }
  }

  function toggleThemeHandler(): void {
    setIsDarkTheme((prevTheme) => {
      const newTheme = !prevTheme;
      Cookie.set("isDarkTheme", JSON.stringify(newTheme));
      document.body.classList.toggle("dark-mode", newTheme);
      return newTheme;
    });
  }

  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleThemeHandler }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;