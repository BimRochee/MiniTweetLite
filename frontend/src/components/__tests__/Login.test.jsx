import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Login from '../Login.jsx'

// Mock the AuthContext
const mockLogin = vi.fn()
const mockAuthContext = {
  login: mockLogin,
  isAuthenticated: false,
  loading: false
}

vi.mock('../../contexts/AuthContext.jsx', () => ({
  useAuth: () => mockAuthContext
}))

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders login form with all required elements', () => {
    render(<Login />)

    // Check for main heading
    expect(screen.getByText('Welcome to MiniTweet')).toBeInTheDocument()
    
    // Check for subtitle
    expect(screen.getByText('Connect with friends in 20 characters or less')).toBeInTheDocument()
    
    // Check for form inputs
    expect(screen.getByPlaceholderText('Email or Username')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    
    // Check for buttons
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
  })

  it('calls onToggleForm when Create Account button is clicked', async () => {
    const mockOnToggleForm = vi.fn()
    render(<Login onToggleForm={mockOnToggleForm} />)
    
    const createAccountButton = screen.getByRole('button', { name: /create account/i })
    await userEvent.click(createAccountButton)
    
    expect(mockOnToggleForm).toHaveBeenCalledTimes(1)
  })

  it('handles form input correctly', async () => {
    const user = userEvent.setup()
    render(<Login />)
    
    const emailInput = screen.getByPlaceholderText('Email or Username')
    const passwordInput = screen.getByPlaceholderText('Password')
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    
    expect(emailInput).toHaveValue('test@example.com')
    expect(passwordInput).toHaveValue('password123')
  })

  it('has proper heading styling', () => {
    render(<Login />)
    
    const heading = screen.getByText('Welcome to MiniTweet')
    expect(heading).toHaveStyle({
      fontFamily: 'Poppins, sans-serif'
    })
  })

  it('has proper input field styling', () => {
    render(<Login />)
    
    const emailInput = screen.getByPlaceholderText('Email or Username')
    
    // Check that the input has the expected classes and basic styling
    expect(emailInput).toHaveClass('w-[400px]')
    expect(emailInput).toHaveClass('h-[50px]')
  })

  it('has proper button styling', () => {
    render(<Login />)
    
    const loginButton = screen.getByRole('button', { name: /log in/i })
    
    expect(loginButton).toHaveStyle({
      width: '400px',
      height: '50px',
      borderRadius: '16px',
      backgroundColor: '#121419'
    })
  })
})