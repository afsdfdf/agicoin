import React from 'react';
import styled from 'styled-components';

// 交易视图容器
const TradingViewContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

// iframe 容器
const IframeContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

// iframe
const TradingIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

interface TradingViewProps {
  url: string;
  title: string;
}

const TradingView: React.FC<TradingViewProps> = ({ url, title }) => {
  return (
    <TradingViewContainer>
      <IframeContainer>
        <TradingIframe 
          src={url} 
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </IframeContainer>
    </TradingViewContainer>
  );
};

export default TradingView; 