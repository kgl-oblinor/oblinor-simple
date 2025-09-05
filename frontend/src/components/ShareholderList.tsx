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
    padding: '20px',
    borderRadius: '12px',
    color: '#fcfbfa',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    borderBottom: '2px solid rgba(252, 251, 250, 0.3)',
    paddingBottom: '10px',
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

  const totalSharesStyle: React.CSSProperties = {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: 'rgba(252, 251, 250, 0.1)',
    borderRadius: '8px',
    fontSize: '18px',
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