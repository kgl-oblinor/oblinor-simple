import React, { useState, useEffect } from 'react';
import { Emission } from '../types';
import { emissionsAPI } from '../api';
import BlurredContent from './BlurredContent';
import { useAuth } from '../context/AuthContext';
import { THEME, ALPHA_COLORS } from '../constants/theme';

interface EmissionListProps {
  onSelectEmission?: (emission: Emission) => void;
  onViewEmission?: (id: number) => void;
}

const EmissionList: React.FC<EmissionListProps> = ({ onSelectEmission, onViewEmission }) => {
  const [emissions, setEmissions] = useState<Emission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const containerStyle: React.CSSProperties = {
    backgroundColor: THEME.colors.primary,
    padding: '20px',
    borderRadius: '12px',
    color: THEME.colors.background,
    marginBottom: '20px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    borderBottom: `2px solid ${ALPHA_COLORS.background.strong}`,
    paddingBottom: '10px',
  };

  const emissionCardStyle: React.CSSProperties = {
    backgroundColor: ALPHA_COLORS.background.light,
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '15px',
    cursor: onSelectEmission ? 'pointer' : 'default',
    transition: 'all 0.3s ease',
    border: `1px solid ${ALPHA_COLORS.background.medium}`,
  };

  const statusBadgeStyle = (status: string): React.CSSProperties => ({
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
    backgroundColor: 
      status === 'ACTIVE' ? THEME.colors.success :
      status === 'COMPLETED' ? THEME.colors.info :
      THEME.colors.warning,
    color: THEME.colors.background,
  });

  const loadingStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
    opacity: 0.8,
  };

  const errorStyle: React.CSSProperties = {
    color: THEME.colors.error,
    textAlign: 'center',
    padding: '20px',
    backgroundColor: ALPHA_COLORS.error.light,
    borderRadius: '8px',
  };

  useEffect(() => {
    fetchEmissions();
  }, []);

  const fetchEmissions = async () => {
    try {
      setLoading(true);
      const response = await emissionsAPI.list();
      setEmissions(response.emissions);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch emissions');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('no-NO', {
      style: 'currency',
      currency: 'NOK'
    }).format(amount);
  };

  if (!user) return null;

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>
        Emissions ({emissions.length})
      </h2>

      {loading && (
        <div style={loadingStyle}>
          Loading emissions...
        </div>
      )}

      {error && (
        <div style={errorStyle}>
          {error}
        </div>
      )}

      {!loading && !error && emissions.length > 0 && (
        <div>
          {emissions.map((emission) => (
            <BlurredContent
              key={emission.id}
              requiredLevel={user.role === 'ADMIN' ? 1 : 3}
              userLevel={user.level}
              userRole={user.role}
            >
              <div
                style={emissionCardStyle}
                onClick={() => onSelectEmission?.(emission)}
                onMouseEnter={(e) => {
                  if (onSelectEmission) {
                    e.currentTarget.style.backgroundColor = ALPHA_COLORS.background.light;
                  }
                }}
                onMouseLeave={(e) => {
                  if (onSelectEmission) {
                    e.currentTarget.style.backgroundColor = ALPHA_COLORS.background.light;
                  }
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>
                    {emission.title}
                  </h3>
                  <span style={statusBadgeStyle(emission.status)}>
                    {emission.status}
                  </span>
                </div>

                <p style={{ margin: '10px 0', opacity: 0.8 }}>
                  {emission.description}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                  <div>
                    <strong>Shares Offered:</strong><br />
                    {emission.new_shares_offered?.toLocaleString() || 'N/A'}
                  </div>
                  <div>
                    <strong>Price per Share:</strong><br />
                    {emission.price_per_share ? formatCurrency(emission.price_per_share) : 'N/A'}
                  </div>
                  <div>
                    <strong>Start Date:</strong><br />
                    {formatDate(emission.start_date)}
                  </div>
                  <div>
                    <strong>End Date:</strong><br />
                    {formatDate(emission.end_date)}
                  </div>
                </div>

                {(user.level >= 3 || user.role === 'ADMIN') && (
                  <div style={{ marginTop: '15px', padding: '10px', backgroundColor: ALPHA_COLORS.background.light, borderRadius: '6px' }}>
                    <div style={{ fontSize: '14px' }}>
                      <strong>Total Value:</strong> {emission.new_shares_offered && emission.price_per_share 
                        ? formatCurrency(emission.new_shares_offered * emission.price_per_share)
                        : 'N/A'
                      }
                    </div>
                    <div style={{ fontSize: '14px', marginTop: '5px' }}>
                      <strong>Shares After:</strong> {emission.shares_after?.toLocaleString() || 'N/A'}
                    </div>
                  </div>
                )}

                {onViewEmission && (
                  <button
                    style={{
                      marginTop: '15px',
                      padding: '10px 20px',
                      backgroundColor: THEME.colors.background,
                      color: THEME.colors.primary,
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      width: '100%',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewEmission(emission.id);
                    }}
                  >
                    View Details
                  </button>
                )}
              </div>
            </BlurredContent>
          ))}
        </div>
      )}

      {!loading && !error && emissions.length === 0 && (
        <div style={loadingStyle}>
          No emissions found
        </div>
      )}
    </div>
  );
};

export default EmissionList;