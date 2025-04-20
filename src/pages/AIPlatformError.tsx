import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 16px;
`;

const ErrorInfo = styled.pre`
  background: #ffe0e0;
  padding: 12px;
  border-radius: 4px;
  white-space: pre-wrap;
  overflow-x: auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: #0069d9;
  }
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

// 测试组件
const TestComponent = styled.div`
  padding: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  margin-top: 8px;
`;

const AIPlatformError: React.FC = () => {
  const [errorDetails, setErrorDetails] = useState<string>('No errors detected');
  const [environment, setEnvironment] = useState<string>('');
  
  // 测试styled-components主题
  const testStyledComponents = () => {
    try {
      // 测试主题
      const TestThemedComponent = styled.div`
        color: ${({ theme }) => theme?.colors?.text || '#000'};
      `;
      setErrorDetails(prev => prev + '\n\nStyled-components test: Component created successfully');
      
      return <TestThemedComponent>这是一个测试组件</TestThemedComponent>;
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      setErrorDetails(prev => prev + '\n\nStyled-components error: ' + errorMessage);
      return null;
    }
  };
  
  // 测试基本环境
  const checkEnvironment = () => {
    const envInfo = {
      reactVersion: React.version,
      windowDefined: typeof window !== 'undefined',
      documentDefined: typeof document !== 'undefined',
      navigatorDefined: typeof navigator !== 'undefined',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'undefined'
    };
    
    setEnvironment(JSON.stringify(envInfo, null, 2));
  };
  
  // 测试React Icons
  const testReactIcons = async () => {
    try {
      setErrorDetails(prev => prev + '\n\nTesting react-icons...');
      const fa = await import('react-icons/fa');
      if (fa && typeof fa.FaCoins === 'function') {
        setErrorDetails(prev => prev + '\n\nReact-icons loaded successfully');
      } else {
        setErrorDetails(prev => prev + '\n\nReact-icons loaded but FaCoins is not a function');
      }
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      setErrorDetails(prev => prev + '\n\nReact-icons error: ' + errorMessage);
    }
  };
  
  useEffect(() => {
    try {
      // 初始检查环境
      checkEnvironment();
      
      // 尝试捕获全局错误
      const originalError = console.error;
      console.error = (...args) => {
        originalError(...args);
        const errorString = args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ');
        setErrorDetails(prev => prev + '\n\n' + errorString);
      };

      return () => {
        console.error = originalError;
      };
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      setErrorDetails('Error in diagnostic setup: ' + errorMessage);
    }
  }, []);

  return (
    <Container>
      <h1>AI Platform Error Diagnostics</h1>
      <p>This page helps diagnose runtime errors in the AIPlatform component.</p>
      
      <ButtonGroup>
        <Button onClick={testStyledComponents}>Test Styled Components</Button>
        <Button onClick={testReactIcons}>Test React Icons</Button>
        <Button onClick={checkEnvironment}>Check Environment</Button>
        <Button onClick={() => setErrorDetails('Log cleared')}>Clear Log</Button>
      </ButtonGroup>
      
      <Section>
        <h2>Environment Information</h2>
        <ErrorInfo>{environment}</ErrorInfo>
      </Section>
      
      <Section>
        <h2>Error Information</h2>
        <ErrorInfo>{errorDetails}</ErrorInfo>
      </Section>
      
      <Section>
        <h2>Test Component</h2>
        <TestComponent>
          {testStyledComponents()}
        </TestComponent>
      </Section>
    </Container>
  );
};

export default AIPlatformError; 