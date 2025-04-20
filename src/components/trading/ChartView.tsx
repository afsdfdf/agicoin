import React from 'react';
import styled from 'styled-components';

// 图表容器
const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1E222D;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  transform: scale(0.9);
  transform-origin: center center;
`;

interface ChartViewProps {
  pairId: string;
  pairName: string;
  symbol: string;
}

const AGI_POOL_ADDRESS = '0xa3b9d32f131e7283b2785acd91003cf76ed46aa5';
const GECKOTERMINAL_URL = `https://www.geckoterminal.com/bsc/pools/${AGI_POOL_ADDRESS}?embed=1&info=0&swaps=1&grayscale=0&light_chart=0&chart_type=price&resolution=15m`;

const ChartView: React.FC<ChartViewProps> = ({ pairId, pairName, symbol }) => {
  return (
    <ChartContainer>
      <Iframe
        id="geckoterminal-embed"
        title="GeckoTerminal Embed"
        src={GECKOTERMINAL_URL}
        allow="clipboard-write"
        allowFullScreen
      />
    </ChartContainer>
  );
};

export default ChartView; 