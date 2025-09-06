import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  // Mobile header styles
  const mobileHeaderStyle: React.CSSProperties = {
    display: window.innerWidth <= 768 ? 'flex' : 'none',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#123543',
    color: '#fcfbfa',
    padding: '15px 20px',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    borderBottom: '1px solid rgba(252, 251, 250, 0.3)',
  };

  const hamburgerButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: '#fcfbfa',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
  };

  const overlayStyle: React.CSSProperties = {
    display: window.innerWidth <= 768 ? 'block' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 998,
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transition: 'opacity 0.3s, visibility 0.3s',
  };

  // Desktop sidebar styles (original)
  const sidebarStyle: React.CSSProperties = {
    width: window.innerWidth <= 768 ? '280px' : '250px',
    height: '100vh',
    backgroundColor: '#123543',
    color: '#fcfbfa',
    padding: '20px',
    position: 'fixed',
    left: window.innerWidth <= 768 ? (isOpen ? 0 : '-280px') : 0,
    top: window.innerWidth <= 768 ? 0 : 0,
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid rgba(252, 251, 250, 0.3)',
    zIndex: 999,
    transition: window.innerWidth <= 768 ? 'left 0.3s ease' : 'none',
  };

  const headerStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '30px',
    borderBottom: '2px solid rgba(252, 251, 250, 0.3)',
    paddingBottom: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const closeButtonStyle: React.CSSProperties = {
    display: window.innerWidth <= 768 ? 'block' : 'none',
    background: 'none',
    border: 'none',
    color: '#fcfbfa',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '4px',
  };

  const userInfoStyle: React.CSSProperties = {
    marginBottom: '30px',
    padding: '15px',
    backgroundColor: 'rgba(252, 251, 250, 0.1)',
    borderRadius: '8px',
    fontSize: '14px',
  };

  const levelBadgeStyle: React.CSSProperties = {
    display: 'inline-block',
    backgroundColor: '#fcfbfa',
    color: '#123543',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
    marginTop: '8px',
  };

  const logoutButtonStyle: React.CSSProperties = {
    marginTop: 'auto',
    padding: '12px 16px',
    backgroundColor: 'rgba(252, 251, 250, 0.2)',
    border: '1px solid rgba(252, 251, 250, 0.3)',
    borderRadius: '8px',
    color: '#fcfbfa',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  };

  return (
    <>
      {/* Mobile Header */}
      <div style={mobileHeaderStyle}>
        <h1 style={{ margin: 0, fontSize: '20px' }}>Oblinor</h1>
        <button 
          style={hamburgerButtonStyle}
          onClick={toggleSidebar}
          aria-label="Open menu"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(252, 251, 250, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          ☰
        </button>
      </div>

      {/* Mobile Overlay */}
      <div 
        style={overlayStyle}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={headerStyle}>
          <span>Oblinor Simple</span>
          <button 
            style={closeButtonStyle}
            onClick={closeSidebar}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        
        {user && (
          <div style={userInfoStyle}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
              {user.name}
            </div>
            <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '8px' }}>
              {user.email}
            </div>
            <div style={levelBadgeStyle}>
              {user.role} Level {user.level}
            </div>
          </div>
        )}

        <div style={{ flex: 1 }}>
          {/* Navigation items would go here if needed */}
        </div>

        <button
          style={logoutButtonStyle}
          onClick={handleLogout}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(252, 251, 250, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(252, 251, 250, 0.2)';
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;