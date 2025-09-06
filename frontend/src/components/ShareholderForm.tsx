import React, { useState, useEffect } from 'react';
import { Shareholder } from '../types';
import api from '../api';

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
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save shareholder');
    } finally {
      setLoading(false);
    }
  };

  const formStyle: React.CSSProperties = {
    backgroundColor: '#fcfbfa',
    padding: '30px',
    borderRadius: '12px',
    maxWidth: '500px',
    margin: '0 auto',
  };

  const titleStyle: React.CSSProperties = {
    color: '#123543',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    color: '#123543',
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    border: '2px solid #123543',
    borderRadius: '6px',
    fontSize: '16px',
    marginBottom: '15px',
    backgroundColor: '#fcfbfa',
    color: '#123543',
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
  };

  const buttonStyle: React.CSSProperties = {
    flex: 1,
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  };

  const saveButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#123543',
    color: '#fcfbfa',
  };

  const cancelButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#fcfbfa',
    color: '#123543',
    border: '2px solid #123543',
  };

  const errorStyle: React.CSSProperties = {
    color: '#123543',
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