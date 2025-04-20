import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { TelegramThemeProvider } from './context/TelegramThemeContext';
import MobileLayout from './components/layout/MobileLayout';
import Home from './pages/Home';
import AIPlatform from './pages/AIPlatform';
import Staking from './pages/Staking';
import Games from './pages/Games';
import Trading from './pages/Trading';
import NFTMarketplace from './pages/NFTMarketplace';
import { theme } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <TelegramThemeProvider>
      <ThemeProvider theme={theme}>
        <MobileLayout>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ai-platform" element={<AIPlatform />} />
              <Route path="/staking" element={<Staking />} />
              <Route path="/games" element={<Games />} />
              <Route path="/trading" element={<Trading />} />
              <Route path="/nft" element={<NFTMarketplace />} />
            </Routes>
          </ErrorBoundary>
        </MobileLayout>
      </ThemeProvider>
    </TelegramThemeProvider>
  );
};

export default App;