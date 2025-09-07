import React from 'react';
import { BlurredContentProps } from '../types';
import { THEME, ALPHA_COLORS, getResponsiveTypography } from '../constants/theme';

const BlurredContent: React.FC<BlurredContentProps> = ({
  children,
  requiredLevel,
  userLevel,
  userRole,
  adminOnly = false,
}) => {
  const hasAccess = () => {
    // Admin override
    if (userRole === 'ADMIN' && !adminOnly) {
      return true;
    }
    
    // Admin only check
    if (adminOnly && userRole !== 'ADMIN') {
      return false;
    }
    
    // Level check
    return userLevel >= requiredLevel;
  };

  const shouldBlur = !hasAccess();

  const containerStyle: React.CSSProperties = {
    position: 'relative',
  };

  const contentStyle: React.CSSProperties = {
    filter: shouldBlur ? 'blur(5px)' : 'none',
    pointerEvents: shouldBlur ? 'none' : 'auto',
    userSelect: shouldBlur ? 'none' : 'auto',
    transition: 'filter 0.3s ease',
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: shouldBlur ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ALPHA_COLORS.background.medium,
    color: THEME.colors.primary,
    ...getResponsiveTypography('body'),
    fontWeight: 'bold',
    zIndex: 10,
    borderRadius: THEME.spacing.borderRadius,
  };

  const getAccessMessage = () => {
    if (adminOnly && userRole !== 'ADMIN') {
      return 'Admin access required';
    }
    return `Access level ${requiredLevel} required (Your level: ${userLevel})`;
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {children}
      </div>
      {shouldBlur && (
        <div style={overlayStyle}>
          {getAccessMessage()}
        </div>
      )}
    </div>
  );
};

export default BlurredContent;