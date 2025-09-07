import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { usersAPI } from '../api';
import BlurredContent from './BlurredContent';
import { useAuth } from '../context/AuthContext';
import { THEME } from '../constants/theme';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingUser, setUpdatingUser] = useState<number | null>(null);
  const { user: currentUser } = useAuth();

  const containerStyle: React.CSSProperties = {
    backgroundColor: THEME.colors.primary,
    padding: '20px',
    borderRadius: '12px',
    color: THEME.colors.background,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    borderBottom: '2px solid rgba(252, 251, 250, 0.3)',
    paddingBottom: '10px',
  };

  // Desktop table styles
  const tableContainerStyle: React.CSSProperties = {
    display: window.innerWidth <= 768 ? 'none' : 'block',
    overflowX: 'auto',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '15px',
  };

  const thStyle: React.CSSProperties = {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid rgba(252, 251, 250, 0.3)',
    backgroundColor: 'rgba(252, 251, 250, 0.1)',
    fontWeight: 'bold',
  };

  const tdStyle: React.CSSProperties = {
    padding: '12px',
    borderBottom: '1px solid rgba(252, 251, 250, 0.2)',
  };

  const selectStyle: React.CSSProperties = {
    padding: '6px 10px',
    backgroundColor: 'rgba(252, 251, 250, 0.1)',
    border: '1px solid rgba(252, 251, 250, 0.3)',
    borderRadius: '4px',
    color: THEME.colors.background,
    fontSize: '14px',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '6px 12px',
    backgroundColor: THEME.colors.background,
    color: THEME.colors.primary,
    border: 'none',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginLeft: '8px',
  };

  const loadingStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
    opacity: 0.8,
  };

  const errorStyle: React.CSSProperties = {
    color: '#ff6b6b',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderRadius: THEME.spacing.borderRadius,
  };

  // Mobile card styles
  const mobileCardContainerStyle: React.CSSProperties = {
    display: window.innerWidth <= 768 ? 'block' : 'none',
  };

  const mobileCardStyle: React.CSSProperties = {
    backgroundColor: 'rgba(252, 251, 250, 0.1)',
    borderRadius: THEME.spacing.borderRadius,
    padding: '15px',
    marginBottom: '15px',
    border: '1px solid rgba(252, 251, 250, 0.2)',
  };

  const mobileCardHeaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px',
  };

  const mobileCardNameStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '4px',
    color: THEME.colors.background,
  };

  const mobileCardEmailStyle: React.CSSProperties = {
    fontSize: '14px',
    opacity: 0.8,
    color: THEME.colors.background,
  };

  const mobileCardDetailsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '12px',
    gap: '10px',
  };

  const mobileCardLevelContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flex: '1',
  };

  const mobileSelectStyle: React.CSSProperties = {
    padding: '8px 12px',
    backgroundColor: 'rgba(252, 251, 250, 0.2)',
    border: '1px solid rgba(252, 251, 250, 0.3)',
    borderRadius: '6px',
    color: THEME.colors.background,
    fontSize: '14px',
    minHeight: '40px',
  };

  const mobileActionButtonStyle: React.CSSProperties = {
    padding: '8px 12px',
    backgroundColor: THEME.colors.background,
    color: THEME.colors.primary,
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    minHeight: '40px',
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await usersAPI.list();
      setUsers(response.users);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleLevelChange = async (userId: number, newLevel: number) => {
    try {
      setUpdatingUser(userId);
      await usersAPI.updateLevel(userId, newLevel);
      
      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, level: newLevel } : user
      ));
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update user level');
    } finally {
      setUpdatingUser(null);
    }
  };

  const getValidLevels = (role: string) => {
    return role === 'ADMIN' ? [1, 2] : [1, 2, 3];
  };


  if (!currentUser) return null;

  return (
    <BlurredContent
      requiredLevel={1}
      userLevel={currentUser.level}
      userRole={currentUser.role}
      adminOnly={true}
    >
      <div style={containerStyle}>
        <h2 style={titleStyle}>
          User Management ({users.length})
        </h2>

        {loading && (
          <div style={loadingStyle}>
            Loading users...
          </div>
        )}

        {error && (
          <div style={errorStyle}>
            {error}
          </div>
        )}

        {!loading && !error && users.length > 0 && (
          <>
            {/* Mobile Card Layout */}
            <div style={mobileCardContainerStyle}>
              {users.map((user) => (
                <div key={user.id} style={mobileCardStyle}>
                  <div style={mobileCardHeaderStyle}>
                    <div>
                      <div style={mobileCardNameStyle}>{user.name}</div>
                      <div style={mobileCardEmailStyle}>{user.email}</div>
                    </div>
                    <span style={{
                      padding: '6px 10px',
                      backgroundColor: user.role === 'ADMIN' ? THEME.colors.success : THEME.colors.info,
                      color: THEME.colors.background,
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {user.role}
                    </span>
                  </div>
                  
                  <div style={mobileCardDetailsStyle}>
                    <div style={mobileCardLevelContainerStyle}>
                      <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Level:</span>
                      <select
                        value={user.level}
                        onChange={(e) => handleLevelChange(user.id, parseInt(e.target.value))}
                        style={mobileSelectStyle}
                        disabled={updatingUser === user.id || user.id === currentUser.id}
                      >
                        {getValidLevels(user.role).map(level => (
                          <option key={level} value={level}>
                            Level {level}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {updatingUser === user.id ? (
                      <span style={{ fontSize: '12px', opacity: 0.7 }}>Updating...</span>
                    ) : user.id === currentUser.id ? (
                      <span style={{ fontSize: '12px', opacity: 0.7 }}>Current User</span>
                    ) : (
                      <button
                        style={mobileActionButtonStyle}
                        onClick={() => {
                          // Could add more actions here like delete, etc.
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(252, 251, 250, 0.9)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = THEME.colors.background;
                        }}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table Layout */}
            <div style={tableContainerStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>Role</th>
                    <th style={thStyle}>Level</th>
                    <th style={thStyle}>Created</th>
                    <th style={thStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td style={tdStyle}>{user.name}</td>
                      <td style={tdStyle}>{user.email}</td>
                      <td style={tdStyle}>
                        <span style={{
                          padding: '4px 8px',
                          backgroundColor: user.role === 'ADMIN' ? THEME.colors.success : THEME.colors.info,
                          color: THEME.colors.background,
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>
                          {user.role}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <select
                          value={user.level}
                          onChange={(e) => handleLevelChange(user.id, parseInt(e.target.value))}
                          style={selectStyle}
                          disabled={updatingUser === user.id || user.id === currentUser.id}
                        >
                          {getValidLevels(user.role).map(level => (
                            <option key={level} value={level}>
                              Level {level}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td style={tdStyle}>
                        {/* Created date not available in User type */}
                        -
                      </td>
                      <td style={tdStyle}>
                        {updatingUser === user.id ? (
                          <span style={{ fontSize: '12px', opacity: 0.7 }}>Updating...</span>
                        ) : user.id === currentUser.id ? (
                          <span style={{ fontSize: '12px', opacity: 0.7 }}>Current User</span>
                        ) : (
                          <button
                            style={buttonStyle}
                            onClick={() => {
                              // Could add more actions here like delete, etc.
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(252, 251, 250, 0.9)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = THEME.colors.background;
                            }}
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {!loading && !error && users.length === 0 && (
          <div style={loadingStyle}>
            No users found
          </div>
        )}
      </div>
    </BlurredContent>
  );
};

export default UserManagement;