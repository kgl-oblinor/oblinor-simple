import React from 'react';
import Sidebar from './Sidebar';
import { THEME, getResponsive, getSidebarContentMargin } from '../constants/theme';
import { NavigationTab, NavigationTabChangeHandler } from '../types/navigation';
import { useSidebar } from '../context/SidebarContext';

interface LayoutProps {
  children: React.ReactNode;
  activeTab?: NavigationTab;
  onTabChange?: NavigationTabChangeHandler;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const { isMobile } = getResponsive();
  const { isOpen: sidebarOpen } = useSidebar();
  
  // 🎨 CLAUDE-STYLE CONTENT SHIFTING WITH AGENT 4's RESPONSIVE SYSTEM
  const contentStyle: React.CSSProperties = {
    marginLeft: getSidebarContentMargin(sidebarOpen),
    marginTop: isMobile ? '60px' : '0',
    padding: '20px',
    backgroundColor: THEME.colors.background,
    minHeight: '100vh',
    color: THEME.colors.primary,
    transition: THEME.transitions.sidebarContent,
    willChange: 'margin-left', // GPU acceleration hint
  };

  return (
    <>
      <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
      <div style={contentStyle}>
        {children}
      </div>
    </>
  );
};

export default Layout;