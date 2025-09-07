import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { THEME, getResponsive, getResponsiveSpacing, ALPHA_COLORS, getResponsiveTypography } from '../constants/theme';
import { APIError } from '../types';

const LoginPage: React.FC = () => {
  const { isMobile } = getResponsive(); // Agent 4's responsive system
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
    padding: getResponsiveSpacing('15px', '20px'),
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: THEME.colors.primary,
    padding: getResponsiveSpacing('30px', '40px'),
    borderRadius: '12px',
    width: '100%',
    maxWidth: isMobile ? '350px' : '400px',
    color: THEME.colors.background,
  };

  const titleStyle: React.CSSProperties = {
    ...getResponsiveTypography('h1'),
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
    ...getResponsiveTypography('caption'),
    fontWeight: 'bold',
  };

  const inputStyle: React.CSSProperties = {
    padding: isMobile ? '14px' : '12px',
    borderRadius: '8px',
    border: `1px solid ${ALPHA_COLORS.background.strong}`,
    backgroundColor: ALPHA_COLORS.background.light,
    color: THEME.colors.background,
    ...getResponsiveTypography('body'),
    minHeight: '44px',
    boxSizing: 'border-box',
  };

  const buttonStyle: React.CSSProperties = {
    padding: isMobile ? '16px 24px' : '12px 24px',
    backgroundColor: THEME.colors.background,
    color: THEME.colors.primary,
    border: 'none',
    borderRadius: '8px',
    ...getResponsiveTypography('body'),
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '10px',
    minHeight: '44px',
  };

  const errorStyle: React.CSSProperties = {
    color: THEME.colors.error,
    fontSize: '14px',
    textAlign: 'center',
    padding: '10px',
    backgroundColor: ALPHA_COLORS.error.light,
    borderRadius: '8px',
  };

  const testAccountsStyle: React.CSSProperties = {
    marginTop: '30px',
    padding: getResponsiveSpacing('15px', '20px'),
    backgroundColor: ALPHA_COLORS.background.light,
    borderRadius: '8px',
    ...getResponsiveTypography('small'),
  };

  const accountStyle: React.CSSProperties = {
    margin: '8px 0',
    padding: isMobile ? '12px' : '8px',
    backgroundColor: ALPHA_COLORS.background.light,
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
                e.currentTarget.style.backgroundColor = ALPHA_COLORS.background.strong;
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
              e.currentTarget.style.backgroundColor = ALPHA_COLORS.background.medium;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = ALPHA_COLORS.background.light;
            }}
          >
            <strong>Admin (Level 2):</strong><br />
            admin@oblinor.no / Admin123!
          </div>

          <div
            style={accountStyle}
            onClick={() => fillTestAccount('admin1@oblinor.no', 'Admin123!')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = ALPHA_COLORS.background.medium;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = ALPHA_COLORS.background.light;
            }}
          >
            <strong>Admin (Level 1):</strong><br />
            admin1@oblinor.no / Admin123!
          </div>
          
          <div
            style={accountStyle}
            onClick={() => fillTestAccount('user3@oblinor.no', 'Pass123!')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = ALPHA_COLORS.background.medium;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = ALPHA_COLORS.background.light;
            }}
          >
            <strong>User (Level 3 - Can Subscribe):</strong><br />
            user3@oblinor.no / Pass123!
          </div>

          <div
            style={accountStyle}
            onClick={() => fillTestAccount('user2@oblinor.no', 'Pass123!')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = ALPHA_COLORS.background.medium;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = ALPHA_COLORS.background.light;
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