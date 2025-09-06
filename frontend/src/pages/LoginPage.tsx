import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const fillTestAccount = (testEmail: string, testPassword: string) => {
    setEmail(testEmail);
    setPassword(testPassword);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Oblinor Simple</h1>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button
            type="submit"
            className={styles.button}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className={styles.testAccounts}>
          <div className={styles.testAccountsTitle}>
            Test Accounts:
          </div>
          
          <div
            className={styles.account}
            onClick={() => fillTestAccount('admin@oblinor.no', 'Admin123!')}
          >
            <div className={styles.accountRole}>Admin (Level 2):</div>
            <div className={styles.accountCredentials}>admin@oblinor.no / Admin123!</div>
          </div>

          <div
            className={styles.account}
            onClick={() => fillTestAccount('user3@oblinor.no', 'Pass123!')}
          >
            <div className={styles.accountRole}>User (Level 3 - Can Subscribe):</div>
            <div className={styles.accountCredentials}>user3@oblinor.no / Pass123!</div>
          </div>

          <div
            className={styles.account}
            onClick={() => fillTestAccount('user2@oblinor.no', 'Pass123!')}
          >
            <div className={styles.accountRole}>User (Level 2 - View Only):</div>
            <div className={styles.accountCredentials}>user2@oblinor.no / Pass123!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;