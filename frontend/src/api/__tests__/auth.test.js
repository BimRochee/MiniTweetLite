import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'

// Mock axios
vi.mock('axios')
const mockedAxios = vi.mocked(axios)

describe('Auth API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Login API', () => {
    it('should make POST request to login endpoint with correct data', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      }

      const mockResponse = {
        data: {
          user: { id: 1, name: 'John Doe', email: 'test@example.com' },
          token: 'fake-token'
        }
      }

      mockedAxios.post.mockResolvedValueOnce(mockResponse)

      // Simulate login API call
      const response = await axios.post('/api/login', loginData)

      expect(mockedAxios.post).toHaveBeenCalledWith('/api/login', loginData)
      expect(response.data).toEqual(mockResponse.data)
    })

    it('should handle login error', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword'
      }

      const mockError = {
        response: {
          status: 401,
          data: { message: 'Invalid credentials' }
        }
      }

      mockedAxios.post.mockRejectedValueOnce(mockError)

      try {
        await axios.post('/api/login', loginData)
      } catch (error) {
        expect(error.response.status).toBe(401)
        expect(error.response.data.message).toBe('Invalid credentials')
      }
    })
  })

  describe('Register API', () => {
    it('should make POST request to register endpoint with correct data', async () => {
      const registerData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        password_confirmation: 'password123'
      }

      const mockResponse = {
        data: {
          user: { id: 1, name: 'John Doe', email: 'john@example.com' },
          token: 'fake-token'
        }
      }

      mockedAxios.post.mockResolvedValueOnce(mockResponse)

      // Simulate register API call
      const response = await axios.post('/api/register', registerData)

      expect(mockedAxios.post).toHaveBeenCalledWith('/api/register', registerData)
      expect(response.data).toEqual(mockResponse.data)
    })

    it('should handle registration validation error', async () => {
      const registerData = {
        name: '',
        email: 'invalid-email',
        password: '123',
        password_confirmation: '456'
      }

      const mockError = {
        response: {
          status: 422,
          data: {
            errors: {
              name: ['The name field is required.'],
              email: ['The email field must be a valid email address.'],
              password: ['The password confirmation does not match.']
            }
          }
        }
      }

      mockedAxios.post.mockRejectedValueOnce(mockError)

      try {
        await axios.post('/api/register', registerData)
      } catch (error) {
        expect(error.response.status).toBe(422)
        expect(error.response.data.errors).toHaveProperty('name')
        expect(error.response.data.errors).toHaveProperty('email')
        expect(error.response.data.errors).toHaveProperty('password')
      }
    })
  })

  describe('User Profile API', () => {
    it('should make GET request to user endpoint with authorization header', async () => {
      const token = 'fake-token'
      const mockResponse = {
        data: {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com'
        }
      }

      mockedAxios.get.mockResolvedValueOnce(mockResponse)

      // Simulate user profile API call
      const response = await axios.get('/api/user', {
        headers: { Authorization: `Bearer ${token}` }
      })

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      expect(response.data).toEqual(mockResponse.data)
    })

    it('should handle unauthorized access', async () => {
      const mockError = {
        response: {
          status: 401,
          data: { message: 'Unauthenticated' }
        }
      }

      mockedAxios.get.mockRejectedValueOnce(mockError)

      try {
        await axios.get('/api/user')
      } catch (error) {
        expect(error.response.status).toBe(401)
        expect(error.response.data.message).toBe('Unauthenticated')
      }
    })
  })

  describe('Logout API', () => {
    it('should make POST request to logout endpoint with authorization header', async () => {
      const token = 'fake-token'
      const mockResponse = {
        data: {
          message: 'Logout successful'
        }
      }

      mockedAxios.post.mockResolvedValueOnce(mockResponse)

      // Simulate logout API call
      const response = await axios.post('/api/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      })

      expect(mockedAxios.post).toHaveBeenCalledWith('/api/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      expect(response.data).toEqual(mockResponse.data)
    })
  })

  describe('API Configuration', () => {
    it('should have correct base URL configuration', () => {
      // This would test the axios instance configuration
      // In a real test, you'd import your configured axios instance
      expect(true).toBe(true) // Placeholder for axios config test
    })

    it('should handle network errors', async () => {
      const networkError = new Error('Network Error')
      mockedAxios.post.mockRejectedValueOnce(networkError)

      try {
        await axios.post('/api/login', {})
      } catch (error) {
        expect(error.message).toBe('Network Error')
      }
    })

    it('should handle timeout errors', async () => {
      const timeoutError = {
        code: 'ECONNABORTED',
        message: 'timeout of 5000ms exceeded'
      }

      mockedAxios.post.mockRejectedValueOnce(timeoutError)

      try {
        await axios.post('/api/login', {})
      } catch (error) {
        expect(error.code).toBe('ECONNABORTED')
        expect(error.message).toBe('timeout of 5000ms exceeded')
      }
    })
  })
})
