import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';

const Login = ({ onToggleForm }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (!result.success) {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 fixed inset-0">
      <div className="w-[400px] h-[362px] space-y-8">
        <div 
          className="flex flex-col items-center"
          style={{
            width: '400px',
            height: '60px',
            gap: '8px',
            opacity: '1'
          }}
        >
          <h2 className="w-[400px] h-[32px] text-center text-[#121419]" style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            fontSize: '28px',
            lineHeight: '32px',
            letterSpacing: '-0.02em'
          }}>
            Welcome to MiniTweet
          </h2>
          <p className="w-[400px] h-[20px] text-center text-[#121419]" style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            fontSize: '15px',
            lineHeight: '20px',
            letterSpacing: '0%'
          }}>
            Connect with friends in 20 characters or less
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-[400px] h-[50px] text-gray-900 focus:outline-none"
                placeholder="Email or Username"
                value={formData.email}
                onChange={handleChange}
                style={{
                  paddingTop: '8px',
                  paddingRight: '12px',
                  paddingBottom: '8px',
                  paddingLeft: '12px',
                  gap: '8px',
                  borderRadius: '16px',
                  borderWidth: '1.5px',
                  backgroundColor: '#12141917',
                  borderColor: '#E5E7EB',
                  borderStyle: 'solid',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '15px',
                  lineHeight: '20px',
                  letterSpacing: '0%',
                  '--placeholder-color': '#2E181466',
                  '--placeholder-opacity': '1'
                }}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-[400px] h-[50px] text-gray-900 focus:outline-none"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  paddingTop: '8px',
                  paddingRight: '12px',
                  paddingBottom: '8px',
                  paddingLeft: '12px',
                  gap: '8px',
                  borderRadius: '16px',
                  borderWidth: '1.5px',
                  backgroundColor: '#12141917',
                  borderColor: '#E5E7EB',
                  borderStyle: 'solid',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '15px',
                  lineHeight: '20px',
                  letterSpacing: '0%',
                  '--placeholder-color': '#2E181466',
                  '--placeholder-opacity': '1'
                }}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex justify-center items-center focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style={{
                width: '400px',
                height: '50px',
                borderRadius: '16px',
                backgroundColor: '#121419',
                opacity: '1',
                position: 'relative'
              }}
            >
              <span
                className="text-white"
                style={{
                  width: '44px',
                  height: '20px',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 500,
                  fontSize: '15px',
                  lineHeight: '20px',
                  letterSpacing: '0%',
                  color: '#FFFFFF',
                  opacity: '1'
                }}
              >
                {loading ? 'Signing in...' : 'Log In'}
              </span>
            </button>
          </div>
        </form>
        
        <div>
          <button
            onClick={onToggleForm}
            className="flex justify-center items-center focus:outline-none transition-colors"
            style={{
              width: '400px',
              height: '50px',
              borderRadius: '16px',
              borderWidth: '1.5px',
              padding: '8px',
              backgroundColor: '#FFFFFF',
              borderColor: '#12141933',
              borderStyle: 'solid',
              opacity: '1',
              position: 'relative'
            }}
          >
            <span
              className="text-gray-900"
              style={{
                width: '119px',
                height: '20px',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 500,
                fontSize: '15px',
                lineHeight: '20px',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#121419',
                opacity: '1'
              }}
            >
              Create Account
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
