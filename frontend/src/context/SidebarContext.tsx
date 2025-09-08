import React, { createContext, useContext, useState, useEffect } from 'react';
import { getResponsive } from '../constants/theme';

interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 🎯 CLAUDE-STYLE DEFAULT: Start with false, then set correct state in useEffect
  const [isOpen, setIsOpen] = useState(false);
  
  // 📱 INITIAL STATE SETUP
  useEffect(() => {
    // Set initial state based on screen size (only once on mount)
    const { isMobile } = getResponsive();
    setIsOpen(!isMobile); // Open on desktop/tablet, closed on mobile
  }, []); // Empty dependency array - only run on mount

  // 📱 RESPONSIVE SYNC ON RESIZE
  useEffect(() => {
    const handleResize = () => {
      const { isMobile: currentIsMobile } = getResponsive();
      // Auto-open when switching from mobile to desktop/tablet
      if (!currentIsMobile && !isOpen) {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};