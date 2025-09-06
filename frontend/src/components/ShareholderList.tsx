import React, { useState, useEffect } from 'react';
import { Shareholder } from '../types';
import { shareholdersAPI } from '../api';
import BlurredContent from './BlurredContent';
import { useAuth } from '../context/AuthContext';
import styles from './ShareholderList.module.css';

const ShareholderList: React.FC = () => {
  const [shareholders, setShareholders] = useState<Shareholder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();


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
      <div className={styles.container}>
        <h2 className={styles.title}>
          Shareholders ({shareholders.length})
        </h2>

        {loading && (
          <div className={styles.loading}>
            Loading shareholders...
          </div>
        )}

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        {!loading && !error && shareholders.length > 0 && (
          <>
            {/* Mobile Card Layout */}
            <div className={styles.mobileCardContainer}>
              {shareholders.map((shareholder) => (
                <div key={shareholder.id} className={styles.mobileCard}>
                  <div className={styles.mobileCardName}>{shareholder.name}</div>
                  <div className={styles.mobileCardEmail}>{shareholder.email}</div>
                  <div className={styles.mobileCardStats}>
                    <span className={styles.mobileCardShares}>
                      {formatNumber(shareholder.shares_owned)} shares
                    </span>
                    <span className={styles.mobileCardPercentage}>
                      {totalShares > 0 
                        ? ((shareholder.shares_owned / totalShares) * 100).toFixed(2)
                        : '0.00'
                      }%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table Layout */}
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.tableHeader}>Name</th>
                    <th className={styles.tableHeader}>Email</th>
                    <th className={styles.tableHeader}>Shares Owned</th>
                    <th className={styles.tableHeader}>% Ownership</th>
                  </tr>
                </thead>
                <tbody>
                  {shareholders.map((shareholder) => (
                    <tr key={shareholder.id}>
                      <td className={styles.tableCell}>{shareholder.name}</td>
                      <td className={styles.tableCell}>{shareholder.email}</td>
                      <td className={styles.tableCell}>{formatNumber(shareholder.shares_owned)}</td>
                      <td className={styles.tableCell}>
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

            <div className={styles.totalShares}>
              Total Shares Outstanding: {formatNumber(totalShares)}
            </div>
          </>
        )}

        {!loading && !error && shareholders.length === 0 && (
          <div className={styles.noData}>
            No shareholders found
          </div>
        )}
      </div>
    </BlurredContent>
  );
};

export default ShareholderList;