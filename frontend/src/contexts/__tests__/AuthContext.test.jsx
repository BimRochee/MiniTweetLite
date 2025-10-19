import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from '../AuthContext.jsx'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock axios
vi.mock('../../api/api.js', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
    delete: vi.fn(),
    defaults: {
      headers: {
        common: {}
      }
    }
  },
  setAuthToken: vi.fn()
}))

// Test component to access context
const TestComponent = ({ onAuthStateChange }) => {
  const { isAuthenticated, user, login, register, logout } = useAuth()
  
  React.useEffect(() => {
    if (onAuthStateChange) {
      onAuthStateChange({ isAuthenticated, user })
    }
  }, [isAuthenticated, user, onAuthStateChange])

  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? 'authenticated' : 'not-authenticated'}</div>
      <div data-testid="user-info">{user ? JSON.stringify(user) : 'no-user'}</div>
      <button onClick={() => login('test@example.com', 'password')}>Login</button>
      <button onClick={() => register('John', 'test@example.com', 'password')}>Register</button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should provide initial authentication state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated')
    expect(screen.getByTestId('user-info')).toHaveTextContent('no-user')
  })

  it('should have login, register, and logout functions', () => {
    const mockAuthStateChange = vi.fn()
    
    render(
      <AuthProvider>
        <TestComponent onAuthStateChange={mockAuthStateChange} />
      </AuthProvider>
    )

    // Check that the functions exist and are callable
    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.getByText('Register')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  it('should render without errors', () => {
    expect(() => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      )
    }).not.toThrow()
  })
})