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
  const sidebarWidth = getResponsiveSidebarWidth(isOpen);

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

  // 🎨 PREMIUM SIDEBAR WITH SOPHISTICATED DESIGN
  const sidebarStyle: React.CSSProperties = {
    width: sidebarWidth,
    height: '100vh',
    background: `linear-gradient(180deg, ${THEME.colors.primary} 0%, rgba(18, 53, 67, 0.95) 100%)`,
    color: THEME.colors.background,
    padding: isOpen || !isMobile ? '20px 16px' : '10px 6px', // Reduced padding for thinner sidebar
    position: 'fixed',
    left: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    borderRight: `2px solid ${ALPHA_COLORS.background.medium}`,
    boxShadow: `4px 0 24px ${ALPHA_COLORS.primary.strong}, inset -1px 0 0 rgba(255,255,255,0.1)`,
    zIndex: THEME.sidebar.zIndices.sidebar,
    backdropFilter: 'blur(10px)',
    
    // 🚀 DIFFERENT ANIMATION FOR MOBILE VS DESKTOP
    ...(isMobile ? {
      // Mobile: Use transform for overlay behavior
      transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      transition: `transform ${THEME.animations.duration.standard} ${THEME.animations.easing.materialStandard}`,
      willChange: 'transform'
    } : {
      // Desktop/Tablet: Use width animation for collapsed state
      transition: `width ${THEME.animations.duration.standard} ${THEME.animations.easing.materialStandard}, padding ${THEME.animations.duration.standard} ease`,
      willChange: 'width',
      overflow: 'hidden'
    })
  };

  // 🎨 PREMIUM HEADER WITH SOPHISTICATED SPACING
  const headerStyle: React.CSSProperties = {
    marginBottom: '32px', // More breathing room
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: '8px', // Subtle top padding
    minHeight: '48px', // Consistent touch target zone
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

  // 🎨 CLEAN HAMBURGER TOGGLE BUTTON
  const toggleButtonStyle: React.CSSProperties = {
    display: isMobile ? 'none' : 'flex',
    background: 'transparent',
    border: 'none',
    color: THEME.colors.background,
    fontSize: '16px',
    fontWeight: '400',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
    width: '32px',
    height: '32px',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
  };

  // 🎨 CLEAN USER INFO WITHOUT BOXES
  const userInfoStyle: React.CSSProperties = {
    marginBottom: '24px', // Clean spacing
    padding: '0', // No padding - no box
    background: 'transparent', // No background
  };


  const navigationStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '20px',
  };

  const navButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '8px 16px', // Symmetric padding
    fontSize: '12px',
    fontWeight: isActive ? '600' : '500',
    backgroundColor: 'transparent', // No background boxes
    color: THEME.colors.background,
    border: 'none',
    cursor: 'pointer',
    textAlign: 'center', // Perfect center alignment
    transition: 'all 0.2s ease',
    minHeight: '32px', // Consistent height
    opacity: isActive ? 1 : 0.8,
    // No border line - removed completely
    letterSpacing: '0.1px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  });

  const logoutButtonStyle: React.CSSProperties = {
    marginTop: 'auto',
    padding: '8px 16px', // Symmetric padding matching nav buttons
    backgroundColor: 'transparent', // No background box
    border: 'none',
    color: THEME.colors.background,
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    opacity: 0.8,
    letterSpacing: '0.1px',
    textAlign: 'center', // Perfect center alignment
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '32px', // Same height as nav buttons
  };

  return (
    <>
      {/* Mobile Header */}
      <div style={mobileHeaderStyle}>
        <div style={{ width: '44px' }}></div>
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
              // 🎨 SIMPLE HOVER - JUST OPACITY
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.8';
            }}
          >
            ☰
          </button>
        </div>
        
        {user && (isOpen || isMobile) && (
          <div style={userInfoStyle}>
            {/* 🎨 PERFECT SYMMETRIC TYPOGRAPHY */}
            <div style={{ 
              fontSize: '12px', 
              fontWeight: '600', 
              marginBottom: '4px',
              color: THEME.colors.background,
              letterSpacing: '0.2px',
              textAlign: 'center', // Perfect center alignment
              width: '100%'
            }}>
              {user.name}
            </div>
            <div style={{ 
              fontSize: '11px', 
              opacity: 0.85, 
              marginBottom: '0',
              color: THEME.colors.background,
              letterSpacing: '0.1px',
              textAlign: 'center', // Perfect center alignment
              width: '100%'
            }}>
              {user.email}
            </div>
          </div>
        )}

        <div style={{ flex: 1 }}>
          {user && (isOpen || isMobile) && (
            <nav style={navigationStyle}>
              {user.role === 'ADMIN' ? (
                // Admin Navigation
                <>
                  <button
                    style={navButtonStyle(activeTab === 'users')}
                    onClick={() => onTabChange?.('users' as AdminTab)}
                    onMouseEnter={(e) => {
                      if (activeTab !== 'users') {
                        e.currentTarget.style.opacity = '1';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== 'users') {
                        e.currentTarget.style.opacity = '0.8';
                      }
                    }}
                  >
                    ◉ Users
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
                    ▣ Shareholders
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
                    ◆ Emissions
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
                    ▤ Subscriptions
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
                    ◈ Overview
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
                    ▣ Shareholders
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
                    ◆ Emissions
                  </button>
                </>
              )}
            </nav>
          )}
        </div>

        {(isOpen || isMobile) && (
          <button
            style={logoutButtonStyle}
            onClick={handleLogout}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.8';
            }}
          >
            ◁ Logout
          </button>
        )}
      </div>
    </>
  );
};

export default Sidebar;