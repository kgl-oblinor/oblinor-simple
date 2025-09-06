import React from 'react';
import Sidebar from './Sidebar';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Layout;