import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import TradingView from '../components/trading/TradingView';
import ChartView from '../components/trading/ChartView';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #1E222D;
  color: #fff;
`;

const Header = styled.div`
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const TokenPairs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

interface TokenPairButtonProps {
  active: boolean;
}

const TokenPairButton = styled.button<TokenPairButtonProps>`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background-color: ${props => props.active ? '#0066FF' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.active ? '#fff' : 'rgba(255, 255, 255, 0.8)'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background-color: ${props => props.active ? '#0066FF' : 'rgba(255, 255, 255, 0.15)'};
  }
`;

const ChartContainer = styled.div`
  flex: 1;
  min-height: 0;
  padding: 16px;
`;

const TokenInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
`;

const TokenPrice = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

const PriceChange = styled.div<{ positive: boolean }>`
  color: ${props => props.positive ? '#26a69a' : '#ef5350'};
  font-size: 14px;
  font-weight: 500;
`;

interface TokenPair {
  id: string;
  name: string;
  symbol: string;
  price: string;
  change24h: number;
}

const tokenPairs: TokenPair[] = [
  { id: 'agi-usdt', name: 'AGI/USDT', symbol: 'AGI', price: '0.1234', change24h: 5.67 },
  { id: 'eth-usdt', name: 'ETH/USDT', symbol: 'ETH', price: '3456.78', change24h: -2.34 },
  { id: 'btc-usdt', name: 'BTC/USDT', symbol: 'BTC', price: '45678.90', change24h: 1.23 },
];

const Trading: React.FC = () => {
  const { theme } = useTheme();
  const [selectedPair, setSelectedPair] = useState<TokenPair>(tokenPairs[0]);

  return (
    <Container>
      <Header>
        <TokenPairs>
          {tokenPairs.map(pair => (
            <TokenPairButton
              key={pair.id}
              active={selectedPair.id === pair.id}
              onClick={() => setSelectedPair(pair)}
            >
              {pair.name}
            </TokenPairButton>
          ))}
        </TokenPairs>
        <TokenInfo>
          <TokenPrice>${selectedPair.price}</TokenPrice>
          <PriceChange positive={selectedPair.change24h > 0}>
            {selectedPair.change24h > 0 ? '+' : ''}{selectedPair.change24h}%
          </PriceChange>
        </TokenInfo>
      </Header>
      <ChartContainer>
        <ChartView
          pairId={selectedPair.id}
          pairName={selectedPair.name}
          symbol={selectedPair.symbol}
        />
      </ChartContainer>
    </Container>
  );
};

export default Trading;

 