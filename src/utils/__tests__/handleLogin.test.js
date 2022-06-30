import axios from 'axios'
import { handleLogin } from '../index'

jest.mock('axios')

describe('returns token on successful request', () => {
  const successfulResponse = {
    status: 200,
    data: {
      loginWasSuccessful: true,
      token: 'token123'
    }
  }

  beforeEach(() => {
    axios.post.mockResolvedValue(successfulResponse)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('function returns promise', () => {
    expect(handleLogin('username, password')).toBeInstanceOf(Promise)
  })

  test('function returns token when resolved', () => {
    expect(handleLogin('username', 'password')).resolves.toBe(successfulResponse)
  })
})
