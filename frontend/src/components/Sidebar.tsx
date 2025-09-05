import React from 'react';
import { useAuth } from '../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();

  const sidebarStyle: React.CSSProperties = {
    width: '250px',
    height: '100vh',
    backgroundColor: '#123543',
    color: '#fcfbfa',
    padding: '20px',
    position: 'fixed',
    left: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid rgba(252, 251, 250, 0.3)',
  };

  const headerStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '30px',
    borderBottom: '2px solid rgba(252, 251, 250, 0.3)',
    paddingBottom: '15px',
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

  const handleLogout = () => {
    logout();
  };

  return (
    <div style={sidebarStyle}>
      <div style={headerStyle}>
        Oblinor Simple
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
  );
};

export default Sidebar;