import React from 'react';
import Sidebar from './Sidebar';
import { THEME, isMobile } from '../constants/theme';
import { NavigationTab, NavigationTabChangeHandler } from '../types/navigation';

interface LayoutProps {
  children: React.ReactNode;
  activeTab?: NavigationTab;
  onTabChange?: NavigationTabChangeHandler;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const contentStyle: React.CSSProperties = {
    marginLeft: isMobile() ? '0' : THEME.spacing.sidebarWidth,
    marginTop: isMobile() ? '60px' : '0',
    padding: '20px',
    backgroundColor: THEME.colors.background,
    minHeight: '100vh',
    color: THEME.colors.primary,
    transition: isMobile() ? 'none' : THEME.transitions.sidebar,
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