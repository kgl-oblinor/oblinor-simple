import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { THEME, getResponsive, ALPHA_COLORS } from '../constants/theme';
import { NavigationTab, NavigationTabChangeHandler, UserTab, AdminTab } from '../types/navigation';

interface SidebarProps {
  activeTab?: NavigationTab;
  onTabChange?: NavigationTabChangeHandler;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { user, logout } = useAuth();
  const { isMobile } = getResponsive(); // Agent 4's responsive system
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
    display: isMobile ? 'flex' : 'none',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: THEME.colors.primary,
    color: THEME.colors.background,
    padding: '15px 20px',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    borderBottom: `1px solid ${ALPHA_COLORS.background.strong}`,
  };

  const hamburgerButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: THEME.colors.background,
    fontSize: '24px',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
  };

  const overlayStyle: React.CSSProperties = {
    display: isMobile ? 'block' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: ALPHA_COLORS.primary.strong,
    zIndex: 998,
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transition: 'opacity 0.3s, visibility 0.3s',
  };

  // Desktop sidebar styles (original)
  const sidebarStyle: React.CSSProperties = {
    width: isMobile ? '280px' : THEME.spacing.sidebarWidth,
    height: '100vh',
    backgroundColor: THEME.colors.primary,
    color: THEME.colors.background,
    padding: '20px',
    position: 'fixed',
    left: isMobile ? (isOpen ? 0 : '-280px') : 0,
    top: isMobile ? 0 : 0,
    display: 'flex',
    flexDirection: 'column',
    borderRight: `1px solid ${ALPHA_COLORS.background.strong}`,
    zIndex: 999,
    transition: isMobile ? THEME.transitions.sidebar : 'none',
  };

  const headerStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '30px',
    borderBottom: `2px solid ${ALPHA_COLORS.background.strong}`,
    paddingBottom: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const closeButtonStyle: React.CSSProperties = {
    display: isMobile ? 'block' : 'none',
    background: 'none',
    border: 'none',
    color: THEME.colors.background,
    fontSize: '24px',
    cursor: 'pointer',
    padding: '4px',
  };

  const userInfoStyle: React.CSSProperties = {
    marginBottom: '30px',
    padding: '15px',
    backgroundColor: ALPHA_COLORS.background.light,
    borderRadius: '8px',
    fontSize: '14px',
  };

  const levelBadgeStyle: React.CSSProperties = {
    display: 'inline-block',
    backgroundColor: THEME.colors.background,
    color: THEME.colors.primary,
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
    marginTop: '8px',
  };

  const navigationStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '20px',
  };

  const navButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '12px 16px',
    fontSize: '16px',
    fontWeight: isActive ? 'bold' : 'normal',
    backgroundColor: isActive ? ALPHA_COLORS.background.medium : 'transparent',
    color: THEME.colors.background,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s ease',
    minHeight: '44px',
    borderLeft: isActive ? `3px solid ${THEME.colors.background}` : '3px solid transparent',
  });

  const logoutButtonStyle: React.CSSProperties = {
    marginTop: 'auto',
    padding: '12px 16px',
    backgroundColor: ALPHA_COLORS.background.medium,
    border: `1px solid ${ALPHA_COLORS.background.strong}`,
    borderRadius: '8px',
    color: THEME.colors.background,
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
            e.currentTarget.style.backgroundColor = ALPHA_COLORS.background.light;
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
          {user && (
            <nav style={navigationStyle}>
              {user.role === 'ADMIN' ? (
                // Admin Navigation
                <>
                  <button
                    style={navButtonStyle(activeTab === 'users')}
                    onClick={() => onTabChange?.('users' as AdminTab)}
                    onMouseEnter={(e) => {
                      if (activeTab !== 'users') {
                        e.currentTarget.style.backgroundColor = ALPHA_COLORS.background.light;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== 'users') {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    Users
                  </button>
                  <button
                    style={navButtonStyle(activeTab === 'shareholders')}
                    onClick={() => onTabChange?.('shareholders' as AdminTab)}
                    onMouseEnter={(e) => {
                      if (activeTab !== 'shareholders') {
                        e.currentTarget.style.backgroundColor = ALPHA_COLORS.background.light;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== 'shareholders') {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    Shareholders
                  </button>
                  <button
                    style={navButtonStyle(activeTab === 'emissions')}
                    onClick={() => onTabChange?.('emissions' as AdminTab)}
                    onMouseEnter={(e) => {
                      if (activeTab !== 'emissions') {
                        e.currentTarget.style.backgroundColor = ALPHA_COLORS.background.light;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== 'emissions') {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    Emissions
                  </button>
                  <button
                    style={navButtonStyle(activeTab === 'subscriptions')}
                    onClick={() => onTabChange?.('subscriptions' as AdminTab)}
                    onMouseEnter={(e) => {
                      if (activeTab !== 'subscriptions') {
                        e.currentTarget.style.backgroundColor = ALPHA_COLORS.background.light;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== 'subscriptions') {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    Subscriptions
                  </button>
                </>
              ) : (
                // User Navigation
                <>
                  <button
                    style={navButtonStyle(activeTab === 'overview')}
                    onClick={() => onTabChange?.('overview' as UserTab)}
                    onMouseEnter={(e) => {
                      if (activeTab !== 'overview') {
                        e.currentTarget.style.backgroundColor = ALPHA_COLORS.background.light;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== 'overview') {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    Overview
                  </button>
                  <button
                    style={navButtonStyle(activeTab === 'shareholders')}
                    onClick={() => onTabChange?.('shareholders' as UserTab)}
                    onMouseEnter={(e) => {
                      if (activeTab !== 'shareholders') {
                        e.currentTarget.style.backgroundColor = ALPHA_COLORS.background.light;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== 'shareholders') {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    Shareholders
                  </button>
                  <button
                    style={navButtonStyle(activeTab === 'emissions')}
                    onClick={() => onTabChange?.('emissions' as UserTab)}
                    onMouseEnter={(e) => {
                      if (activeTab !== 'emissions') {
                        e.currentTarget.style.backgroundColor = ALPHA_COLORS.background.light;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== 'emissions') {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    Emissions
                  </button>
                </>
              )}
            </nav>
          )}
        </div>

        <button
          style={logoutButtonStyle}
          onClick={handleLogout}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = ALPHA_COLORS.background.strong;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = ALPHA_COLORS.background.medium;
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;