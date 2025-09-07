import React, { useState, useEffect } from 'react';
import { Emission } from '../types';
import { useAuth } from '../context/AuthContext';
import { THEME, ALPHA_COLORS } from '../constants/theme';
import api from '../api';
import BlurredContent from './BlurredContent';
import SubscriptionForm from './SubscriptionForm';

interface EmissionViewProps {
  emissionId: number;
  onClose?: () => void;
}

const EmissionView: React.FC<EmissionViewProps> = ({ emissionId, onClose }) => {
  const { user } = useAuth();
  const [emission, setEmission] = useState<Emission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);

  useEffect(() => {
    fetchEmission();
    checkExistingSubscription();
  }, [emissionId]);

  const fetchEmission = async () => {
    try {
      const response = await api.get(`/emissions/${emissionId}`);
      setEmission(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load emission');
    } finally {
      setLoading(false);
    }
  };

  const checkExistingSubscription = async () => {
    if (user?.role === 'USER') {
      try {
        const response = await api.get(`/emissions/${emissionId}/my-subscription`);
        setHasSubscribed(!!response.data);
      } catch (err) {
        // No subscription exists
        setHasSubscribed(false);
      }
    }
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: THEME.colors.background,
    padding: '30px',
    borderRadius: '12px',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const headerStyle: React.CSSProperties = {
    borderBottom: `2px solid ${THEME.colors.primary}`,
    paddingBottom: '20px',
    marginBottom: '20px',
  };

  const titleStyle: React.CSSProperties = {
    color: THEME.colors.primary,
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const statusBadgeStyle = (status: string): React.CSSProperties => ({
    display: 'inline-block',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 'bold',
    backgroundColor: status === 'ACTIVE' ? THEME.colors.primary : ALPHA_COLORS.primary.strong,
    color: status === 'ACTIVE' ? THEME.colors.background : THEME.colors.primary,
  });

  const infoGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '30px',
  };

  const infoBoxStyle: React.CSSProperties = {
    backgroundColor: THEME.colors.primary,
    color: THEME.colors.background,
    padding: '15px',
    borderRadius: THEME.spacing.borderRadius,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '12px',
    opacity: 0.8,
    marginBottom: '5px',
  };

  const valueStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
  };

  const descriptionStyle: React.CSSProperties = {
    color: THEME.colors.primary,
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '20px',
  };

  const presentationBoxStyle: React.CSSProperties = {
    backgroundColor: ALPHA_COLORS.primary.subtle,
    padding: '20px',
    borderRadius: THEME.spacing.borderRadius,
    marginBottom: '20px',
  };

  const presentationTitleStyle: React.CSSProperties = {
    color: THEME.colors.primary,
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: THEME.colors.primary,
    color: THEME.colors.background,
    marginRight: '10px',
  };

  const disabledButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    opacity: 0.5,
    cursor: 'not-allowed',
  };

  const closeButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: THEME.colors.background,
    color: THEME.colors.primary,
    border: `2px solid ${THEME.colors.primary}`,
  };

  if (loading) {
    return <div style={containerStyle}>Loading emission details...</div>;
  }

  if (error || !emission) {
    return (
      <div style={containerStyle}>
        <div style={{ color: THEME.colors.primary }}>{error || 'Emission not found'}</div>
        {onClose && (
          <button style={closeButtonStyle} onClick={onClose}>
            Close
          </button>
        )}
      </div>
    );
  }

  const isActive = emission.status === 'ACTIVE';
  const canSubscribe = user?.role === 'USER' && user?.level >= 3 && isActive && !hasSubscribed;

  return (
    <div style={containerStyle}>
      {!showSubscriptionForm ? (
        <>
          <div style={headerStyle}>
            <h2 style={titleStyle}>{emission.title}</h2>
            <span style={statusBadgeStyle(emission.status)}>{emission.status}</span>
          </div>

          <BlurredContent
            requiredLevel={3}
            userLevel={user?.level || 0}
            userRole={user?.role || 'USER'}
          >
            <div style={infoGridStyle}>
              <div style={infoBoxStyle}>
                <div style={labelStyle}>New Shares Offered</div>
                <div style={valueStyle}>{emission.new_shares_offered.toLocaleString()}</div>
              </div>
              <div style={infoBoxStyle}>
                <div style={labelStyle}>Price per Share</div>
                <div style={valueStyle}>{emission.price_per_share} NOK</div>
              </div>
              <div style={infoBoxStyle}>
                <div style={labelStyle}>Start Date</div>
                <div style={valueStyle}>{new Date(emission.start_date).toLocaleDateString()}</div>
              </div>
              <div style={infoBoxStyle}>
                <div style={labelStyle}>End Date</div>
                <div style={valueStyle}>{new Date(emission.end_date).toLocaleDateString()}</div>
              </div>
            </div>

            {emission.description && (
              <div style={descriptionStyle}>{emission.description}</div>
            )}

            {emission.presentation_material && (
              <div style={presentationBoxStyle}>
                <h3 style={presentationTitleStyle}>Presentation Material</h3>
                <div style={{ whiteSpace: 'pre-wrap', color: THEME.colors.primary }}>
                  {emission.presentation_material}
                </div>
              </div>
            )}

            <div style={{ marginTop: '30px' }}>
              {canSubscribe && (
                <button
                  style={buttonStyle}
                  onClick={() => setShowSubscriptionForm(true)}
                >
                  Subscribe to Emission
                </button>
              )}
              {hasSubscribed && (
                <button style={disabledButtonStyle} disabled>
                  Already Subscribed
                </button>
              )}
              {user?.role === 'USER' && user?.level < 3 && (
                <button style={disabledButtonStyle} disabled>
                  Level 3 Required to Subscribe
                </button>
              )}
              {!isActive && user?.role === 'USER' && (
                <button style={disabledButtonStyle} disabled>
                  Emission Not Active
                </button>
              )}
              {onClose && (
                <button style={closeButtonStyle} onClick={onClose}>
                  Close
                </button>
              )}
            </div>
          </BlurredContent>
        </>
      ) : (
        <SubscriptionForm
          emission={emission}
          onClose={() => {
            setShowSubscriptionForm(false);
            checkExistingSubscription();
          }}
          onSuccess={() => {
            setShowSubscriptionForm(false);
            setHasSubscribed(true);
          }}
        />
      )}
    </div>
  );
};

export default EmissionView;