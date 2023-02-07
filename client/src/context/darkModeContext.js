import React, { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({children}) => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem('darkMode')) || false
  );  // this returns a string...so we need to use json parse to return a boolean

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return(
    <DarkModeContext.Provider value={{ darkMode , toggleDarkMode }} >
      {children}
    </DarkModeContext.Provider>
  );
};