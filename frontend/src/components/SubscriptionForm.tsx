import React, { useState } from 'react';
import { Emission, APIError } from '../types';
import api from '../api';
import { THEME } from '../constants/theme';

interface SubscriptionFormProps {
  emission: Emission;
  onClose: () => void;
  onSuccess: () => void;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ emission, onClose, onSuccess }) => {
  const [sharesRequested, setSharesRequested] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalCost = sharesRequested * emission.price_per_share;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (sharesRequested <= 0) {
      setError('Please enter a valid number of shares');
      return;
    }

    if (sharesRequested > emission.new_shares_offered) {
      setError(`Maximum available shares: ${emission.new_shares_offered.toLocaleString()}`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await api.post(`/emissions/${emission.id}/subscribe`, {
        shares_requested: sharesRequested,
      });
      onSuccess();
    } catch (err) {
      const apiError = err as APIError;
      setError(apiError.response?.data?.error || apiError.message || 'Failed to submit subscription');
    } finally {
      setLoading(false);
    }
  };

  const formStyle: React.CSSProperties = {
    backgroundColor: THEME.colors.background,
    padding: window.innerWidth <= 768 ? '20px' : '30px',
    borderRadius: '12px',
    maxWidth: '500px',
    margin: '0 auto',
  };

  const titleStyle: React.CSSProperties = {
    color: THEME.colors.primary,
    fontSize: window.innerWidth <= 768 ? '20px' : '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const emissionInfoStyle: React.CSSProperties = {
    backgroundColor: THEME.colors.primary,
    color: THEME.colors.background,
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    color: THEME.colors.primary,
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: window.innerWidth <= 768 ? '14px 12px' : '12px',
    border: `2px solid ${THEME.colors.primary}`,
    borderRadius: '6px',
    fontSize: '18px',
    marginBottom: '15px',
    backgroundColor: THEME.colors.background,
    minHeight: '44px',
    boxSizing: 'border-box',
  };

  const summaryBoxStyle: React.CSSProperties = {
    backgroundColor: 'rgba(18, 53, 67, 0.05)',
    padding: window.innerWidth <= 768 ? '15px' : '20px',
    borderRadius: '8px',
    marginBottom: '20px',
  };

  const summaryRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    color: THEME.colors.primary,
    fontSize: window.innerWidth <= 768 ? '14px' : '16px',
  };

  const totalRowStyle: React.CSSProperties = {
    ...summaryRowStyle,
    fontWeight: 'bold',
    fontSize: window.innerWidth <= 768 ? '16px' : '18px',
    borderTop: `2px solid ${THEME.colors.primary}`,
    paddingTop: '10px',
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
    gap: '10px',
    marginTop: '20px',
  };

  const buttonStyle: React.CSSProperties = {
    flex: 1,
    padding: window.innerWidth <= 768 ? '16px 12px' : '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    minHeight: '44px',
  };

  const subscribeButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: THEME.colors.primary,
    color: THEME.colors.background,
  };

  const cancelButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: THEME.colors.background,
    color: THEME.colors.primary,
    border: `2px solid ${THEME.colors.primary}`,
  };

  const errorStyle: React.CSSProperties = {
    color: THEME.colors.background,
    backgroundColor: THEME.colors.primary,
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '15px',
    fontSize: window.innerWidth <= 768 ? '14px' : '16px',
  };

  const infoTextStyle: React.CSSProperties = {
    color: THEME.colors.primary,
    fontSize: window.innerWidth <= 768 ? '12px' : '14px',
    marginTop: '10px',
    fontStyle: 'italic',
    lineHeight: '1.4',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={titleStyle}>Subscribe to Emission</h2>

      <div style={emissionInfoStyle}>
        <div style={{ 
          fontSize: window.innerWidth <= 768 ? '16px' : '18px', 
          marginBottom: '5px' 
        }}>
          {emission.title}
        </div>
        <div style={{ fontSize: window.innerWidth <= 768 ? '14px' : '16px' }}>
          Price per share: {emission.price_per_share} NOK
        </div>
        <div style={{ fontSize: window.innerWidth <= 768 ? '14px' : '16px' }}>
          Available shares: {emission.new_shares_offered.toLocaleString()}
        </div>
      </div>

      {error && <div style={errorStyle}>{error}</div>}

      <div>
        <label style={labelStyle}>Number of Shares to Subscribe</label>
        <input
          type="number"
          style={inputStyle}
          value={sharesRequested || ''}
          onChange={(e) => setSharesRequested(parseInt(e.target.value) || 0)}
          min="1"
          max={emission.new_shares_offered}
          placeholder="Enter number of shares"
          required
          disabled={loading}
        />
      </div>

      {sharesRequested > 0 && (
        <div style={summaryBoxStyle}>
          <h3 style={{ 
            color: THEME.colors.primary, 
            marginBottom: '15px',
            fontSize: window.innerWidth <= 768 ? '16px' : '18px'
          }}>
            Subscription Summary
          </h3>
          <div style={summaryRowStyle}>
            <span>Shares requested:</span>
            <span>{sharesRequested.toLocaleString()}</span>
          </div>
          <div style={summaryRowStyle}>
            <span>Price per share:</span>
            <span>{emission.price_per_share} NOK</span>
          </div>
          <div style={totalRowStyle}>
            <span>Total cost:</span>
            <span>{totalCost.toLocaleString()} NOK</span>
          </div>
        </div>
      )}

      <div style={infoTextStyle}>
        * Your subscription will be reviewed by an administrator. You will be notified once your subscription is approved.
        Actual allocated shares may differ from requested amount based on total demand.
      </div>

      <div style={buttonContainerStyle}>
        <button
          type="submit"
          style={subscribeButtonStyle}
          disabled={loading || sharesRequested <= 0}
          onMouseEnter={(e) => {
            if (!loading && sharesRequested > 0) {
              e.currentTarget.style.opacity = '0.9';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading && sharesRequested > 0) {
              e.currentTarget.style.opacity = '1';
            }
          }}
        >
          {loading ? 'Submitting...' : 'Submit Subscription'}
        </button>
        <button
          type="button"
          style={cancelButtonStyle}
          onClick={onClose}
          disabled={loading}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.backgroundColor = 'rgba(18, 53, 67, 0.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.backgroundColor = THEME.colors.background;
            }
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SubscriptionForm;