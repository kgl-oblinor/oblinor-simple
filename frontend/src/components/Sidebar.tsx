import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false); // Close mobile menu after logout
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className={styles.mobileHeader}>
        <h1 className={styles.mobileTitle}>Oblinor</h1>
        <button 
          className={styles.hamburgerButton}
          onClick={toggleSidebar}
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Overlay */}
      <div 
        className={`${styles.overlay} ${isOpen ? styles.visible : ''}`}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <span>Oblinor Simple</span>
          <button 
            className={styles.closeButton}
            onClick={closeSidebar}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        
        {user && (
          <div className={styles.userInfo}>
            <div className={styles.userName}>
              {user.name}
            </div>
            <div className={styles.userEmail}>
              {user.email}
            </div>
            <div className={styles.levelBadge}>
              {user.role} Level {user.level}
            </div>
          </div>
        )}

        <div className={styles.navigation}>
          {/* Navigation items would go here if needed */}
        </div>

        <button
          className={styles.logoutButton}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;