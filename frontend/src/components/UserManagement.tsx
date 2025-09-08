import React, { useState, useEffect } from 'react';
import { User } from '@/types';
import { usersAPI } from '@/services';
import BlurredContent from '@/components/BlurredContent';
import { useAuth } from '@/context/AuthContext';
import { THEME, getResponsive, ALPHA_COLORS, getResponsiveTypography } from '@/constants/theme';

const UserManagement: React.FC = () => {
  const { isMobile } = getResponsive(); // Agent 4's responsive system
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
    ...getResponsiveTypography('h2'),
    marginBottom: '20px',
    borderBottom: `2px solid ${ALPHA_COLORS.background.strong}`,
    paddingBottom: '10px',
  };

  // Desktop table styles
  const tableContainerStyle: React.CSSProperties = {
    display: isMobile ? 'none' : 'block',
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
    borderBottom: `1px solid ${ALPHA_COLORS.background.strong}`,
    backgroundColor: ALPHA_COLORS.background.light,
    fontWeight: 'bold',
  };

  const tdStyle: React.CSSProperties = {
    padding: '12px',
    borderBottom: `1px solid ${ALPHA_COLORS.background.medium}`,
  };

  const selectStyle: React.CSSProperties = {
    padding: '6px 10px',
    backgroundColor: ALPHA_COLORS.background.light,
    border: `1px solid ${ALPHA_COLORS.background.strong}`,
    borderRadius: '4px',
    color: THEME.colors.background,
    ...getResponsiveTypography('caption'),
  };

  const buttonStyle: React.CSSProperties = {
    padding: '6px 12px',
    backgroundColor: THEME.colors.background,
    color: THEME.colors.primary,
    border: 'none',
    borderRadius: '4px',
    ...getResponsiveTypography('small'),
    fontWeight: 'bold',
    cursor: 'pointer',
    marginLeft: '8px',
  };

  const loadingStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '40px',
    ...getResponsiveTypography('body'),
    opacity: 0.8,
  };

  const errorStyle: React.CSSProperties = {
    color: THEME.colors.error,
    textAlign: 'center',
    padding: '20px',
    backgroundColor: ALPHA_COLORS.error.light,
    borderRadius: THEME.spacing.borderRadius,
  };

  // Mobile card styles
  const mobileCardContainerStyle: React.CSSProperties = {
    display: isMobile ? 'block' : 'none',
  };

  const mobileCardStyle: React.CSSProperties = {
    backgroundColor: ALPHA_COLORS.background.light,
    borderRadius: THEME.spacing.borderRadius,
    padding: '15px',
    marginBottom: '15px',
    border: `1px solid ${ALPHA_COLORS.background.medium}`,
  };

  const mobileCardHeaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px',
  };

  const mobileCardNameStyle: React.CSSProperties = {
    ...getResponsiveTypography('h3'),
    marginBottom: '4px',
    color: THEME.colors.background,
  };

  const mobileCardEmailStyle: React.CSSProperties = {
    ...getResponsiveTypography('caption'),
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
    backgroundColor: ALPHA_COLORS.background.medium,
    border: `1px solid ${ALPHA_COLORS.background.strong}`,
    borderRadius: '6px',
    color: THEME.colors.background,
    ...getResponsiveTypography('caption'),
    minHeight: '40px',
  };

  const mobileActionButtonStyle: React.CSSProperties = {
    padding: '8px 12px',
    backgroundColor: THEME.colors.background,
    color: THEME.colors.primary,
    border: 'none',
    borderRadius: '6px',
    ...getResponsiveTypography('caption'),
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
                      ...getResponsiveTypography('small'),
                      fontWeight: 'bold'
                    }}>
                      {user.role}
                    </span>
                  </div>
                  
                  <div style={mobileCardDetailsStyle}>
                    <div style={mobileCardLevelContainerStyle}>
                      <span style={{ ...getResponsiveTypography('caption'), fontWeight: 'bold' }}>Level:</span>
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
                          e.currentTarget.style.backgroundColor = ALPHA_COLORS.background.strong;
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
                              e.currentTarget.style.backgroundColor = ALPHA_COLORS.background.strong;
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