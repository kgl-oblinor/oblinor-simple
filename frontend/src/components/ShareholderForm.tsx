import React, { useState, useEffect } from 'react';
import { Shareholder, APIError } from '../types';
import api from '../api';
import { THEME } from '../constants/theme';

interface ShareholderFormProps {
  shareholder?: Shareholder | null;
  onClose: () => void;
  onSave: () => void;
}

const ShareholderForm: React.FC<ShareholderFormProps> = ({ shareholder, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    shares_owned: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (shareholder) {
      setFormData({
        name: shareholder.name,
        email: shareholder.email,
        shares_owned: shareholder.shares_owned,
      });
    }
  }, [shareholder]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (shareholder) {
        await api.put(`/shareholders/${shareholder.id}`, formData);
      } else {
        await api.post('/shareholders', formData);
      }
      onSave();
      onClose();
    } catch (err) {
      const apiError = err as APIError;
      setError(apiError.response?.data?.error || apiError.message || 'Failed to save shareholder');
    } finally {
      setLoading(false);
    }
  };

  const formStyle: React.CSSProperties = {
    backgroundColor: THEME.colors.background,
    padding: window.innerWidth <= 768 ? '20px' : '30px',
    borderRadius: '12px',
    maxWidth: window.innerWidth <= 768 ? '100%' : '500px',
    margin: '0 auto',
  };

  const titleStyle: React.CSSProperties = {
    color: THEME.colors.primary,
    fontSize: window.innerWidth <= 768 ? '20px' : '24px',
    fontWeight: 'bold',
    marginBottom: window.innerWidth <= 768 ? '15px' : '20px',
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
    padding: window.innerWidth <= 768 ? '12px 16px' : '10px',
    border: `2px solid ${THEME.colors.primary}`,
    borderRadius: '6px',
    fontSize: '16px',
    marginBottom: window.innerWidth <= 768 ? '12px' : '15px',
    backgroundColor: THEME.colors.background,
    color: THEME.colors.primary,
    minHeight: window.innerWidth <= 768 ? '44px' : 'auto',
    boxSizing: 'border-box',
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
  };

  const buttonStyle: React.CSSProperties = {
    flex: 1,
    padding: window.innerWidth <= 768 ? '12px 16px' : '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    minHeight: window.innerWidth <= 768 ? '44px' : 'auto',
  };

  const saveButtonStyle: React.CSSProperties = {
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
    color: THEME.colors.primary,
    backgroundColor: 'rgba(18, 53, 67, 0.1)',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '15px',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={titleStyle}>
        {shareholder ? 'Edit Shareholder' : 'Add New Shareholder'}
      </h2>

      {error && <div style={errorStyle}>{error}</div>}

      <div>
        <label style={labelStyle}>Name</label>
        <input
          type="text"
          style={inputStyle}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Email</label>
        <input
          type="email"
          inputMode="email"
          style={inputStyle}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Shares Owned</label>
        <input
          type="number"
          inputMode="numeric"
          style={inputStyle}
          value={formData.shares_owned}
          onChange={(e) => setFormData({ ...formData, shares_owned: parseInt(e.target.value) || 0 })}
          min="0"
          required
        />
      </div>

      <div style={buttonContainerStyle}>
        <button
          type="submit"
          style={saveButtonStyle}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
        <button
          type="button"
          style={cancelButtonStyle}
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ShareholderForm;