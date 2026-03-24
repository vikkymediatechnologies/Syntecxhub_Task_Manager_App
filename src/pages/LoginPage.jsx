import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Inline styles for the page (no external CSS needed)
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Outfit:wght@300;400;500;600&display=swap');

  .login-root {
    min-height: 100vh;
    display: flex;
    font-family: 'Outfit', sans-serif;
    background: #080810;
    overflow: hidden;
    position: relative;
  }

  /* Animated background orbs */
  .login-root::before {
    content: '';
    position: fixed;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(99,56,255,0.18) 0%, transparent 70%);
    top: -200px; left: -200px;
    border-radius: 50%;
    animation: driftA 12s ease-in-out infinite alternate;
    pointer-events: none;
  }
  .login-root::after {
    content: '';
    position: fixed;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(255,80,120,0.12) 0%, transparent 70%);
    bottom: -150px; right: -100px;
    border-radius: 50%;
    animation: driftB 15s ease-in-out infinite alternate;
    pointer-events: none;
  }

  @keyframes driftA {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(80px, 60px) scale(1.15); }
  }
  @keyframes driftB {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(-60px, -80px) scale(1.2); }
  }

  /* Left decorative panel */
  .login-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    position: relative;
    border-right: 1px solid rgba(255,255,255,0.05);
  }

  .login-panel-tagline {
    font-family: 'Playfair Display', serif;
    font-size: clamp(36px, 4vw, 56px);
    font-weight: 900;
    line-height: 1.15;
    color: #f0f0f8;
    margin-bottom: 20px;
    opacity: 0;
    animation: slideUp 0.7s ease 0.2s forwards;
  }

  .login-panel-tagline span {
    background: linear-gradient(135deg, #7c6aff, #ff5080);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .login-panel-sub {
    font-size: 16px;
    color: rgba(255,255,255,0.4);
    font-weight: 300;
    max-width: 380px;
    line-height: 1.7;
    opacity: 0;
    animation: slideUp 0.7s ease 0.4s forwards;
  }

  .login-features {
    margin-top: 48px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    opacity: 0;
    animation: slideUp 0.7s ease 0.6s forwards;
  }

  .login-feature-item {
    display: flex;
    align-items: center;
    gap: 14px;
    color: rgba(255,255,255,0.5);
    font-size: 14px;
  }

  .login-feature-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: linear-gradient(135deg, #7c6aff, #ff5080);
    flex-shrink: 0;
    box-shadow: 0 0 10px rgba(124,106,255,0.6);
  }

  /* Right form panel */
  .login-form-side {
    width: 480px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    position: relative;
  }

  .login-card {
    width: 100%;
    max-width: 400px;
    opacity: 0;
    animation: slideUp 0.6s ease 0.1s forwards;
  }

  .login-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 40px;
  }

  .login-logo-icon {
    width: 42px; height: 42px;
    background: linear-gradient(135deg, #7c6aff, #5b4de8);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif;
    font-weight: 900; font-size: 18px;
    color: #fff;
    box-shadow: 0 8px 24px rgba(124,106,255,0.4);
  }

  .login-logo-text {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: #f0f0f8;
  }

  .login-heading {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 700;
    color: #f0f0f8;
    margin-bottom: 6px;
  }

  .login-subheading {
    font-size: 14px;
    color: rgba(255,255,255,0.35);
    margin-bottom: 36px;
    font-weight: 300;
  }

  .login-field {
    margin-bottom: 20px;
  }

  .login-label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    margin-bottom: 8px;
  }

  .login-input-wrap {
    position: relative;
  }

  .login-input-icon {
    position: absolute;
    left: 14px; top: 50%;
    transform: translateY(-50%);
    color: rgba(255,255,255,0.2);
    font-size: 15px;
    pointer-events: none;
  }

  .login-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 13px 14px 13px 40px;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    color: #f0f0f8;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }

  .login-input::placeholder { color: rgba(255,255,255,0.18); }

  .login-input:focus {
    border-color: rgba(124,106,255,0.6);
    background: rgba(124,106,255,0.06);
    box-shadow: 0 0 0 3px rgba(124,106,255,0.12);
  }

  .login-error {
    background: rgba(255,80,80,0.08);
    border: 1px solid rgba(255,80,80,0.25);
    color: #ff7070;
    padding: 11px 14px;
    border-radius: 10px;
    font-size: 13px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .login-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #7c6aff, #5b4de8);
    border: none;
    border-radius: 10px;
    font-family: 'Outfit', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
    box-shadow: 0 8px 24px rgba(124,106,255,0.35);
    margin-top: 8px;
    position: relative;
    overflow: hidden;
  }

  .login-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
    opacity: 0;
    transition: opacity 0.2s;
  }

  .login-btn:hover:not(:disabled)::after { opacity: 1; }
  .login-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 12px 32px rgba(124,106,255,0.45); }
  .login-btn:active:not(:disabled) { transform: translateY(0); }
  .login-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .login-divider {
    display: flex; align-items: center; gap: 12px;
    margin: 24px 0;
    color: rgba(255,255,255,0.15);
    font-size: 12px;
  }
  .login-divider::before,
  .login-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.08);
  }

  .login-register-link {
    text-align: center;
    font-size: 13px;
    color: rgba(255,255,255,0.3);
  }

  .login-register-link a {
    color: #7c6aff;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s;
  }
  .login-register-link a:hover { color: #a090ff; text-decoration: none; }

  .spin {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    display: inline-block;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Responsive */
  @media (max-width: 768px) {
    .login-panel { display: none; }
    .login-form-side { width: 100%; }
  }
`;

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-root">

        {/* Left decorative panel */}
        <div className="login-panel">
          <div className="login-panel-tagline">
            Manage tasks.<br />
            <span>Stay ahead.</span>
          </div>
          <p className="login-panel-sub">
            TaskFlow helps you organize your work, track priorities,
            and get more done — every single day.
          </p>
          <div className="login-features">
            {[
              'Create & organize tasks with priorities',
              'Track progress with real-time updates',
              'Set due dates and never miss a deadline',
              'Secure — your data is always private',
            ].map((f) => (
              <div className="login-feature-item" key={f}>
                <div className="login-feature-dot" />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Right form panel */}
        <div className="login-form-side">
          <div className="login-card">

            {/* Logo */}
            <div className="login-logo">
              <div className="login-logo-icon">TF</div>
              <span className="login-logo-text">TaskFlow</span>
            </div>

            <h1 className="login-heading">Welcome back</h1>
            <p className="login-subheading">Sign in to continue to your workspace</p>

            {error && (
              <div className="login-error">
                <span>⚠</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="login-field">
                <label className="login-label">Email Address</label>
                <div className="login-input-wrap">
                  <span className="login-input-icon">✉</span>
                  <input
                    className="login-input"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="login-field">
                <label className="login-label">Password</label>
                <div className="login-input-wrap">
                  <span className="login-input-icon">🔒</span>
                  <input
                    className="login-input"
                    type={showPass ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    style={{ paddingRight: '44px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((p) => !p)}
                    style={{
                      position: 'absolute', right: '14px', top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none', border: 'none',
                      color: 'rgba(255,255,255,0.25)', cursor: 'pointer',
                      fontSize: '14px', padding: 0,
                    }}
                  >
                    {showPass ? '🙈' : '👁'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="login-btn"
                disabled={loading}
              >
                {loading
                  ? <><span className="spin" /> Signing in...</>
                  : <>Sign In →</>
                }
              </button>
            </form>

            <div className="login-divider">or</div>

            <p className="login-register-link">
              Don't have an account?{' '}
              <Link to="/register">Create one free</Link>
            </p>

          </div>
        </div>

      </div>
    </>
  );
};

export default LoginPage;