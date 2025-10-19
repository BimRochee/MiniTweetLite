import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';

const Register = ({ onToggleForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  
  const { register } = useAuth();

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
    setValidationErrors({});

    if (formData.password !== formData.passwordConfirmation) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const result = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.passwordConfirmation
    );
    
    if (!result.success) {
      setError(result.message);
      if (result.errors) {
        setValidationErrors(result.errors);
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 fixed inset-0">
      <div 
        className="relative"
        style={{
          width: '400px',
          height: 'auto',
          minHeight: '437px',
          opacity: '1'
        }}
      >
        <div 
          className="flex flex-col items-center"
          style={{
            width: '400px',
            height: '32px',
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
            Sign up with Email
          </h2>
        </div>
        
        <form className="flex flex-col items-center" onSubmit={handleSubmit} style={{ width: '400px', gap: '16px', marginTop: '32px' }}>
          {/* Firstname and Surname Row */}
          <div className="flex gap-4" style={{ width: '400px' }}>
            <div>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="given-name"
                required
                className="w-[192px] h-[50px] text-gray-900 focus:outline-none"
                placeholder="Firstname"
                value={formData.name}
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
                  letterSpacing: '0%'
                }}
              />
              {validationErrors.name && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.name[0]}</p>
              )}
            </div>
            
            <div>
              <input
                id="surname"
                name="surname"
                type="text"
                autoComplete="family-name"
                required
                className="w-[192px] h-[50px] text-gray-900 focus:outline-none"
                placeholder="Surname"
                value={formData.surname || ''}
                onChange={handleChange}
                style={{
                  paddingTop: '8px',
                  paddingRight: '12px',
                  paddingBottom: '8px',
                  paddingLeft: '12px',
                  gap: '8px',
                  borderRadius: '16px',
                  borderWidth: '0px',
                  backgroundColor: '#12141917',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '15px',
                  lineHeight: '20px',
                  letterSpacing: '0%',
                  opacity: '1'
                }}
              />
            </div>
          </div>
          
          {/* Email Field */}
          <div style={{ width: '400px' }}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-[400px] h-[50px] text-gray-900 focus:outline-none"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              style={{
                paddingTop: '8px',
                paddingRight: '12px',
                paddingBottom: '8px',
                paddingLeft: '12px',
                gap: '8px',
                borderRadius: '16px',
                borderWidth: '0px',
                backgroundColor: '#12141917',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '15px',
                lineHeight: '20px',
                letterSpacing: '0%',
                opacity: '1'
              }}
            />
            {validationErrors.email && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.email[0]}</p>
            )}
          </div>
          
          {/* Password Field */}
          <div style={{ width: '400px' }}>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
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
                borderWidth: '0px',
                backgroundColor: '#12141917',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '15px',
                lineHeight: '20px',
                letterSpacing: '0%',
                opacity: '1'
              }}
            />
            {validationErrors.password && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.password[0]}</p>
            )}
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          {/* Create Account Button */}
          <div style={{ width: '400px', marginTop: '16px' }}>
            <button
              type="submit"
              disabled={loading}
              className="flex justify-center items-center text-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style={{
                width: '400px',
                height: '50px',
                borderRadius: '16px',
                backgroundColor: '#121419',
                opacity: '1',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '500',
                fontSize: '15px',
                lineHeight: '20px'
              }}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </div>

          {/* Terms & Conditions */}
          <div
            className="text-center"
            style={{
              width: '377px',
              height: '20px',
              opacity: '1',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '400',
              fontStyle: 'normal',
              fontSize: '13px',
              lineHeight: '100%',
              letterSpacing: '0%',
              textAlign: 'center',
              color: '#1214199E'
            }}
          >
            By signing up, you agree to our Terms & Conditions.
          </div>

          {/* Login Link */}
          <div
            className="text-center"
            style={{
              width: '377px',
              height: '20px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '400',
              fontStyle: 'normal',
              fontSize: '13px',
              lineHeight: '100%',
              letterSpacing: '0%',
              textAlign: 'center',
              marginTop: '24px'
            }}
          >
            <span style={{ color: '#121419', opacity: '0.62' }}>Have an account already? </span>
            <span 
              className="cursor-pointer hover:underline"
              style={{ color: '#121419', opacity: '1' }}
              onClick={() => onToggleForm && onToggleForm()}
            >
              Log in
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
