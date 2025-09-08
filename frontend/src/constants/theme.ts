/**
 * Oblinor Simple - Design System Constants
 * 
 * Shared constants for colors, breakpoints, and styling
 * Used throughout the application for consistent design
 */

export const THEME = {
  colors: {
    primary: '#123543',
    background: '#fcfbfa',
    error: '#ff6b6b',
    success: '#4CAF50',
    info: '#2196F3',
    warning: '#FF9800'
  },
  breakpoints: {
    mobile: 768
  },
  spacing: {
    sidebarWidth: '250px',
    borderRadius: '8px',
    touchTarget: '44px'
  },
  transitions: {
    default: 'all 0.2s ease',
    sidebar: 'left 0.3s ease',
    background: 'background-color 0.2s',
    sidebarContent: 'margin-left 0.3s ease'
  },
  sidebar: {
    widths: {
      mobile: '240px',
      tablet: '180px', 
      desktop: '200px',
      collapsed: '50px'
    },
    zIndices: {
      sidebar: 1000,
      backdrop: 999,
      mobileHeader: 1001
    }
  },
  animations: {
    duration: {
      standard: '0.3s'
    },
    easing: {
      materialStandard: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
    }
  }
} as const;

// Helper functions for responsive design
export const isMobile = () => window.innerWidth <= THEME.breakpoints.mobile;

// Responsive system - Agent 4's enhanced version
export const getResponsive = () => ({
  isMobile: window.innerWidth <= 768,
  isTablet: window.innerWidth > 768 && window.innerWidth <= 1024,
  isDesktop: window.innerWidth > 1024
});

// Sidebar content margin helper
export const getSidebarContentMargin = (sidebarOpen: boolean) => {
  const { isMobile } = getResponsive();
  if (isMobile) return '0';
  return sidebarOpen ? THEME.spacing.sidebarWidth : '60px';
};

// ALPHA_COLORS for transparent backgrounds
export const ALPHA_COLORS = {
  background: {
    subtle: 'rgba(252, 251, 250, 0.05)',
    light: 'rgba(252, 251, 250, 0.10)', 
    medium: 'rgba(252, 251, 250, 0.20)',
    strong: 'rgba(252, 251, 250, 0.30)'
  },
  primary: {
    subtle: 'rgba(18, 53, 67, 0.05)',
    light: 'rgba(18, 53, 67, 0.10)',
    medium: 'rgba(18, 53, 67, 0.20)', 
    strong: 'rgba(18, 53, 67, 0.30)'
  },
  error: {
    light: 'rgba(255, 107, 107, 0.10)'
  }
};

// Responsive spacing helper
export const getResponsiveSpacing = (mobile: string, desktop: string) => {
  const { isMobile } = getResponsive();
  return isMobile ? mobile : desktop;
};

// Typography system helpers  
export const getResponsiveTypography = (variant: 'h1' | 'h2' | 'h3' | 'body' | 'small' | 'caption') => {
  const { isMobile } = getResponsive();
  
  const typography = {
    h1: { fontSize: isMobile ? '24px' : '32px', fontWeight: 'bold', lineHeight: '1.2' },
    h2: { fontSize: isMobile ? '20px' : '24px', fontWeight: 'bold', lineHeight: '1.3' },
    h3: { fontSize: isMobile ? '18px' : '20px', fontWeight: '600', lineHeight: '1.4' },
    body: { fontSize: isMobile ? '14px' : '16px', fontWeight: 'normal', lineHeight: '1.5' },
    small: { fontSize: isMobile ? '12px' : '14px', fontWeight: 'normal', lineHeight: '1.4' },
    caption: { fontSize: isMobile ? '11px' : '12px', fontWeight: 'normal', lineHeight: '1.3' }
  };
  
  return typography[variant];
};

// Admin typography helper - returns object with all variants
export const getAdminTypography = () => {
  const { isMobile } = getResponsive();
  return {
    title: { fontSize: isMobile ? '24px' : '32px', fontWeight: 'bold', lineHeight: '1.2' },
    subtitle: { fontSize: isMobile ? '16px' : '18px', fontWeight: 'normal', lineHeight: '1.4' },
    h1: getResponsiveTypography('h1'),
    h2: getResponsiveTypography('h2'),
    h3: getResponsiveTypography('h3')
  };
};

// Responsive sidebar width helper
export const getResponsiveSidebarWidth = (isCollapsed?: boolean) => {
  const { isMobile, isTablet, isDesktop } = getResponsive();
  
  if (isCollapsed) return THEME.sidebar.widths.collapsed;
  
  if (isMobile) return THEME.sidebar.widths.mobile;
  if (isTablet) return THEME.sidebar.widths.tablet;
  return THEME.sidebar.widths.desktop;
};

// Type exports for TypeScript support
export type ThemeColors = typeof THEME.colors;
export type ThemeSpacing = typeof THEME.spacing;
export type ThemeBreakpoints = typeof THEME.breakpoints;