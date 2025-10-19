import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Register from '../Register.jsx'

// Mock the AuthContext
const mockRegister = vi.fn()
const mockAuthContext = {
  register: mockRegister,
  isAuthenticated: false,
  loading: false
}

vi.mock('../../contexts/AuthContext.jsx', () => ({
  useAuth: () => mockAuthContext
}))

describe('Register Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders register form with all required elements', () => {
    render(<Register />)

    // Check for main heading
    expect(screen.getByText('Sign up with Email')).toBeInTheDocument()
    
    // Check for form inputs
    expect(screen.getByPlaceholderText('Firstname')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Surname')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    
    // Check for buttons
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
    
    // Check for text elements
    expect(screen.getByText('By signing up, you agree to our Terms & Conditions.')).toBeInTheDocument()
    expect(screen.getByText('Have an account already?')).toBeInTheDocument()
    expect(screen.getByText('Log in')).toBeInTheDocument()
  })

  it('calls onToggleForm when Log in link is clicked', async () => {
    const mockOnToggleForm = vi.fn()
    render(<Register onToggleForm={mockOnToggleForm} />)
    
    const logInLink = screen.getByText('Log in')
    await userEvent.click(logInLink)
    
    expect(mockOnToggleForm).toHaveBeenCalledTimes(1)
  })

  it('handles form input correctly', async () => {
    const user = userEvent.setup()
    render(<Register />)
    
    const firstnameInput = screen.getByPlaceholderText('Firstname')
    const surnameInput = screen.getByPlaceholderText('Surname')
    const emailInput = screen.getByPlaceholderText('Email Address')
    const passwordInput = screen.getByPlaceholderText('Password')
    
    await user.type(firstnameInput, 'John')
    await user.type(surnameInput, 'Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(passwordInput, 'password123')
    
    expect(firstnameInput).toHaveValue('John')
    expect(surnameInput).toHaveValue('Doe')
    expect(emailInput).toHaveValue('john@example.com')
    expect(passwordInput).toHaveValue('password123')
  })

  it('uses Poppins font family', () => {
    render(<Register />)
    
    const heading = screen.getByText('Sign up with Email')
    expect(heading).toHaveStyle({
      fontFamily: 'Poppins, sans-serif'
    })
  })

  it('has proper input field styling', () => {
    render(<Register />)
    
    const firstnameInput = screen.getByPlaceholderText('Firstname')
    const emailInput = screen.getByPlaceholderText('Email Address')
    
    // Check firstname (side by side with surname)
    expect(firstnameInput).toHaveClass('w-[192px]')
    expect(firstnameInput).toHaveClass('h-[50px]')
    
    // Check email (full width)
    expect(emailInput).toHaveClass('w-[400px]')
    expect(emailInput).toHaveClass('h-[50px]')
  })

  it('has proper button styling', () => {
    render(<Register />)
    
    const createAccountButton = screen.getByRole('button', { name: /create account/i })
    
    expect(createAccountButton).toHaveStyle({
      width: '400px',
      height: '50px',
      borderRadius: '16px',
      backgroundColor: '#121419'
    })
  })

  it('has proper text styling for Terms & Conditions', () => {
    render(<Register />)
    
    const termsText = screen.getByText('By signing up, you agree to our Terms & Conditions.')
    expect(termsText).toHaveStyle({
      fontSize: '13px'
    })
  })

  it('has proper styling for Log in link', () => {
    render(<Register />)
    
    const logInLink = screen.getByText('Log in')
    expect(logInLink).toHaveStyle({
      color: '#121419',
      opacity: '1'
    })
  })
})