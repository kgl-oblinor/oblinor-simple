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
    background: 'background-color 0.2s'
  }
} as const;

// Helper functions for responsive design
export const isMobile = () => window.innerWidth <= THEME.breakpoints.mobile;

// 🧠 AGENT1's SMART CACHING SYSTEM (Agent 2's best idea)
let responsiveCache: {
  width: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  timestamp: number;
} | null = null;

// 🎯 USER'S EXACT REQUIREMENT: { isMobile, isTablet, isDesktop } destructuring WITHOUT hooks
export const getResponsive = () => {
  const now = Date.now();
  const currentWidth = window.innerWidth;
  
  // Agent 2's performance optimization: 100ms cache + width threshold
  if (responsiveCache && 
      now - responsiveCache.timestamp < 100 &&
      Math.abs(currentWidth - responsiveCache.width) < 10) {
    return { 
      isMobile: responsiveCache.isMobile, 
      isTablet: responsiveCache.isTablet, 
      isDesktop: responsiveCache.isDesktop 
    };
  }

  // Agent 3's mathematical breakpoint precision
  const isMobile = currentWidth <= 768;
  const isTablet = currentWidth > 768 && currentWidth <= 1024;
  const isDesktop = currentWidth > 1024;

  // Cache for performance
  responsiveCache = { width: currentWidth, isMobile, isTablet, isDesktop, timestamp: now };
  
  return { isMobile, isTablet, isDesktop };
};

// 🎨 AGENT4's MINIMAL TYPOGRAPHY FIX - Only what's needed for AdminDashboard
export const getAdminTypography = () => {
  const { isMobile } = getResponsive();
  return {
    title: { 
      fontSize: isMobile ? '24px' : '32px',  // Matches UserDashboard exactly
      fontWeight: 'bold' as const 
    },
    subtitle: { 
      fontSize: isMobile ? '16px' : '18px',  // Perfect mobile scaling
      opacity: 0.8 
    }
  };
};

// Type exports for TypeScript support
export type ThemeColors = typeof THEME.colors;
export type ThemeSpacing = typeof THEME.spacing;
export type ThemeBreakpoints = typeof THEME.breakpoints;
export type ResponsiveState = ReturnType<typeof getResponsive>;
export type AdminTypography = ReturnType<typeof getAdminTypography>;