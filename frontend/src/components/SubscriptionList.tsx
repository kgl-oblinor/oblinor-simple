import React, { useState, useEffect } from 'react';
import { EmissionSubscription, User } from '../types';
import api from '../api';

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
      const response = await api.get(`/emissions/${emissionId}/subscriptions`);
      setSubscriptions(response.data);
      
      // Initialize allocated shares
      const initialAllocated: { [key: number]: number } = {};
      response.data.forEach((sub: SubscriptionWithUser) => {
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
      await api.patch(`/emissions/${emissionId}/subscriptions/${subscriptionId}`, {
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
      await api.patch(`/emissions/${emissionId}/subscriptions/${subscriptionId}`, {
        status: 'REJECTED',
        shares_allocated: 0,
      });
      fetchSubscriptions();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to reject subscription');
    }
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: '#fcfbfa',
    padding: '20px',
    borderRadius: '12px',
  };

  const titleStyle: React.CSSProperties = {
    color: '#123543',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thStyle: React.CSSProperties = {
    backgroundColor: '#123543',
    color: '#fcfbfa',
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
  };

  const tdStyle: React.CSSProperties = {
    padding: '12px',
    borderBottom: '1px solid rgba(18, 53, 67, 0.1)',
    color: '#123543',
  };

  const statusBadgeStyle = (status: string): React.CSSProperties => ({
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
    backgroundColor: 
      status === 'APPROVED' ? '#123543' : 
      status === 'REJECTED' ? 'rgba(18, 53, 67, 0.3)' : 
      'rgba(18, 53, 67, 0.1)',
    color: 
      status === 'APPROVED' ? '#fcfbfa' : 
      '#123543',
  });

  const buttonStyle: React.CSSProperties = {
    padding: '6px 12px',
    fontSize: '14px',
    fontWeight: 'bold',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    marginRight: '5px',
  };

  const approveButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#123543',
    color: '#fcfbfa',
  };

  const rejectButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#fcfbfa',
    color: '#123543',
    border: '1px solid #123543',
  };

  const inputStyle: React.CSSProperties = {
    width: '100px',
    padding: '4px 8px',
    border: '1px solid #123543',
    borderRadius: '4px',
    marginRight: '5px',
  };

  const summaryBoxStyle: React.CSSProperties = {
    backgroundColor: '#123543',
    color: '#fcfbfa',
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
    fontSize: '12px',
    opacity: 0.8,
    marginBottom: '5px',
  };

  const summaryValueStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
  };

  if (loading) {
    return <div style={containerStyle}>Loading subscriptions...</div>;
  }

  if (error) {
    return <div style={containerStyle}><div style={{ color: '#123543' }}>{error}</div></div>;
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
                  <span style={{ color: '#123543', fontSize: '12px' }}>
                    Approved {new Date(sub.approved_at).toLocaleDateString()}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {subscriptions.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#123543' }}>
          No subscriptions yet for this emission.
        </div>
      )}
    </div>
  );
};

export default SubscriptionList;