import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import idmsLogo from '../assets/icons/idms_logo.svg';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (searchParams.get('expired') === 'true') {
      showToast('Your session has expired. Please log in again.', 'error');
    }
  }, [searchParams, showToast]);

  const validate = () => {
    const errs = {};
    if (!email.trim()) errs.email = 'Email or username is required';
    if (!password) errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await login(email, password);
      showToast('Login successful', 'success');
      navigate('/dashboard');
    } catch (err) {
      showToast(err.response?.data?.message || 'Login failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <img src={idmsLogo} alt="IDMS" className="login-logo-mark" />
          <span className="login-logo-divider" />
          <p className="login-tagline">Welcome to HR Admin panel</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <Input
            label="User Name"
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            required
            placeholder="Enter User name"
          />
          <Input
            label="Enter Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            required
            placeholder="Enter Password"
          />

          <div className="login-options">
            <label className="login-checkbox">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              <span>Show Password</span>
            </label>

            <label className="login-checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember Me</span>
            </label>
          </div>

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;