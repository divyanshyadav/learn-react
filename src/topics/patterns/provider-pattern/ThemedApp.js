import React from 'react';
import { ThemeProvider, useThemeContext } from './theme-context';

const messages = [
  { id: 1, text: 'Hello' },
  { id: 2, text: 'World' }
];

export default function ThemedApp() {
  return (
    <ThemeProvider>
      <Header />
      <List items={messages} />
    </ThemeProvider>
  );
}

function Header() {
  const { toggleTheme } = useThemeContext();

  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

function List({ items }) {
  const { theme } = useThemeContext();

  return (
    <ul
      style={{
        background: theme.background,
        color: theme.color
      }}
    >
      {items.map((item) => (
        <li id={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}
