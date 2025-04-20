import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { getTelegramThemeParams, getTelegramColorScheme } from '../telegram/telegram-web-app';
import { theme as defaultTheme } from './ThemeContext';

// 创建 Telegram 主题
const createTelegramTheme = (telegramThemeParams: any, colorScheme: 'light' | 'dark') => {
  return {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: telegramThemeParams?.button_color || defaultTheme.colors.primary,
      secondary: telegramThemeParams?.link_color || defaultTheme.colors.secondary,
      background: telegramThemeParams?.bg_color || defaultTheme.colors.background,
      backgroundAlt: telegramThemeParams?.secondary_bg_color || defaultTheme.colors.backgroundAlt,
      text: telegramThemeParams?.text_color || defaultTheme.colors.text,
      textSecondary: telegramThemeParams?.hint_color || defaultTheme.colors.textSecondary,
      button: telegramThemeParams?.button_color || defaultTheme.colors.primary,
      buttonText: telegramThemeParams?.button_text_color || defaultTheme.colors.background,
    },
    isDarkMode: colorScheme === 'dark',
  };
};

type TelegramTheme = ReturnType<typeof createTelegramTheme>;

interface TelegramThemeContextType {
  theme: TelegramTheme;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const TelegramThemeContext = createContext<TelegramThemeContextType>({
  theme: createTelegramTheme(null, 'light'),
  isDarkMode: false,
  toggleTheme: () => {},
});

export const useTelegramTheme = () => useContext(TelegramThemeContext);

export const TelegramThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const telegramThemeParams = getTelegramThemeParams();
  const colorScheme = getTelegramColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
  const [theme, setTheme] = useState(() => createTelegramTheme(telegramThemeParams, colorScheme));

  useEffect(() => {
    setTheme(createTelegramTheme(telegramThemeParams, isDarkMode ? 'dark' : 'light'));
  }, [isDarkMode, telegramThemeParams]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <TelegramThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </TelegramThemeContext.Provider>
  );
}; 