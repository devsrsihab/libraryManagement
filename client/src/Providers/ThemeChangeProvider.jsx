import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; // ES6

export const ThemeContext = createContext(null);

const ThemeChangeProvider = ({ children }) => {
  // 1. use theme from local storage if available or set light theme
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  // 2. update state on toggle
  const hanleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // 3. set theme state in localstorage on mount & also update localstorage on state change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localtheme = localStorage.getItem("theme");
    // add custom data-theme attribute to html tag required to update theme using DaisyUI
    document.querySelector("html").setAttribute("data-theme", localtheme);
  }, [theme]);

  // passing the data on context
  const themeInfo = {
    hanleToggle,
    theme,
  };


  return (
    <ThemeContext.Provider value={themeInfo}>{children}</ThemeContext.Provider>
  );
};

ThemeChangeProvider.propTypes = {
  children: PropTypes.node,
};

export default ThemeChangeProvider;
