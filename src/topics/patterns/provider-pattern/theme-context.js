import React, { useContext, useState } from 'react';

const themes = {
  light: {
    background: 'white',
    color: 'black'
  },
  dark: {
    background: 'black',
    color: 'white'
  }
};

const ThemeContext = React.createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider
      value={{
        theme: themes[theme],
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }

  return theme;
}
