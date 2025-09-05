import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import ShareholderList from '../components/ShareholderList';
import EmissionList from '../components/EmissionList';
import EmissionView from '../components/EmissionView';
import BlurredContent from '../components/BlurredContent';

type UserTab = 'overview' | 'shareholders' | 'emissions';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<UserTab>('overview');
  const [viewingEmission, setViewingEmission] = useState<number | null>(null);

  const headerStyle: React.CSSProperties = {
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: '#123543',
    color: '#fcfbfa',
    borderRadius: '12px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 'bold',
    margin: 0,
    marginBottom: '10px',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '18px',
    opacity: 0.8,
    margin: 0,
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '30px',
  };

  const accessInfoStyle: React.CSSProperties = {
    backgroundColor: '#123543',
    color: '#fcfbfa',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '20px',
  };

  const accessItemStyle: React.CSSProperties = {
    margin: '8px 0',
    padding: '8px 0',
    borderBottom: '1px solid rgba(252, 251, 250, 0.2)',
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

  const tabStyle: React.CSSProperties = {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    borderBottom: '2px solid #123543',
    paddingBottom: '10px',
  };

  const tabButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: isActive ? 'bold' : 'normal',
    backgroundColor: isActive ? '#123543' : '#fcfbfa',
    color: isActive ? '#fcfbfa' : '#123543',
    border: `2px solid #123543`,
    borderRadius: '8px 8px 0 0',
    cursor: 'pointer',
    transition: 'all 0.2s',
  });

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
              <h3 style={{ margin: '0 0 15px 0', fontSize: '20px', fontWeight: 'bold' }}>
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
                padding: '30px', 
                backgroundColor: 'rgba(18, 53, 67, 0.05)', 
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#123543', marginBottom: '10px' }}>Limited Access</h3>
                <p style={{ color: '#123543' }}>
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
    <Layout>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Welcome, {user.name}</h1>
        <p style={subtitleStyle}>
          {user.role} - Level {user.level}
        </p>
      </div>

      <div style={tabStyle}>
        <button
          style={tabButtonStyle(activeTab === 'overview')}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          style={tabButtonStyle(activeTab === 'shareholders')}
          onClick={() => setActiveTab('shareholders')}
        >
          Shareholders
        </button>
        <button
          style={tabButtonStyle(activeTab === 'emissions')}
          onClick={() => setActiveTab('emissions')}
        >
          Emissions
        </button>
      </div>

      <div style={sectionStyle}>
        {renderTabContent()}
      </div>
    </Layout>
  );
};

export default UserDashboard;