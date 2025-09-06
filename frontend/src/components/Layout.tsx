import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const contentStyle: React.CSSProperties = {
    marginLeft: window.innerWidth <= 768 ? '0' : '250px',
    marginTop: window.innerWidth <= 768 ? '60px' : '0',
    padding: '20px',
    backgroundColor: '#fcfbfa',
    minHeight: '100vh',
    color: '#123543',
    transition: window.innerWidth <= 768 ? 'none' : 'margin-left 0.3s ease',
  };

  return (
    <>
      <Sidebar />
      <div style={contentStyle}>
        {children}
      </div>
    </>
  );
};

export default Layout;