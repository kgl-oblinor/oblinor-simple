1/**
 * Navigation Types for Oblinor Simple Platform
 * 
 * Shared type definitions for tab navigation across User and Admin dashboards
 */

// User dashboard navigation tabs
export type UserTab = 'overview' | 'shareholders' | 'emissions';

// Admin dashboard navigation tabs
export type AdminTab = 'users' | 'shareholders' | 'emissions' | 'subscriptions';

// Union type for all possible navigation tabs
export type NavigationTab = UserTab | AdminTab;

// Tab change handler types
export type UserTabChangeHandler = (tab: UserTab) => void;
export type AdminTabChangeHandler = (tab: AdminTab) => void;
export type NavigationTabChangeHandler = (tab: NavigationTab) => void;

// Type guards for runtime type checking
export const isUserTab = (tab: NavigationTab): tab is UserTab => {
  return ['overview', 'shareholders', 'emissions'].includes(tab);
};

export const isAdminTab = (tab: NavigationTab): tab is AdminTab => {
  return ['users', 'shareholders', 'emissions', 'subscriptions'].includes(tab);
};