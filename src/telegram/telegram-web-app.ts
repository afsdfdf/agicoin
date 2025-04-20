// Telegram Web App 集成
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        close: () => void;
        expand: () => void;
        showPopup: (params: any) => void;
        showAlert: (message: string) => void;
        showConfirm: (message: string) => Promise<boolean>;
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
          };
          start_param?: string;
        };
        colorScheme: 'light' | 'dark';
        themeParams: {
          bg_color: string;
          text_color: string;
          hint_color: string;
          link_color: string;
          button_color: string;
          button_text_color: string;
          secondary_bg_color: string;
        };
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
        headerColor: string;
        backgroundColor: string;
        isClosingConfirmationEnabled: boolean;
        BackButton: {
          isVisible: boolean;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
        };
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          isProgressVisible: boolean;
          setText: (text: string) => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
          enable: () => void;
          disable: () => void;
          showProgress: (leaveActive: boolean) => void;
          hideProgress: () => void;
        };
        HapticFeedback: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
          selectionChanged: () => void;
        };
        enableClosingConfirmation: () => void;
        disableClosingConfirmation: () => void;
        onEvent: (eventType: string, eventHandler: () => void) => void;
        offEvent: (eventType: string, eventHandler: () => void) => void;
        sendData: (data: string) => void;
        openLink: (url: string) => void;
        openTelegramLink: (url: string) => void;
        setHeaderColor: (color: string) => void;
        setBackgroundColor: (color: string) => void;
      };
    };
  }
}

// 初始化 Telegram Web App
export const initTelegramWebApp = () => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.ready();
    return window.Telegram.WebApp;
  }
  return null;
};

// 获取 Telegram 用户信息
export const getTelegramUser = () => {
  if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
    return window.Telegram.WebApp.initDataUnsafe.user;
  }
  return null;
};

// 获取 Telegram 主题参数
export const getTelegramThemeParams = () => {
  if (window.Telegram?.WebApp?.themeParams) {
    return window.Telegram.WebApp.themeParams;
  }
  return null;
};

// 获取 Telegram 颜色方案
export const getTelegramColorScheme = () => {
  if (window.Telegram?.WebApp?.colorScheme) {
    return window.Telegram.WebApp.colorScheme;
  }
  return 'light';
};

// 显示 Telegram 弹窗
export const showTelegramPopup = (params: any) => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.showPopup(params);
  }
};

// 显示 Telegram 警告
export const showTelegramAlert = (message: string) => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.showAlert(message);
  }
};

// 显示 Telegram 确认框
export const showTelegramConfirm = (message: string): Promise<boolean> => {
  if (window.Telegram?.WebApp) {
    return window.Telegram.WebApp.showConfirm(message);
  }
  return Promise.resolve(false);
};

// 关闭 Telegram Web App
export const closeTelegramWebApp = () => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.close();
  }
};

// 扩展 Telegram Web App
export const expandTelegramWebApp = () => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.expand();
  }
};

// 设置 Telegram Web App 标题
export const setTelegramWebAppTitle = (title: string) => {
  if (window.Telegram?.WebApp) {
    document.title = title;
  }
};

// 设置 Telegram Web App 头部颜色
export const setTelegramWebAppHeaderColor = (color: string) => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.setHeaderColor(color);
  }
};

// 设置 Telegram Web App 背景颜色
export const setTelegramWebAppBackgroundColor = (color: string) => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.setBackgroundColor(color);
  }
};

// 启用 Telegram Web App 关闭确认
export const enableTelegramWebAppClosingConfirmation = () => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.enableClosingConfirmation();
  }
};

// 禁用 Telegram Web App 关闭确认
export const disableTelegramWebAppClosingConfirmation = () => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.disableClosingConfirmation();
  }
};

// 发送数据到 Telegram
export const sendDataToTelegram = (data: string) => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.sendData(data);
  }
};

// 打开 Telegram 链接
export const openTelegramLink = (url: string) => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.openTelegramLink(url);
  }
};

// 打开外部链接
export const openExternalLink = (url: string) => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.openLink(url);
  }
}; 