import React, { useState, useEffect } from 'react';
import { Shareholder } from '../types';
import { shareholdersAPI } from '../api';
import BlurredContent from './BlurredContent';
import { useAuth } from '../context/AuthContext';

const ShareholderList: React.FC = () => {
  const [shareholders, setShareholders] = useState<Shareholder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const containerStyle: React.CSSProperties = {
    backgroundColor: '#123543',
    padding: window.innerWidth <= 768 ? '15px' : '20px',
    borderRadius: '12px',
    color: '#fcfbfa',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: window.innerWidth <= 768 ? '20px' : '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    borderBottom: '2px solid rgba(252, 251, 250, 0.3)',
    paddingBottom: '10px',
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
    borderRadius: '8px',
    marginTop: '20px',
  };

  // Mobile card styles
  const mobileCardContainerStyle: React.CSSProperties = {
    display: window.innerWidth <= 768 ? 'block' : 'none',
  };

  const mobileCardStyle: React.CSSProperties = {
    backgroundColor: 'rgba(252, 251, 250, 0.1)',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    border: '1px solid rgba(252, 251, 250, 0.2)',
  };

  const mobileCardHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
    gap: '12px',
  };

  const mobileCardAvatarStyle: React.CSSProperties = {
    width: '45px',
    height: '45px',
    backgroundColor: '#fcfbfa',
    color: '#123543',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    flexShrink: 0,
  };

  const mobileCardInfoStyle: React.CSSProperties = {
    flex: 1,
  };

  const mobileCardNameStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '2px',
    color: '#fcfbfa',
  };

  const mobileCardEmailStyle: React.CSSProperties = {
    fontSize: '14px',
    opacity: 0.8,
    marginBottom: '12px',
    color: '#fcfbfa',
  };

  const mobileCardStatsContainerStyle: React.CSSProperties = {
    backgroundColor: 'rgba(252, 251, 250, 0.1)',
    borderRadius: '8px',
    padding: '12px',
    marginTop: '12px',
  };

  const mobileCardStatsRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  };

  const mobileCardStatsLabelStyle: React.CSSProperties = {
    fontSize: '14px',
    opacity: 0.8,
    color: '#fcfbfa',
  };

  const mobileCardStatsValueStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fcfbfa',
  };

  const mobileCardOwnershipBarContainerStyle: React.CSSProperties = {
    marginTop: '8px',
  };

  const mobileCardOwnershipBarStyle = (percentage: number): React.CSSProperties => ({
    width: '100%',
    height: '6px',
    backgroundColor: 'rgba(252, 251, 250, 0.2)',
    borderRadius: '3px',
    overflow: 'hidden',
    position: 'relative',
  });

  const mobileCardOwnershipBarFillStyle = (percentage: number): React.CSSProperties => ({
    width: `${percentage}%`,
    height: '100%',
    backgroundColor: '#fcfbfa',
    borderRadius: '3px',
    transition: 'width 0.3s ease',
  });

  const mobileCardPercentageStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
    backgroundColor: '#fcfbfa',
    color: '#123543',
    padding: '6px 12px',
    borderRadius: '12px',
    textAlign: 'center',
    marginTop: '8px',
    display: 'inline-block',
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

  const totalSharesStyle: React.CSSProperties = {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: 'rgba(252, 251, 250, 0.1)',
    borderRadius: '8px',
    fontSize: window.innerWidth <= 768 ? '16px' : '18px',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  useEffect(() => {
    fetchShareholders();
  }, []);

  const fetchShareholders = async () => {
    try {
      setLoading(true);
      const response = await shareholdersAPI.list();
      setShareholders(response.shareholders);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch shareholders');
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const totalShares = shareholders.reduce((sum, sh) => sum + sh.shares_owned, 0);

  if (!user) return null;

  return (
    <BlurredContent
      requiredLevel={2}
      userLevel={user.level}
      userRole={user.role}
    >
      <div style={containerStyle}>
        <h2 style={titleStyle}>
          Shareholders ({shareholders.length})
        </h2>

        {loading && (
          <div style={loadingStyle}>
            Loading shareholders...
          </div>
        )}

        {error && (
          <div style={errorStyle}>
            {error}
          </div>
        )}

        {!loading && !error && shareholders.length > 0 && (
          <>
            {/* Mobile Card Layout */}
            <div style={mobileCardContainerStyle}>
              {shareholders.map((shareholder) => {
                const percentage = totalShares > 0 
                  ? (shareholder.shares_owned / totalShares) * 100 
                  : 0;
                
                const initials = shareholder.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .substring(0, 2)
                  .toUpperCase();

                return (
                  <div key={shareholder.id} style={mobileCardStyle}>
                    <div style={mobileCardHeaderStyle}>
                      <div style={mobileCardAvatarStyle}>
                        {initials}
                      </div>
                      <div style={mobileCardInfoStyle}>
                        <div style={mobileCardNameStyle}>{shareholder.name}</div>
                        <div style={mobileCardEmailStyle}>{shareholder.email}</div>
                      </div>
                    </div>
                    
                    <div style={mobileCardStatsContainerStyle}>
                      <div style={mobileCardStatsRowStyle}>
                        <span style={mobileCardStatsLabelStyle}>Shares Owned</span>
                        <span style={mobileCardStatsValueStyle}>
                          {formatNumber(shareholder.shares_owned)}
                        </span>
                      </div>
                      
                      <div style={mobileCardStatsRowStyle}>
                        <span style={mobileCardStatsLabelStyle}>Ownership</span>
                        <span style={mobileCardPercentageStyle}>
                          {percentage.toFixed(2)}%
                        </span>
                      </div>
                      
                      <div style={mobileCardOwnershipBarContainerStyle}>
                        <div style={mobileCardOwnershipBarStyle(percentage)}>
                          <div style={mobileCardOwnershipBarFillStyle(percentage)}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop Table Layout */}
            <div style={tableContainerStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>Shares Owned</th>
                    <th style={thStyle}>% Ownership</th>
                  </tr>
                </thead>
                <tbody>
                  {shareholders.map((shareholder) => (
                    <tr key={shareholder.id}>
                      <td style={tdStyle}>{shareholder.name}</td>
                      <td style={tdStyle}>{shareholder.email}</td>
                      <td style={tdStyle}>{formatNumber(shareholder.shares_owned)}</td>
                      <td style={tdStyle}>
                        {totalShares > 0 
                          ? ((shareholder.shares_owned / totalShares) * 100).toFixed(2)
                          : '0.00'
                        }%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={totalSharesStyle}>
              Total Shares Outstanding: {formatNumber(totalShares)}
            </div>
          </>
        )}

        {!loading && !error && shareholders.length === 0 && (
          <div style={loadingStyle}>
            No shareholders found
          </div>
        )}
      </div>
    </BlurredContent>
  );
};

export default ShareholderList;