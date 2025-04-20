import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { getTelegramThemeParams, getTelegramColorScheme, isTelegramWebAppAvailable } from '../telegram/telegram-web-app';
import { theme as defaultTheme } from './ThemeContext';

// 创建 Telegram 主题
const createTelegramTheme = (telegramThemeParams: any, colorScheme: 'light' | 'dark') => {
  try {
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
  } catch (error) {
    console.error('Error creating Telegram theme:', error);
    return {
      ...defaultTheme,
      isDarkMode: colorScheme === 'dark',
    };
  }
};

type TelegramTheme = ReturnType<typeof createTelegramTheme>;

interface TelegramThemeContextType {
  theme: TelegramTheme;
  isDarkMode: boolean;
  toggleTheme: () => void;
  isTelegramAvailable: boolean;
}

const TelegramThemeContext = createContext<TelegramThemeContextType>({
  theme: createTelegramTheme(null, 'light'),
  isDarkMode: false,
  toggleTheme: () => {},
  isTelegramAvailable: false
});

export const useTelegramTheme = () => useContext(TelegramThemeContext);

export const TelegramThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTelegramAvailable, setIsTelegramAvailable] = useState(false);
  const telegramThemeParams = getTelegramThemeParams();
  const colorScheme = getTelegramColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
  const [theme, setTheme] = useState(() => createTelegramTheme(telegramThemeParams, colorScheme));

  useEffect(() => {
    // 检查是否在Telegram环境中运行
    setIsTelegramAvailable(isTelegramWebAppAvailable());
  }, []);

  useEffect(() => {
    try {
      setTheme(createTelegramTheme(telegramThemeParams, isDarkMode ? 'dark' : 'light'));
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  }, [isDarkMode, telegramThemeParams]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <TelegramThemeContext.Provider value={{ theme, isDarkMode, toggleTheme, isTelegramAvailable }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </TelegramThemeContext.Provider>
  );
}; 