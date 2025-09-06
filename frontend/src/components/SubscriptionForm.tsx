import React, { useState } from 'react';
import { Emission } from '../types';
import api from '../api';
import styles from './SubscriptionForm.module.css';

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
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to submit subscription');
    } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Subscribe to Emission</h2>

      <div className={styles.emissionInfo}>
        <div className={styles.emissionTitle}>{emission.title}</div>
        <div className={styles.emissionDetail}>Price per share: {emission.price_per_share} NOK</div>
        <div className={styles.emissionDetail}>Available shares: {emission.new_shares_offered.toLocaleString()}</div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.inputGroup}>
        <label className={styles.label}>Number of Shares to Subscribe</label>
        <input
          type="number"
          className={styles.input}
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
        <div className={styles.summaryBox}>
          <h3 className={styles.summaryTitle}>Subscription Summary</h3>
          <div className={styles.summaryRow}>
            <span>Shares requested:</span>
            <span>{sharesRequested.toLocaleString()}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Price per share:</span>
            <span>{emission.price_per_share} NOK</span>
          </div>
          <div className={styles.totalRow}>
            <span>Total cost:</span>
            <span>{totalCost.toLocaleString()} NOK</span>
          </div>
        </div>
      )}

      <div className={styles.infoText}>
        * Your subscription will be reviewed by an administrator. You will be notified once your subscription is approved.
        Actual allocated shares may differ from requested amount based on total demand.
      </div>

      <div className={styles.buttonContainer}>
        <button
          type="submit"
          className={`${styles.button} ${styles.subscribeButton}`}
          disabled={loading || sharesRequested <= 0}
        >
          {loading ? 'Submitting...' : 'Submit Subscription'}
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.cancelButton}`}
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SubscriptionForm;