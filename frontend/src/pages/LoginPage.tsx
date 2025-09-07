import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { THEME } from '../constants/theme';
import { APIError } from '../types';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const pageStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: THEME.colors.background,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: window.innerWidth <= 768 ? '15px' : '20px',
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: THEME.colors.primary,
    padding: window.innerWidth <= 768 ? '30px' : '40px',
    borderRadius: '12px',
    width: '100%',
    maxWidth: window.innerWidth <= 768 ? '350px' : '400px',
    color: THEME.colors.background,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: window.innerWidth <= 768 ? '24px' : '28px',
    fontWeight: 'bold',
    marginBottom: '30px',
    textAlign: 'center',
  };

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const inputGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  const labelStyle: React.CSSProperties = {
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: 'bold',
  };

  const inputStyle: React.CSSProperties = {
    padding: window.innerWidth <= 768 ? '14px' : '12px',
    borderRadius: '8px',
    border: '1px solid rgba(252, 251, 250, 0.3)',
    backgroundColor: 'rgba(252, 251, 250, 0.1)',
    color: THEME.colors.background,
    fontSize: '16px',
    minHeight: '44px',
    boxSizing: 'border-box',
  };

  const buttonStyle: React.CSSProperties = {
    padding: window.innerWidth <= 768 ? '16px 24px' : '12px 24px',
    backgroundColor: THEME.colors.background,
    color: THEME.colors.primary,
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '10px',
    minHeight: '44px',
  };

  const errorStyle: React.CSSProperties = {
    color: '#ff6b6b',
    fontSize: '14px',
    textAlign: 'center',
    padding: '10px',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderRadius: '8px',
  };

  const testAccountsStyle: React.CSSProperties = {
    marginTop: '30px',
    padding: window.innerWidth <= 768 ? '15px' : '20px',
    backgroundColor: 'rgba(252, 251, 250, 0.1)',
    borderRadius: '8px',
    fontSize: window.innerWidth <= 768 ? '13px' : '14px',
  };

  const accountStyle: React.CSSProperties = {
    margin: '8px 0',
    padding: window.innerWidth <= 768 ? '12px' : '8px',
    backgroundColor: 'rgba(252, 251, 250, 0.1)',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    minHeight: '44px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

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
    } catch (err) {
      const apiError = err as APIError;
      setError(apiError.response?.data?.error || apiError.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const fillTestAccount = (testEmail: string, testPassword: string) => {
    setEmail(testEmail);
    setPassword(testPassword);
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>Oblinor Simple</h1>
        
        <form style={formStyle} onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          {error && <div style={errorStyle}>{error}</div>}

          <button
            type="submit"
            style={buttonStyle}
            disabled={loading}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = 'rgba(252, 251, 250, 0.9)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = THEME.colors.background;
              }
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={testAccountsStyle}>
          <div style={{ fontWeight: 'bold', marginBottom: '12px' }}>
            Test Accounts:
          </div>
          
          <div
            style={accountStyle}
            onClick={() => fillTestAccount('admin@oblinor.no', 'Admin123!')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(252, 251, 250, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(252, 251, 250, 0.1)';
            }}
          >
            <strong>Admin (Level 2):</strong><br />
            admin@oblinor.no / Admin123!
          </div>

          <div
            style={accountStyle}
            onClick={() => fillTestAccount('admin1@oblinor.no', 'Admin123!')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(252, 251, 250, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(252, 251, 250, 0.1)';
            }}
          >
            <strong>Admin (Level 1):</strong><br />
            admin1@oblinor.no / Admin123!
          </div>
          
          <div
            style={accountStyle}
            onClick={() => fillTestAccount('user3@oblinor.no', 'Pass123!')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(252, 251, 250, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(252, 251, 250, 0.1)';
            }}
          >
            <strong>User (Level 3 - Can Subscribe):</strong><br />
            user3@oblinor.no / Pass123!
          </div>

          <div
            style={accountStyle}
            onClick={() => fillTestAccount('user2@oblinor.no', 'Pass123!')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(252, 251, 250, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(252, 251, 250, 0.1)';
            }}
          >
            <strong>User (Level 2 - View Only):</strong><br />
            user2@oblinor.no / Pass123!
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;