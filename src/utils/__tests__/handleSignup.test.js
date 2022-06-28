import axios from 'axios'
import { handleSignup } from '../index'

jest.mock('axios')

const successfulResponse = {
  status: 201,
  data: {
    userWasCreated: true,
    message: 'User created'
  }
}

describe('returns result on successful request', () => {
  beforeEach(() => {
    axios.post.mockResolvedValue(successfulResponse)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('function returns promise', () => {
    expect(handleSignup('username', 'email@email.com', 'password')).toBeInstanceOf(Promise)
  })

  test('function returns result when resolved', () => {
    expect(handleSignup('username', 'email@email.com', 'password')).resolves.toBe(successfulResponse)
  })
})
