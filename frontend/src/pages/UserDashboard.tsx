import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import ShareholderList from '../components/ShareholderList';
import EmissionList from '../components/EmissionList';
import EmissionView from '../components/EmissionView';
import BlurredContent from '../components/BlurredContent';
import styles from './UserDashboard.module.css';

type UserTab = 'overview' | 'shareholders' | 'emissions';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<UserTab>('overview');
  const [viewingEmission, setViewingEmission] = useState<number | null>(null);


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
            <div className={styles.accessInfo}>
              <h3 className={styles.accessTitle}>
                Your Access Level: {user.level}
              </h3>
              <div className={styles.accessItem}>
                <strong>Current Access:</strong> {getAccessDescription()}
              </div>
              <div className={styles.accessItem}>
                <strong>Level 1:</strong> Everything blurred (no access)
              </div>
              <div className={styles.accessItem}>
                <strong>Level 2:</strong> Can see shareholders list
              </div>
              <div className={styles.accessItem}>
                <strong>Level 3:</strong> Full access + can subscribe to emissions
              </div>
            </div>
            
            {user.level === 1 && (
              <div className={styles.limitedAccess}>
                <h3 className={styles.limitedAccessTitle}>Limited Access</h3>
                <p className={styles.limitedAccessText}>
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
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome, {user.name}</h1>
        <p className={styles.subtitle}>
          {user.role} - Level {user.level}
        </p>
      </div>

      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabButton} ${activeTab === 'overview' ? styles.active : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'shareholders' ? styles.active : ''}`}
          onClick={() => setActiveTab('shareholders')}
        >
          Shareholders
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'emissions' ? styles.active : ''}`}
          onClick={() => setActiveTab('emissions')}
        >
          Emissions
        </button>
      </div>

      <div className={styles.section}>
        {renderTabContent()}
      </div>
    </Layout>
  );
};

export default UserDashboard;