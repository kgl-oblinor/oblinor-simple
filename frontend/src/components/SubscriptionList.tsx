import React, { useState, useEffect } from 'react';
import { EmissionSubscription, User } from '../types';
import { emissionsAPI } from '../api';
import { THEME, isMobile, ALPHA_COLORS, getResponsiveTypography } from '../constants/theme';

interface SubscriptionListProps {
  emissionId: number;
}

interface SubscriptionWithUser extends EmissionSubscription {
  user?: User;
}

const SubscriptionList: React.FC<SubscriptionListProps> = ({ emissionId }) => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [allocatedShares, setAllocatedShares] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    fetchSubscriptions();
  }, [emissionId]);

  const fetchSubscriptions = async () => {
    try {
      const response = await emissionsAPI.getSubscriptions(emissionId);
      setSubscriptions(response.subscriptions);
      
      // Initialize allocated shares
      const initialAllocated: { [key: number]: number } = {};
      response.subscriptions.forEach((sub: SubscriptionWithUser) => {
        initialAllocated[sub.id] = sub.shares_allocated || sub.shares_requested;
      });
      setAllocatedShares(initialAllocated);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load subscriptions');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (subscriptionId: number) => {
    try {
      await emissionsAPI.updateSubscription(emissionId, subscriptionId, {
        status: 'APPROVED',
        shares_allocated: allocatedShares[subscriptionId],
      });
      fetchSubscriptions();
      setEditingId(null);
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to approve subscription');
    }
  };

  const handleReject = async (subscriptionId: number) => {
    if (!confirm('Are you sure you want to reject this subscription?')) {
      return;
    }

    try {
      await emissionsAPI.updateSubscription(emissionId, subscriptionId, {
        status: 'REJECTED',
        shares_allocated: 0,
      });
      fetchSubscriptions();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to reject subscription');
    }
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: THEME.colors.background,
    padding: '20px',
    borderRadius: '12px',
  };

  const titleStyle: React.CSSProperties = {
    color: THEME.colors.primary,
    ...getResponsiveTypography('h2'),
    marginBottom: '20px',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thStyle: React.CSSProperties = {
    backgroundColor: THEME.colors.primary,
    color: THEME.colors.background,
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
  };

  const tdStyle: React.CSSProperties = {
    padding: '12px',
    borderBottom: `1px solid ${ALPHA_COLORS.primary.light}`,
    color: THEME.colors.primary,
  };

  const statusBadgeStyle = (status: string): React.CSSProperties => ({
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '12px',
    ...getResponsiveTypography('small'),
    fontWeight: 'bold',
    backgroundColor: 
      status === 'APPROVED' ? THEME.colors.primary : 
      status === 'REJECTED' ? ALPHA_COLORS.primary.strong : 
      ALPHA_COLORS.primary.light,
    color: 
      status === 'APPROVED' ? THEME.colors.background : 
      THEME.colors.primary,
  });

  const buttonStyle: React.CSSProperties = {
    padding: '6px 12px',
    ...getResponsiveTypography('caption'),
    fontWeight: 'bold',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    marginRight: '5px',
  };

  const approveButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: THEME.colors.primary,
    color: THEME.colors.background,
  };

  const rejectButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: THEME.colors.background,
    color: THEME.colors.primary,
    border: `1px solid ${THEME.colors.primary}`,
  };

  const inputStyle: React.CSSProperties = {
    width: '100px',
    padding: '4px 8px',
    border: `1px solid ${THEME.colors.primary}`,
    borderRadius: '4px',
    marginRight: '5px',
  };

  const summaryBoxStyle: React.CSSProperties = {
    backgroundColor: THEME.colors.primary,
    color: THEME.colors.background,
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-around',
  };

  const summaryItemStyle: React.CSSProperties = {
    textAlign: 'center',
  };

  const summaryLabelStyle: React.CSSProperties = {
    ...getResponsiveTypography('small'),
    opacity: 0.8,
    marginBottom: '5px',
  };

  const summaryValueStyle: React.CSSProperties = {
    ...getResponsiveTypography('h2'),
    fontWeight: 'bold',
  };

  // Mobile card styles
  const mobileCardContainerStyle: React.CSSProperties = {
    display: isMobile() ? 'block' : 'none',
  };

  const mobileCardStyle: React.CSSProperties = {
    backgroundColor: ALPHA_COLORS.primary.subtle,
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    border: `1px solid ${ALPHA_COLORS.primary.medium}`,
  };

  const mobileCardHeaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
  };

  const mobileCardInvestorInfoStyle: React.CSSProperties = {
    flex: 1,
  };

  const mobileCardInvestorNameStyle: React.CSSProperties = {
    ...getResponsiveTypography('body'),
    fontWeight: 'bold',
    marginBottom: '4px',
    color: THEME.colors.primary,
  };

  const mobileCardInvestorEmailStyle: React.CSSProperties = {
    ...getResponsiveTypography('caption'),
    opacity: 0.7,
    color: THEME.colors.primary,
  };

  const mobileCardStatsContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '12px',
  };

  const mobileCardStatItemStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '8px',
    backgroundColor: ALPHA_COLORS.background.medium,
    borderRadius: '6px',
  };

  const mobileCardStatLabelStyle: React.CSSProperties = {
    ...getResponsiveTypography('small'),
    opacity: 0.7,
    marginBottom: '4px',
    color: THEME.colors.primary,
  };

  const mobileCardStatValueStyle: React.CSSProperties = {
    ...getResponsiveTypography('body'),
    fontWeight: 'bold',
    color: THEME.colors.primary,
  };

  const mobileCardActionsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
    marginTop: '12px',
  };

  const mobileInputStyle: React.CSSProperties = {
    width: '100px',
    padding: '8px',
    border: `1px solid ${THEME.colors.primary}`,
    borderRadius: '4px',
    ...getResponsiveTypography('caption'),
  };

  const mobileButtonStyle: React.CSSProperties = {
    padding: '8px 12px',
    ...getResponsiveTypography('caption'),
    fontWeight: 'bold',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    minHeight: '40px',
  };

  // Desktop table styles
  const tableContainerStyle: React.CSSProperties = {
    display: isMobile() ? 'none' : 'block',
    overflowX: 'auto',
  };

  if (loading) {
    return <div style={containerStyle}>Loading subscriptions...</div>;
  }

  if (error) {
    return <div style={containerStyle}><div style={{ color: THEME.colors.primary }}>{error}</div></div>;
  }

  const totalRequested = subscriptions.reduce((sum, sub) => sum + sub.shares_requested, 0);
  const totalAllocated = subscriptions.reduce((sum, sub) => sum + (sub.shares_allocated || 0), 0);
  const pendingCount = subscriptions.filter(sub => sub.status === 'PENDING').length;
  const approvedCount = subscriptions.filter(sub => sub.status === 'APPROVED').length;

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Subscription Management</h2>

      <div style={summaryBoxStyle}>
        <div style={summaryItemStyle}>
          <div style={summaryLabelStyle}>Total Subscriptions</div>
          <div style={summaryValueStyle}>{subscriptions.length}</div>
        </div>
        <div style={summaryItemStyle}>
          <div style={summaryLabelStyle}>Pending</div>
          <div style={summaryValueStyle}>{pendingCount}</div>
        </div>
        <div style={summaryItemStyle}>
          <div style={summaryLabelStyle}>Approved</div>
          <div style={summaryValueStyle}>{approvedCount}</div>
        </div>
        <div style={summaryItemStyle}>
          <div style={summaryLabelStyle}>Total Requested</div>
          <div style={summaryValueStyle}>{totalRequested.toLocaleString()}</div>
        </div>
        <div style={summaryItemStyle}>
          <div style={summaryLabelStyle}>Total Allocated</div>
          <div style={summaryValueStyle}>{totalAllocated.toLocaleString()}</div>
        </div>
      </div>

      {/* Mobile Card Layout */}
      <div style={mobileCardContainerStyle}>
        {subscriptions.map((sub) => (
          <div key={sub.id} style={mobileCardStyle}>
            <div style={mobileCardHeaderStyle}>
              <div style={mobileCardInvestorInfoStyle}>
                <div style={mobileCardInvestorNameStyle}>{sub.user?.name || 'Unknown'}</div>
                <div style={mobileCardInvestorEmailStyle}>{sub.user?.email || '-'}</div>
              </div>
              <span style={statusBadgeStyle(sub.status)}>{sub.status}</span>
            </div>

            <div style={mobileCardStatsContainerStyle}>
              <div style={mobileCardStatItemStyle}>
                <div style={mobileCardStatLabelStyle}>Requested</div>
                <div style={mobileCardStatValueStyle}>{sub.shares_requested.toLocaleString()}</div>
              </div>
              <div style={mobileCardStatItemStyle}>
                <div style={mobileCardStatLabelStyle}>Allocated</div>
                <div style={mobileCardStatValueStyle}>
                  {editingId === sub.id && sub.status === 'PENDING' ? (
                    <input
                      type="number"
                      style={mobileInputStyle}
                      value={allocatedShares[sub.id] || ''}
                      onChange={(e) => setAllocatedShares({
                        ...allocatedShares,
                        [sub.id]: parseInt(e.target.value) || 0
                      })}
                      min="0"
                      max={sub.shares_requested}
                    />
                  ) : (
                    sub.shares_allocated?.toLocaleString() || '-'
                  )}
                </div>
              </div>
            </div>

            {sub.status === 'PENDING' && (
              <div style={mobileCardActionsStyle}>
                {editingId === sub.id ? (
                  <>
                    <button
                      style={{ ...mobileButtonStyle, backgroundColor: THEME.colors.primary, color: THEME.colors.background, flex: 1 }}
                      onClick={() => handleApprove(sub.id)}
                    >
                      Confirm
                    </button>
                    <button
                      style={{ ...mobileButtonStyle, backgroundColor: THEME.colors.background, color: THEME.colors.primary, border: `1px solid ${THEME.colors.primary}`, flex: 1 }}
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      style={{ ...mobileButtonStyle, backgroundColor: THEME.colors.primary, color: THEME.colors.background, flex: 1 }}
                      onClick={() => setEditingId(sub.id)}
                    >
                      Approve
                    </button>
                    <button
                      style={{ ...mobileButtonStyle, backgroundColor: THEME.colors.background, color: THEME.colors.primary, border: `1px solid ${THEME.colors.primary}`, flex: 1 }}
                      onClick={() => handleReject(sub.id)}
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            )}

            {sub.status === 'APPROVED' && sub.approved_at && (
              <div style={{ marginTop: '8px', fontSize: '12px', color: THEME.colors.primary, opacity: 0.7 }}>
                Approved {new Date(sub.approved_at).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Investor</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Requested</th>
              <th style={thStyle}>Allocated</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub.id}>
                <td style={tdStyle}>{sub.user?.name || 'Unknown'}</td>
                <td style={tdStyle}>{sub.user?.email || '-'}</td>
                <td style={tdStyle}>{sub.shares_requested.toLocaleString()}</td>
                <td style={tdStyle}>
                  {editingId === sub.id && sub.status === 'PENDING' ? (
                    <input
                      type="number"
                      style={inputStyle}
                      value={allocatedShares[sub.id] || ''}
                      onChange={(e) => setAllocatedShares({
                        ...allocatedShares,
                        [sub.id]: parseInt(e.target.value) || 0
                      })}
                      min="0"
                      max={sub.shares_requested}
                    />
                  ) : (
                    sub.shares_allocated?.toLocaleString() || '-'
                  )}
                </td>
                <td style={tdStyle}>
                  <span style={statusBadgeStyle(sub.status)}>{sub.status}</span>
                </td>
                <td style={tdStyle}>
                  {sub.status === 'PENDING' && (
                    <>
                      {editingId === sub.id ? (
                        <>
                          <button
                            style={approveButtonStyle}
                            onClick={() => handleApprove(sub.id)}
                          >
                            Confirm
                          </button>
                          <button
                            style={rejectButtonStyle}
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            style={approveButtonStyle}
                            onClick={() => setEditingId(sub.id)}
                          >
                            Approve
                          </button>
                          <button
                            style={rejectButtonStyle}
                            onClick={() => handleReject(sub.id)}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </>
                  )}
                  {sub.status === 'APPROVED' && sub.approved_at && (
                    <span style={{ color: THEME.colors.primary, fontSize: '12px' }}>
                      Approved {new Date(sub.approved_at).toLocaleDateString()}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {subscriptions.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: THEME.colors.primary }}>
          No subscriptions yet for this emission.
        </div>
      )}
    </div>
  );
};

export default SubscriptionList;