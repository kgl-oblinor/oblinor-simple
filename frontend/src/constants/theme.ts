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

// 🚀 AGENT 4's RAF-ENHANCED RESPONSIVE SYSTEM (Building on Agent1's foundation)
let responsiveCache: {
  width: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  timestamp: number;
} | null = null;

let rafPending = false;

// 🎯 USER'S EXACT REQUIREMENT: { isMobile, isTablet, isDesktop } destructuring WITHOUT hooks
export const getResponsive = () => {
  const now = Date.now();
  const currentWidth = window.innerWidth;
  
  // Agent1's smart caching (100ms cache + 10px width threshold)
  if (responsiveCache && 
      now - responsiveCache.timestamp < 100 &&
      Math.abs(currentWidth - responsiveCache.width) < 10) {
    return { 
      isMobile: responsiveCache.isMobile, 
      isTablet: responsiveCache.isTablet, 
      isDesktop: responsiveCache.isDesktop 
    };
  }

  // Calculate breakpoints
  const isMobile = currentWidth <= THEME.breakpoints.mobile;
  const isTablet = currentWidth > THEME.breakpoints.mobile && currentWidth <= 1024;
  const isDesktop = currentWidth > 1024;

  // Agent 4's RAF optimization for smooth 60fps performance during resize
  if (!rafPending) {
    rafPending = true;
    requestAnimationFrame(() => {
      responsiveCache = { 
        width: currentWidth, 
        isMobile, 
        isTablet, 
        isDesktop, 
        timestamp: now 
      };
      rafPending = false;
    });
  }

  // Immediate fallback for synchronous usage
  return { isMobile, isTablet, isDesktop };
};

// 🎨 AGENT 4's SYSTEMATIC ALPHA COLOR SYSTEM
export const ALPHA_COLORS = {
  background: {
    subtle: 'rgba(252, 251, 250, 0.05)',   // 5% - Very light backgrounds
    light: 'rgba(252, 251, 250, 0.1)',     // 10% - Standard card backgrounds  
    medium: 'rgba(252, 251, 250, 0.2)',    // 20% - Border highlights
    strong: 'rgba(252, 251, 250, 0.3)'     // 30% - Emphasis backgrounds
  },
  primary: {
    subtle: 'rgba(18, 53, 67, 0.05)',      // 5% - Very light primary tint
    light: 'rgba(18, 53, 67, 0.1)',        // 10% - Light primary backgrounds 
    medium: 'rgba(18, 53, 67, 0.2)',       // 20% - Medium primary accents
    strong: 'rgba(18, 53, 67, 0.3)'        // 30% - Strong primary emphasis
  },
  error: {
    light: 'rgba(255, 107, 107, 0.1)'      // 10% - Error state backgrounds
  }
} as const;

// 📝 AGENT 4's COMPLETE RESPONSIVE TYPOGRAPHY SYSTEM
export const RESPONSIVE_TYPOGRAPHY = {
  h1: {
    mobile: '24px',    // AdminDashboard mobile fix
    desktop: '32px',   // Current AdminDashboard desktop size
    weight: 'bold' as const,
    lineHeight: '1.2'
  },
  h2: {
    mobile: '20px',
    desktop: '24px',
    weight: 'bold' as const,
    lineHeight: '1.3'
  },
  h3: {
    mobile: '18px',
    desktop: '20px',
    weight: '600' as const,
    lineHeight: '1.4'
  },
  body: {
    mobile: '16px',    
    desktop: '18px',   
    weight: 'normal' as const,
    lineHeight: '1.5'
  },
  caption: {
    mobile: '14px',
    desktop: '16px',
    weight: 'normal' as const,
    lineHeight: '1.4'
  },
  small: {
    mobile: '12px',
    desktop: '14px',
    weight: 'normal' as const,
    lineHeight: '1.3'
  }
} as const;

// 🎨 AGENT1's MINIMAL TYPOGRAPHY FIX - Maintained for backward compatibility
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

// 🔧 AGENT 4's UTILITY FUNCTIONS
export const getResponsiveTypography = (variant: keyof typeof RESPONSIVE_TYPOGRAPHY) => {
  const { isMobile } = getResponsive();
  const scale = RESPONSIVE_TYPOGRAPHY[variant];
  return {
    fontSize: isMobile ? scale.mobile : scale.desktop,
    fontWeight: scale.weight,
    lineHeight: scale.lineHeight
  };
};

export const getResponsiveSpacing = (mobile: string, desktop: string) => {
  const { isMobile } = getResponsive();
  return isMobile ? mobile : desktop;
};

// Type exports for TypeScript support
export type ThemeColors = typeof THEME.colors;
export type ThemeSpacing = typeof THEME.spacing;
export type ThemeBreakpoints = typeof THEME.breakpoints;
export type ResponsiveState = ReturnType<typeof getResponsive>;
export type AdminTypography = ReturnType<typeof getAdminTypography>;

// AGENT 4's Enhanced Type Definitions
export type AlphaColorGroup = keyof typeof ALPHA_COLORS;
export type AlphaLevel = keyof typeof ALPHA_COLORS.background;
export type TypographyVariant = keyof typeof RESPONSIVE_TYPOGRAPHY;
export type ResponsiveTypography = ReturnType<typeof getResponsiveTypography>;