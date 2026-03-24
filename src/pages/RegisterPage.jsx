import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Outfit:wght@300;400;500;600;700&display=swap');

  .reg-root {
    min-height: 100vh;
    display: flex;
    font-family: 'Outfit', sans-serif;
    background: #080810;
    overflow: hidden;
    position: relative;
  }

  /* Ambient orbs */
  .reg-root::before {
    content: '';
    position: fixed;
    width: 550px; height: 550px;
    background: radial-gradient(circle, rgba(99,56,255,0.15) 0%, transparent 70%);
    bottom: -180px; left: -150px;
    border-radius: 50%;
    animation: regDriftA 14s ease-in-out infinite alternate;
    pointer-events: none;
    z-index: 0;
  }
  .reg-root::after {
    content: '';
    position: fixed;
    width: 480px; height: 480px;
    background: radial-gradient(circle, rgba(34,211,160,0.09) 0%, transparent 70%);
    top: -120px; right: -120px;
    border-radius: 50%;
    animation: regDriftB 17s ease-in-out infinite alternate;
    pointer-events: none;
    z-index: 0;
  }

  @keyframes regDriftA {
    from { transform: translate(0,0) scale(1); }
    to   { transform: translate(60px,-50px) scale(1.1); }
  }
  @keyframes regDriftB {
    from { transform: translate(0,0) scale(1); }
    to   { transform: translate(-50px,70px) scale(1.15); }
  }

  /* ── LEFT PANEL ── */
  .reg-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    position: relative;
    z-index: 1;
    border-right: 1px solid rgba(255,255,255,0.04);
  }

  .reg-panel-eyebrow {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #7c6aff;
    margin-bottom: 18px;
    opacity: 0;
    animation: regSlideUp 0.6s ease 0.1s forwards;
  }

  .reg-panel-heading {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 3.5vw, 52px);
    font-weight: 900;
    line-height: 1.15;
    color: #f0f0f8;
    margin-bottom: 20px;
    opacity: 0;
    animation: regSlideUp 0.6s ease 0.2s forwards;
  }

  .reg-panel-heading em {
    font-style: normal;
    background: linear-gradient(135deg, #22d3a0, #7c6aff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .reg-panel-body {
    font-size: 15px;
    color: rgba(255,255,255,0.35);
    font-weight: 300;
    line-height: 1.75;
    max-width: 360px;
    margin-bottom: 48px;
    opacity: 0;
    animation: regSlideUp 0.6s ease 0.3s forwards;
  }

  /* Steps */
  .reg-steps {
    display: flex;
    flex-direction: column;
    gap: 20px;
    opacity: 0;
    animation: regSlideUp 0.6s ease 0.42s forwards;
  }

  .reg-step {
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }

  .reg-step-num {
    width: 32px; height: 32px;
    border-radius: 10px;
    background: rgba(124,106,255,0.12);
    border: 1px solid rgba(124,106,255,0.25);
    color: #7c6aff;
    font-size: 13px;
    font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    font-family: 'Playfair Display', serif;
  }

  .reg-step-text strong {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: rgba(255,255,255,0.75);
    margin-bottom: 2px;
  }

  .reg-step-text span {
    font-size: 13px;
    color: rgba(255,255,255,0.28);
    font-weight: 300;
  }

  /* ── RIGHT FORM PANEL ── */
  .reg-form-side {
    width: 500px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    position: relative;
    z-index: 1;
    overflow-y: auto;
  }

  .reg-card {
    width: 100%;
    max-width: 420px;
    opacity: 0;
    animation: regSlideUp 0.6s ease 0.05s forwards;
  }

  /* Logo */
  .reg-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 36px;
  }

  .reg-logo-icon {
    width: 42px; height: 42px;
    background: linear-gradient(135deg, #22d3a0, #12b088);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif;
    font-weight: 900; font-size: 17px;
    color: #fff;
    box-shadow: 0 8px 24px rgba(34,211,160,0.35);
  }

  .reg-logo-text {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: #f0f0f8;
  }

  .reg-heading {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 700;
    color: #f0f0f8;
    margin-bottom: 4px;
  }

  .reg-subheading {
    font-size: 14px;
    color: rgba(255,255,255,0.3);
    margin-bottom: 32px;
    font-weight: 300;
    line-height: 1.5;
  }

  /* Progress bar */
  .reg-progress-wrap {
    margin-bottom: 28px;
  }

  .reg-progress-label {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: rgba(255,255,255,0.25);
    margin-bottom: 7px;
    letter-spacing: 0.04em;
  }

  .reg-progress-track {
    height: 3px;
    background: rgba(255,255,255,0.06);
    border-radius: 2px;
    overflow: hidden;
  }

  .reg-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #22d3a0, #7c6aff);
    border-radius: 2px;
    transition: width 0.4s ease;
  }

  /* Fields */
  .reg-field {
    margin-bottom: 16px;
  }

  .reg-label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 7px;
  }

  .reg-input-wrap {
    position: relative;
  }

  .reg-input-icon {
    position: absolute;
    left: 13px; top: 50%;
    transform: translateY(-50%);
    color: rgba(255,255,255,0.18);
    font-size: 14px;
    pointer-events: none;
  }

  .reg-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 13px 14px 13px 38px;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    color: #f0f0f8;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }

  .reg-input::placeholder { color: rgba(255,255,255,0.15); }

  .reg-input:focus {
    border-color: rgba(34,211,160,0.5);
    background: rgba(34,211,160,0.05);
    box-shadow: 0 0 0 3px rgba(34,211,160,0.1);
  }

  .reg-input.valid {
    border-color: rgba(34,211,160,0.4);
  }

  .reg-input.error {
    border-color: rgba(255,80,80,0.5);
    background: rgba(255,80,80,0.04);
  }

  /* Password strength */
  .reg-strength {
    margin-top: 8px;
    display: flex;
    gap: 4px;
    align-items: center;
  }

  .reg-strength-bar {
    height: 3px;
    flex: 1;
    border-radius: 2px;
    background: rgba(255,255,255,0.06);
    transition: background 0.3s;
  }

  .reg-strength-label {
    font-size: 11px;
    color: rgba(255,255,255,0.25);
    min-width: 40px;
    text-align: right;
  }

  /* Error banner */
  .reg-error {
    background: rgba(255,80,80,0.08);
    border: 1px solid rgba(255,80,80,0.2);
    color: #ff8080;
    padding: 11px 14px;
    border-radius: 10px;
    font-size: 13px;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* Submit button */
  .reg-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #22d3a0, #12b088);
    border: none;
    border-radius: 10px;
    font-family: 'Outfit', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
    box-shadow: 0 8px 24px rgba(34,211,160,0.3);
    margin-top: 6px;
    position: relative;
    overflow: hidden;
  }

  .reg-btn::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
    opacity: 0;
    transition: opacity 0.2s;
  }

  .reg-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(34,211,160,0.4); }
  .reg-btn:hover:not(:disabled)::after { opacity: 1; }
  .reg-btn:active:not(:disabled) { transform: translateY(0); }
  .reg-btn:disabled { opacity: 0.55; cursor: not-allowed; }

  /* Divider */
  .reg-divider {
    display: flex; align-items: center; gap: 12px;
    margin: 22px 0;
    color: rgba(255,255,255,0.12);
    font-size: 12px;
  }
  .reg-divider::before,
  .reg-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.06);
  }

  .reg-login-link {
    text-align: center;
    font-size: 13px;
    color: rgba(255,255,255,0.28);
  }

  .reg-login-link a {
    color: #22d3a0;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s;
  }
  .reg-login-link a:hover { color: #5eecc4; text-decoration: none; }

  /* Password toggle */
  .reg-eye-btn {
    position: absolute;
    right: 12px; top: 50%;
    transform: translateY(-50%);
    background: none; border: none;
    color: rgba(255,255,255,0.2);
    cursor: pointer; font-size: 14px; padding: 0;
    transition: color 0.2s;
  }
  .reg-eye-btn:hover { color: rgba(255,255,255,0.5); }

  /* Checkmark in input */
  .reg-check {
    position: absolute;
    right: 12px; top: 50%;
    transform: translateY(-50%);
    color: #22d3a0;
    font-size: 14px;
  }

  .spin {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    display: inline-block;
  }

  @keyframes regSlideUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @media (max-width: 800px) {
    .reg-panel { display: none; }
    .reg-form-side { width: 100%; }
  }
`;

// Password strength helper
const getStrength = (pw) => {
  if (!pw) return { score: 0, label: '', color: '' };
  let score = 0;
  if (pw.length >= 6)  score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { score, label: 'Weak',   color: '#ff5c5c' };
  if (score <= 3) return { score, label: 'Fair',   color: '#f5a623' };
  return              { score, label: 'Strong', color: '#22d3a0' };
};

const FIELDS = [
  { name: 'name',     label: 'Full Name',        type: 'text',     placeholder: 'John Doe',          icon: '👤' },
  { name: 'email',    label: 'Email Address',     type: 'email',    placeholder: 'you@example.com',   icon: '✉' },
  { name: 'password', label: 'Password',          type: 'password', placeholder: 'Min. 6 characters', icon: '🔒' },
  { name: 'confirm',  label: 'Confirm Password',  type: 'password', placeholder: 'Repeat password',   icon: '🔒' },
];

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm]       = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [showPw, setShowPw]   = useState({ password: false, confirm: false });

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const toggleShow = (field) =>
    setShowPw((p) => ({ ...p, [field]: !p[field] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    if (form.password.length < 6)       { setError('Password must be at least 6 characters'); return; }
    setLoading(true); setError('');
    try {
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const strength = getStrength(form.password);

  // How many fields are filled
  const filled = Object.values(form).filter(Boolean).length;
  const progress = Math.round((filled / 4) * 100);

  return (
    <>
      <style>{styles}</style>
      <div className="reg-root">

        {/* ── Left Panel ── */}
        <div className="reg-panel">
          <div className="reg-panel-eyebrow">✦ Start for free</div>
          <h1 className="reg-panel-heading">
            Build habits.<br />
            <em>Achieve more.</em>
          </h1>
          <p className="reg-panel-body">
            Join thousands of people who use TaskFlow to organize
            their day, hit their goals, and never drop the ball.
          </p>

          <div className="reg-steps">
            {[
              { n: '1', title: 'Create your free account',    sub: 'No credit card required' },
              { n: '2', title: 'Add your first tasks',        sub: 'Set priorities & due dates' },
              { n: '3', title: 'Track & complete your goals', sub: 'Stay on top of everything' },
            ].map((s) => (
              <div className="reg-step" key={s.n}>
                <div className="reg-step-num">{s.n}</div>
                <div className="reg-step-text">
                  <strong>{s.title}</strong>
                  <span>{s.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Form Panel ── */}
        <div className="reg-form-side">
          <div className="reg-card">

            {/* Logo */}
            <div className="reg-logo">
              <div className="reg-logo-icon">TF</div>
              <span className="reg-logo-text">TaskFlow</span>
            </div>

            <h2 className="reg-heading">Create your account</h2>
            <p className="reg-subheading">
              Free forever. No credit card needed.
            </p>

            {/* Progress bar */}
            <div className="reg-progress-wrap">
              <div className="reg-progress-label">
                <span>Form completion</span>
                <span>{progress}%</span>
              </div>
              <div className="reg-progress-track">
                <div className="reg-progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {error && (
              <div className="reg-error">
                <span>⚠</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {FIELDS.map((field) => {
                const isPassword = field.type === 'password';
                const isVisible  = showPw[field.name];
                const val        = form[field.name];
                const isValid    = val.length > 0;
                const isMismatch = field.name === 'confirm' && val && val !== form.password;
                const inputClass = [
                  'reg-input',
                  isValid && !isMismatch ? 'valid' : '',
                  isMismatch ? 'error' : '',
                ].filter(Boolean).join(' ');

                return (
                  <div className="reg-field" key={field.name}>
                    <label className="reg-label">{field.label}</label>
                    <div className="reg-input-wrap">
                      <span className="reg-input-icon">{field.icon}</span>
                      <input
                        className={inputClass}
                        type={isPassword && isVisible ? 'text' : field.type}
                        name={field.name}
                        value={val}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required
                        autoComplete={
                          field.name === 'email'    ? 'email' :
                          field.name === 'name'     ? 'name'  :
                          field.name === 'password' ? 'new-password' : 'new-password'
                        }
                        style={{
                          paddingRight: (isPassword || isValid) ? '40px' : '14px',
                        }}
                      />

                      {/* Show/hide toggle for password fields */}
                      {isPassword && (
                        <button
                          type="button"
                          className="reg-eye-btn"
                          onClick={() => toggleShow(field.name)}
                          tabIndex={-1}
                        >
                          {isVisible ? '🙈' : '👁'}
                        </button>
                      )}

                      {/* Checkmark for non-password valid fields */}
                      {!isPassword && isValid && (
                        <span className="reg-check">✓</span>
                      )}
                    </div>

                    {/* Password strength meter */}
                    {field.name === 'password' && val && (
                      <div className="reg-strength">
                        {[1,2,3,4,5].map((i) => (
                          <div
                            key={i}
                            className="reg-strength-bar"
                            style={{
                              background: i <= strength.score ? strength.color : undefined,
                            }}
                          />
                        ))}
                        <span
                          className="reg-strength-label"
                          style={{ color: strength.color }}
                        >
                          {strength.label}
                        </span>
                      </div>
                    )}

                    {/* Mismatch hint */}
                    {isMismatch && (
                      <p style={{
                        fontSize: '11px', color: '#ff8080',
                        marginTop: '5px', marginLeft: '2px',
                      }}>
                        Passwords don't match
                      </p>
                    )}
                  </div>
                );
              })}

              <button
                type="submit"
                className="reg-btn"
                disabled={loading}
                style={{ marginTop: '8px' }}
              >
                {loading
                  ? <><span className="spin" /> Creating account...</>
                  : <>Create Account →</>
                }
              </button>
            </form>

            <div className="reg-divider">or</div>

            <p className="reg-login-link">
              Already have an account?{' '}
              <Link to="/login">Sign in instead</Link>
            </p>

          </div>
        </div>

      </div>
    </>
  );
};

export default RegisterPage;