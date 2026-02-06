import React, { useState } from 'react';
import '../styles/app.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSignIn } from "@clerk/clerk-react";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn, isLoaded } = useSignIn();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLoaded) {
      setError('Authentication not loaded');
      return;
    }

    try {
      const result = await signIn.create({
        identifier: email,
        password: password,
      });

      if (result.status === 'complete') {
        navigate('/dashboard');
      } else {
        setError('Sign in requires additional steps');
      }
    } catch (err) {
      console.error('Sign in error:', err);
      setError(err.message || 'Failed to sign in');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left side - Brand/Info */}
        <div className="login-left">
          <div className="login-brand">
            <div className="logo">
              <i className="fas fa-bolt"></i>
              <span>WattWise</span>
            </div>
            <h1>Master Your Energy Consumption</h1>
            <p className="login-description">
              Take control of your electricity bills with real-time tracking, 
              appliance-level breakdown, and smart cost predictions. 
              Stop guessing and start saving.
            </p>
          </div>
          
          <div className="login-features">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="feature-content">
                <h4>Real-time Analytics</h4>
                <p>Monitor usage as it happens</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-crystal-ball"></i>
              </div>
              <div className="feature-content">
                <h4>Cost Predictions</h4>
                <p>Forecast your monthly bills</p>
              </div>
            </div>
          </div>
          
          <div className="login-cta">
            <p>Don't have an account?</p>
            <Link to="/signup" className="btn btn-outline">Sign up for free</Link>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="login-right">
          <div className="login-form-wrapper">
            <div className="login-form-header">
              <h2>Welcome back</h2>
              <p>Enter your credentials to access your dashboard</p>
            </div>

            {error && (
              <div className="error-message" style={{ 
                backgroundColor: '#ffebee', 
                color: '#c62828',
                padding: '10px',
                borderRadius: '4px',
                marginBottom: '15px'
              }}>
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-with-icon">
                    <i className="fas fa-envelope" style={{ left: '20px', zIndex: '10' }}></i>
                     <input
                     type="email"
                     id="email"
                     placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
                style={{ paddingLeft: '60px' }}
                />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-with-icon">
                <i className="fas fa-lock" style={{ left: '20px', zIndex: '10' }}></i>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input"
                    style={{ paddingLeft: '60px' }}
                 />
                </div>
                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <a href="#forgot" className="forgot-link">Forgot password?</a>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Sign In
              </button>

              <div className="divider">
                <span>OR CONTINUE WITH</span>
              </div>

              <div className="social-login">
                <button type="button" className="social-btn google-btn">
                  <i className="fab fa-google"></i>
                  <span>Google</span>
                </button>
                <button type="button" className="social-btn github-btn">
                  <i className="fab fa-github"></i>
                  <span>Github</span>
                </button>
              </div>

              <div className="login-footer">
                <p>
                  By signing in, you agree to our{' '}
                  <a href="#terms">Terms of Service</a> and{' '}
                  <a href="#privacy">Privacy Policy</a>
                </p>
              </div>
            </form>
            
            <div className="back-to-home">
              <Link to="/">
                <i className="fas fa-arrow-left"></i>
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;