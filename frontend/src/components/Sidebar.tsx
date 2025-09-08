import React from 'react';
import { useAuth } from '../context/AuthContext';
import { THEME, getResponsive, ALPHA_COLORS, getResponsiveTypography, getResponsiveSidebarWidth } from '../constants/theme';
import { NavigationTab, NavigationTabChangeHandler, UserTab, AdminTab } from '../types/navigation';
import { useSidebar } from '../context/SidebarContext';

interface SidebarProps {
  activeTab?: NavigationTab;
  onTabChange?: NavigationTabChangeHandler;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { user, logout } = useAuth();
  const { isMobile } = getResponsive(); // Agent 4's responsive system
  const { isOpen, setIsOpen, toggleSidebar } = useSidebar(); // Global sidebar state
  const sidebarWidth = getResponsiveSidebarWidth();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
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
    zIndex: THEME.sidebar.zIndices.mobileHeader,
    borderBottom: `1px solid ${ALPHA_COLORS.background.strong}`,
  };

  const hamburgerButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: THEME.colors.background,
    ...getResponsiveTypography('h2'),
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
    zIndex: THEME.sidebar.zIndices.backdrop,
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transition: `opacity ${THEME.animations.duration.standard}, visibility ${THEME.animations.duration.standard}`,
  };

  // 🎨 CLAUDE-STYLE SIDEBAR WITH AGENT 4's RESPONSIVE SYSTEM
  const sidebarStyle: React.CSSProperties = {
    width: sidebarWidth,
    height: '100vh',
    backgroundColor: THEME.colors.primary,
    color: THEME.colors.background,
    padding: '20px',
    position: 'fixed',
    left: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    borderRight: `1px solid ${ALPHA_COLORS.background.strong}`,
    zIndex: THEME.sidebar.zIndices.sidebar,
    
    // 🚀 CLAUDE-STYLE TRANSFORM ANIMATION (replaces left positioning)
    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: THEME.transitions.sidebar,
    willChange: 'transform', // GPU acceleration hint
  };

  const headerStyle: React.CSSProperties = {
    ...getResponsiveTypography('h2'),
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
    ...getResponsiveTypography('h2'),
    cursor: 'pointer',
    padding: '4px',
  };

  // 🎯 CLAUDE-STYLE DESKTOP TOGGLE BUTTON - Enhanced visibility
  const toggleButtonStyle: React.CSSProperties = {
    display: isMobile ? 'none' : 'flex',
    background: ALPHA_COLORS.background.light,
    border: `1px solid ${ALPHA_COLORS.background.medium}`,
    color: THEME.colors.background,
    ...getResponsiveTypography('h2'),
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    minWidth: '40px',
    minHeight: '40px',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const userInfoStyle: React.CSSProperties = {
    marginBottom: '30px',
    padding: '15px',
    backgroundColor: ALPHA_COLORS.background.light,
    borderRadius: '8px',
    ...getResponsiveTypography('caption'),
  };

  const levelBadgeStyle: React.CSSProperties = {
    display: 'inline-block',
    backgroundColor: THEME.colors.background,
    color: THEME.colors.primary,
    padding: '4px 8px',
    borderRadius: '12px',
    ...getResponsiveTypography('small'),
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
    ...getResponsiveTypography('body'),
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
    ...getResponsiveTypography('body'),
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
          
          {/* Mobile close button */}
          <button 
            style={closeButtonStyle}
            onClick={closeSidebar}
            aria-label="Close menu"
          >
            ✕
          </button>
          
          {/* Desktop/tablet toggle button */}
          <button 
            style={toggleButtonStyle}
            onClick={(e) => {
              e.preventDefault();
              console.log('🎯 Desktop toggle clicked! Current state:', isOpen);
              toggleSidebar();
            }}
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = ALPHA_COLORS.background.medium;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = ALPHA_COLORS.background.light;
            }}
          >
            {isOpen ? '‹' : '›'}
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