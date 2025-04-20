import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

// 图标组件
const Icon = styled.span`
  font-size: 1.5rem;
  margin-right: ${props => props.theme.spacing.sm};
`;

// 移动端布局容器
const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`;

// 主内容区域
const MainContent = styled.main<{ isSidebarOpen: boolean }>`
  flex: 1;
  padding: ${props => props.theme.spacing.md};
  margin-left: ${props => props.isSidebarOpen ? '250px' : '0'};
  transition: margin-left 0.3s ease;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding-bottom: 70px; // 为底部导航留出空间
  }
`;

// 侧边栏
const Sidebar = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  background-color: ${props => props.theme.colors.backgroundAlt};
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    width: 80%;
  }
`;

// 侧边栏头部
const SidebarHeader = styled.div`
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

// 侧边栏标题
const SidebarTitle = styled.h2`
  margin: 0;
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.typography.h4};
`;

// 关闭按钮
const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  padding: 0;
`;

// 侧边栏菜单
const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// 侧边栏菜单项
const SidebarMenuItem = styled.li<{ active?: boolean }>`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${props => props.active ? props.theme.colors.background : 'transparent'};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
  border-left: 3px solid ${props => props.active ? props.theme.colors.primary : 'transparent'};
  
  &:hover {
    background-color: ${props => props.theme.colors.background};
  }
`;

// 遮罩层
const Overlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${props => props.isVisible ? 1 : 0};
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 999;
`;

// 顶部导航栏
const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.background};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

// 菜单按钮
const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
`;

// 页面标题
const PageTitle = styled.h1`
  margin: 0;
  font-size: ${props => props.theme.typography.h5};
  color: ${props => props.theme.colors.text};
`;

// 底部导航
const BottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  background-color: ${props => props.theme.colors.background};
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  padding: ${props => props.theme.spacing.sm} 0;
  z-index: 100;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

// 底部导航项
const BottomNavItem = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.spacing.sm};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.textSecondary};
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

// 底部导航图标
const BottomNavIcon = styled.span`
  font-size: 1.5rem;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

// 底部导航文本
const BottomNavText = styled.span`
  font-size: ${props => props.theme.typography.small};
`;

// 导航项数据
const navItems = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/ai-platform', label: 'AI投资', icon: '🤖' },
  { path: '/staking', label: '质押挖矿', icon: '💰' },
  { path: '/games', label: '小游戏', icon: '🎮' },
  { path: '/trading', label: '交易', icon: '📈' },
  { path: '/nft', label: 'NFT', icon: '🖼️' },
];

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  
  const handleNavigation = (path: string) => {
    navigate(path);
    closeSidebar();
  };
  
  // 获取当前页面标题
  const getPageTitle = () => {
    const currentItem = navItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.label : 'AGICOIN';
  };
  
  return (
    <LayoutContainer>
      <TopBar>
        <MenuButton onClick={toggleSidebar}>☰</MenuButton>
        <PageTitle>{getPageTitle()}</PageTitle>
        <div style={{ width: '24px' }}></div> {/* 占位符，保持标题居中 */}
      </TopBar>
      
      <Sidebar isOpen={isSidebarOpen}>
        <SidebarHeader>
          <SidebarTitle>AGICOIN</SidebarTitle>
          <CloseButton onClick={closeSidebar}>×</CloseButton>
        </SidebarHeader>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem 
              key={item.path} 
              active={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
            >
              <Icon>{item.icon}</Icon>
              {item.label}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </Sidebar>
      
      <Overlay isVisible={isSidebarOpen} onClick={closeSidebar} />
      
      <MainContent isSidebarOpen={isSidebarOpen}>
        {children}
      </MainContent>
      
      <BottomNav>
        {navItems.map((item) => (
          <BottomNavItem 
            key={item.path} 
            active={location.pathname === item.path}
            onClick={() => handleNavigation(item.path)}
          >
            <BottomNavIcon>{item.icon}</BottomNavIcon>
            <BottomNavText>{item.label}</BottomNavText>
          </BottomNavItem>
        ))}
      </BottomNav>
    </LayoutContainer>
  );
};

export default MobileLayout; 