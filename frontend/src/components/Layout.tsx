import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const contentStyle: React.CSSProperties = {
    marginLeft: '250px',
    padding: '20px',
    backgroundColor: '#fcfbfa',
    minHeight: '100vh',
    color: '#123543',
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