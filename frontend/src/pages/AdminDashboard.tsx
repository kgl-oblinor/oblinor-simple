import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import ShareholderList from '../components/ShareholderList';
import ShareholderForm from '../components/ShareholderForm';
import EmissionList from '../components/EmissionList';
import EmissionForm from '../components/EmissionForm';
import EmissionView from '../components/EmissionView';
import UserManagement from '../components/UserManagement';

type AdminTab = 'users' | 'shareholders' | 'emissions' | 'subscriptions';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('users');
  const [showShareholderForm, setShowShareholderForm] = useState(false);
  const [editingShareholder, setEditingShareholder] = useState(null);
  const [showEmissionForm, setShowEmissionForm] = useState(false);
  const [editingEmission, setEditingEmission] = useState(null);
  const [viewingEmission, setViewingEmission] = useState<number | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

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


  if (!user) {
    return <div>Loading...</div>;
  }


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
                  backgroundColor: '#123543',
                  color: '#fcfbfa',
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
                  backgroundColor: '#123543',
                  color: '#fcfbfa',
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
        return (
          <div>
            <h2 style={{ color: '#123543', marginBottom: '20px' }}>Manage Subscriptions</h2>
            <EmissionList key={refreshKey} />
            <div style={{ marginTop: '20px', padding: '20px', backgroundColor: 'rgba(18, 53, 67, 0.05)', borderRadius: '8px' }}>
              <p style={{ color: '#123543' }}>Select an emission above to view and manage its subscriptions.</p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Admin Dashboard</h1>
        <p style={subtitleStyle}>
          Welcome, {user.name} - {user.role} Level {user.level}
        </p>
      </div>

      <div style={tabStyle}>
        <button
          style={tabButtonStyle(activeTab === 'users')}
          onClick={() => setActiveTab('users')}
        >
          Users
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
        <button
          style={tabButtonStyle(activeTab === 'subscriptions')}
          onClick={() => setActiveTab('subscriptions')}
        >
          Subscriptions
        </button>
      </div>

      <div style={sectionStyle}>
        {renderTabContent()}
      </div>
    </Layout>
  );
};

export default AdminDashboard;