import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { THEME, getAdminTypography, ALPHA_COLORS } from '../constants/theme';
import Layout from '../components/Layout';
import ShareholderList from '../components/ShareholderList';
import ShareholderForm from '../components/ShareholderForm';
import EmissionList from '../components/EmissionList';
import EmissionForm from '../components/EmissionForm';
import EmissionView from '../components/EmissionView';
import UserManagement from '../components/UserManagement';
import SubscriptionList from '../components/SubscriptionList';
import { AdminTab } from '../types/navigation';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const typography = getAdminTypography(); // User's exact requirement: no hooks!
  const [activeTab, setActiveTab] = useState<AdminTab>('users');
  const [showShareholderForm, setShowShareholderForm] = useState(false);
  const [editingShareholder, setEditingShareholder] = useState(null);
  const [showEmissionForm, setShowEmissionForm] = useState(false);
  const [editingEmission, setEditingEmission] = useState(null);
  const [viewingEmission, setViewingEmission] = useState<number | null>(null);
  const [selectedEmissionForSubscriptions, setSelectedEmissionForSubscriptions] = useState<number | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const headerStyle: React.CSSProperties = {
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: THEME.colors.primary,
    color: THEME.colors.background,
    borderRadius: '12px',
  };

  const titleStyle: React.CSSProperties = {
    ...typography.title,       // ✅ 24px mobile / 32px desktop
    margin: 0,
    marginBottom: '10px',
  };

  const subtitleStyle: React.CSSProperties = {
    ...typography.subtitle,    // ✅ 16px mobile / 18px desktop
    margin: 0,
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '30px',
  };


  if (!user) {
    return <div>Loading...</div>;
  }



  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const renderTabContent = () => {
    if (showShareholderForm) {
      return (
        <ShareholderForm
          shareholder={editingShareholder}
          onClose={() => {
            setShowShareholderForm(false);
            setEditingShareholder(null);
          }}
          onSave={() => {
            setShowShareholderForm(false);
            setEditingShareholder(null);
            handleRefresh();
          }}
        />
      );
    }

    if (showEmissionForm) {
      return (
        <EmissionForm
          emission={editingEmission}
          onClose={() => {
            setShowEmissionForm(false);
            setEditingEmission(null);
          }}
          onSave={() => {
            setShowEmissionForm(false);
            setEditingEmission(null);
            handleRefresh();
          }}
        />
      );
    }

    if (viewingEmission) {
      return (
        <EmissionView
          emissionId={viewingEmission}
          onClose={() => setViewingEmission(null)}
        />
      );
    }

    switch (activeTab) {
      case 'users':
        return <UserManagement key={refreshKey} />;
      
      case 'shareholders':
        return (
          <>
            <div style={{ marginBottom: '20px' }}>
              <button
                style={{
                  padding: '10px 20px',
                  backgroundColor: THEME.colors.primary,
                  color: THEME.colors.background,
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
                onClick={() => setShowShareholderForm(true)}
              >
                Add New Shareholder
              </button>
            </div>
            <ShareholderList key={refreshKey} />
          </>
        );
      
      case 'emissions':
        return (
          <>
            <div style={{ marginBottom: '20px' }}>
              <button
                style={{
                  padding: '10px 20px',
                  backgroundColor: THEME.colors.primary,
                  color: THEME.colors.background,
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
                onClick={() => setShowEmissionForm(true)}
              >
                Create New Emission
              </button>
            </div>
            <EmissionList key={refreshKey} />
          </>
        );
      
      case 'subscriptions':
        if (selectedEmissionForSubscriptions) {
          return (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: THEME.colors.primary, margin: 0 }}>Subscription Management</h2>
                <button
                  style={{
                    padding: '8px 16px',
                    backgroundColor: THEME.colors.background,
                    color: THEME.colors.primary,
                    border: `2px solid ${THEME.colors.primary}`,
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedEmissionForSubscriptions(null)}
                >
                  ← Back to Emissions
                </button>
              </div>
              <SubscriptionList emissionId={selectedEmissionForSubscriptions} />
            </div>
          );
        }
        
        return (
          <div>
            <h2 style={{ color: THEME.colors.primary, marginBottom: '20px' }}>Subscription Management</h2>
            <div style={{ marginBottom: '15px', padding: '15px', backgroundColor: ALPHA_COLORS.primary.subtle, borderRadius: '8px' }}>
              <p style={{ color: THEME.colors.primary, margin: 0, fontSize: '16px' }}>
                Select an emission below to view and manage its subscriptions.
              </p>
            </div>
            <EmissionList 
              key={refreshKey} 
              onSelectEmission={(emission) => setSelectedEmissionForSubscriptions(emission.id)}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Layout 
      activeTab={activeTab}
      onTabChange={(tab) => {
        if (tab === 'users' || tab === 'shareholders' || tab === 'emissions' || tab === 'subscriptions') {
          setActiveTab(tab);
        }
      }}
    >
      <div style={headerStyle}>
        <h1 style={titleStyle}>Admin Dashboard</h1>
        <p style={subtitleStyle}>
          Welcome, {user.name} - {user.role} Level {user.level}
        </p>
      </div>

      <div style={sectionStyle}>
        {renderTabContent()}
      </div>
    </Layout>
  );
};

export default AdminDashboard;