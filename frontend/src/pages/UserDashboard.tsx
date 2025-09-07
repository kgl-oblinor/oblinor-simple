import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { THEME, getResponsive, getResponsiveSpacing, ALPHA_COLORS, getResponsiveTypography } from '../constants/theme';
import Layout from '../components/Layout';
import ShareholderList from '../components/ShareholderList';
import EmissionList from '../components/EmissionList';
import EmissionView from '../components/EmissionView';
import BlurredContent from '../components/BlurredContent';
import { UserTab } from '../types/navigation';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const { isMobile } = getResponsive(); // Agent 4's responsive system
  const [activeTab, setActiveTab] = useState<UserTab>('overview');
  const [viewingEmission, setViewingEmission] = useState<number | null>(null);

  const headerStyle: React.CSSProperties = {
    marginBottom: '30px',
    padding: getResponsiveSpacing('15px', '20px'),
    backgroundColor: THEME.colors.primary,
    color: THEME.colors.background,
    borderRadius: '12px',
  };

  const titleStyle: React.CSSProperties = {
    ...getResponsiveTypography('h1'),
    margin: 0,
    marginBottom: '10px',
  };

  const subtitleStyle: React.CSSProperties = {
    ...getResponsiveTypography('body'),
    opacity: 0.8,
    margin: 0,
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '30px',
  };

  const accessInfoStyle: React.CSSProperties = {
    backgroundColor: THEME.colors.primary,
    color: THEME.colors.background,
    padding: getResponsiveSpacing('15px', '20px'),
    borderRadius: '12px',
    marginBottom: '20px',
  };

  const accessItemStyle: React.CSSProperties = {
    margin: '8px 0',
    padding: '8px 0',
    borderBottom: `1px solid ${ALPHA_COLORS.background.light}`,
    fontSize: isMobile ? '14px' : '16px',
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const getAccessDescription = () => {
    switch (user.level) {
      case 1:
        return "Everything is blurred - no access to any content";
      case 2:
        return "Can see shareholders list only";
      case 3:
        return "Full access + can subscribe to emissions";
      default:
        return "Unknown access level";
    }
  };


  const renderTabContent = () => {
    if (viewingEmission) {
      return (
        <EmissionView
          emissionId={viewingEmission}
          onClose={() => setViewingEmission(null)}
        />
      );
    }

    switch (activeTab) {
      case 'overview':
        return (
          <>
            <div style={accessInfoStyle}>
              <h3 style={{ 
                margin: '0 0 15px 0', 
                fontSize: isMobile ? '18px' : '20px', 
                fontWeight: 'bold' 
              }}>
                Your Access Level: {user.level}
              </h3>
              <div style={accessItemStyle}>
                <strong>Current Access:</strong> {getAccessDescription()}
              </div>
              <div style={accessItemStyle}>
                <strong>Level 1:</strong> Everything blurred (no access)
              </div>
              <div style={accessItemStyle}>
                <strong>Level 2:</strong> Can see shareholders list
              </div>
              <div style={{ ...accessItemStyle, borderBottom: 'none' }}>
                <strong>Level 3:</strong> Full access + can subscribe to emissions
              </div>
            </div>
            
            {user.level === 1 && (
              <div style={{ 
                marginTop: '30px', 
                padding: getResponsiveSpacing('20px', '30px'),
                backgroundColor: ALPHA_COLORS.primary.subtle, 
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <h3 style={{ 
                  color: THEME.colors.primary, 
                  marginBottom: '10px',
                  fontSize: isMobile ? '18px' : '20px'
                }}>Limited Access</h3>
                <p style={{ 
                  color: THEME.colors.primary,
                  fontSize: isMobile ? '14px' : '16px'
                }}>
                  Your account has Level 1 access. Content is restricted until an administrator upgrades your access level.
                </p>
              </div>
            )}
          </>
        );
      
      case 'shareholders':
        return (
          <BlurredContent
            requiredLevel={2}
            userLevel={user.level}
            userRole={user.role}
          >
            <ShareholderList />
          </BlurredContent>
        );
      
      case 'emissions':
        return (
          <BlurredContent
            requiredLevel={3}
            userLevel={user.level}
            userRole={user.role}
          >
            <EmissionList 
              onViewEmission={(id) => setViewingEmission(id)}
            />
          </BlurredContent>
        );
      
      default:
        return null;
    }
  };

  return (
    <Layout 
      activeTab={activeTab}
      onTabChange={(tab) => setActiveTab(tab as UserTab)}
    >
      <div style={headerStyle}>
        <h1 style={titleStyle}>Welcome, {user.name}</h1>
        <p style={subtitleStyle}>
          {user.role} - Level {user.level}
        </p>
      </div>

      <div style={sectionStyle}>
        {renderTabContent()}
      </div>
    </Layout>
  );
};

export default UserDashboard;