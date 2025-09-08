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

// Type exports for TypeScript support<
export type ThemeColors = typeof THEME.colors;
export type ThemeSpacing = typeof THEME.spacing;
export type ThemeBreakpoints = typeof THEME.breakpoints;>