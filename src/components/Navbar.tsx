import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const Nav = styled.nav`
  background-color: ${props => props.theme.colors.background};
  height: ${props => props.theme.spacing.xl};
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 0 ${props => props.theme.spacing.lg};
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: ${props => props.theme.spacing.sm};
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const LogoImage = styled.img`
  height: 24px;
  width: auto;
  object-fit: contain;
  display: block;
  margin-right: ${props => props.theme.spacing.xs};
  filter: brightness(0) invert(1);
`;

const LogoText = styled.span`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.typography.h3};
  font-weight: bold;
  letter-spacing: 0.5px;
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
`;

const NavItem = styled(Link)<{ active?: boolean }>`
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
  text-decoration: none;
  font-size: ${props => props.theme.typography.body};
  transition: all 0.3s ease;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.sm};

  &:hover {
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.backgroundAlt};
  }
`;

const Navbar: React.FC = () => {
  const location = useLocation();
  const { theme } = useTheme();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Logo 加载失败');
    console.log('尝试的图片路径:', e.currentTarget.src);
    // 尝试使用相对路径
    if (e.currentTarget.src.includes('/images/')) {
      e.currentTarget.src = './images/logo-white.png';
    }
  };

  return (
    <Nav>
      <NavContainer>
        <LogoContainer to="/">
          <LogoImage 
            src={`${process.env.PUBLIC_URL}/images/logo-white.png`}
            alt="AGICOIN Logo" 
          />
          <LogoText>AGICOIN</LogoText>
        </LogoContainer>
        <NavMenu>
          <NavItem to="/" active={location.pathname === '/'}>Home</NavItem>
          <NavItem to="/market" active={location.pathname === '/market'}>Market</NavItem>
          <NavItem to="/exchange" active={location.pathname === '/exchange'}>Exchange</NavItem>
        </NavMenu>
      </NavContainer>
    </Nav>
  );
};

export default Navbar; 