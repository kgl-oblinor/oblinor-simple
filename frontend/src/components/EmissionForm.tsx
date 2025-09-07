import React, { useState, useEffect } from 'react';
import { Emission, APIError } from '../types';
import api from '../api';
import { THEME } from '../constants/theme';

interface EmissionFormProps {
  emission?: Emission | null;
  onClose: () => void;
  onSave: () => void;
}

const EmissionForm: React.FC<EmissionFormProps> = ({ emission, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    presentation_material: '',
    shares_before: 128668540, // Current total shares
    new_shares_offered: 0,
    price_per_share: 0,
    start_date: '',
    end_date: '',
    status: 'DRAFT' as 'DRAFT' | 'ACTIVE' | 'COMPLETED',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (emission) {
      setFormData({
        title: emission.title,
        description: emission.description || '',
        presentation_material: emission.presentation_material || '',
        shares_before: emission.shares_before,
        new_shares_offered: emission.new_shares_offered,
        price_per_share: emission.price_per_share,
        start_date: emission.start_date.split('T')[0],
        end_date: emission.end_date.split('T')[0],
        status: emission.status,
      });
    }
  }, [emission]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (emission) {
        await api.put(`/emissions/${emission.id}`, formData);
      } else {
        await api.post('/emissions', formData);
      }
      onSave();
      onClose();
    } catch (err) {
      const apiError = err as APIError;
      setError(apiError.response?.data?.error || apiError.message || 'Failed to save emission');
    } finally {
      setLoading(false);
    }
  };

  const formStyle: React.CSSProperties = {
    backgroundColor: THEME.colors.background,
    padding: window.innerWidth <= 768 ? '20px' : '30px',
    borderRadius: '12px',
    maxWidth: window.innerWidth <= 768 ? '100%' : '600px',
    margin: '0 auto',
    maxHeight: '80vh',
    overflowY: 'auto',
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
    minHeight: window.innerWidth <= 768 ? '44px' : 'auto',
    boxSizing: 'border-box',
  };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    minHeight: '100px',
    resize: 'vertical',
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
  };

  const rowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr',
    gap: window.innerWidth <= 768 ? '0' : '15px',
  };

  const infoBoxStyle: React.CSSProperties = {
    backgroundColor: THEME.colors.primary,
    color: THEME.colors.background,
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
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

  const sharesAfter = formData.shares_before + formData.new_shares_offered;

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={titleStyle}>
        {emission ? 'Edit Emission' : 'Create New Emission'}
      </h2>

      {error && <div style={errorStyle}>{error}</div>}

      <div>
        <label style={labelStyle}>Title</label>
        <input
          type="text"
          style={inputStyle}
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Description</label>
        <textarea
          style={textareaStyle}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div>
        <label style={labelStyle}>Presentation Material</label>
        <textarea
          style={textareaStyle}
          value={formData.presentation_material}
          onChange={(e) => setFormData({ ...formData, presentation_material: e.target.value })}
          placeholder="Enter presentation text for investors..."
        />
      </div>

      <div style={infoBoxStyle}>
        <div>Current shares: {formData.shares_before.toLocaleString()}</div>
        <div>New shares: {formData.new_shares_offered.toLocaleString()}</div>
        <div style={{ fontWeight: 'bold', marginTop: '5px' }}>
          Total after emission: {sharesAfter.toLocaleString()}
        </div>
      </div>

      <div>
        <label style={labelStyle}>Number of New Shares</label>
        <input
          type="number"
          inputMode="numeric"
          style={inputStyle}
          value={formData.new_shares_offered}
          onChange={(e) => setFormData({ ...formData, new_shares_offered: parseInt(e.target.value) || 0 })}
          min="1"
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Price per Share (NOK)</label>
        <input
          type="number"
          inputMode="decimal"
          style={inputStyle}
          value={formData.price_per_share}
          onChange={(e) => setFormData({ ...formData, price_per_share: parseFloat(e.target.value) || 0 })}
          min="0.01"
          step="0.01"
          required
        />
      </div>

      <div style={rowStyle}>
        <div>
          <label style={labelStyle}>Start Date</label>
          <input
            type="date"
            style={inputStyle}
            value={formData.start_date}
            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>End Date</label>
          <input
            type="date"
            style={inputStyle}
            value={formData.end_date}
            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
            min={formData.start_date}
            required
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Status</label>
        <select
          style={selectStyle}
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as 'DRAFT' | 'ACTIVE' | 'COMPLETED' })}
        >
          <option value="DRAFT">Draft</option>
          <option value="ACTIVE">Active</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      <div style={buttonContainerStyle}>
        <button
          type="submit"
          style={saveButtonStyle}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Emission'}
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

export default EmissionForm;