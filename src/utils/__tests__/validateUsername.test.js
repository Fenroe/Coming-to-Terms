import { validateUsername } from '../index'

describe('function correctly returns false', () => {
  test('returns false on empty string', () => {
    expect(validateUsername('')).toBe(false)
  })

  test('returns false on no arg provided', () => {
    expect(validateUsername()).toBe(false)
  })

  test('returns false if username too short', () => {
    expect(validateUsername('un')).toBe(false)
  })

  test('returns false if username too long', () => {
    expect(validateUsername('veryveryveryveryverylongname')).toBe(false)
  })

  test('returns false if username contains whitespace', () => {
    expect(validateUsername('user name')).toBe(false)
  })

  test('returns false if username contains special characters other than underscore', () => {
    expect(validateUsername('username%^&*()@£$')).toBe(false)
  })
})

describe('function correctly returns true', () => {
  test('returns true if username is alphanumeric', () => {
    expect(validateUsername('username123')).toBe(true)
  })

  test('returns true if username is alphanumeric with an underscore', () => {
    expect(validateUsername('user_name123')).toBe(true)
  })
})

describe('callback works correctly if returned value is true', () => {
  const mockCallback = jest.fn((returnedValue) => returnedValue)

  beforeEach(() => {
    validateUsername('username_123', mockCallback)
  })

  test('callback only runs once', () => {
    expect(mockCallback.mock.calls.length).toBe(1)
  })

  test('callback arg is true', () => {
    expect(mockCallback.mock.calls[0][0]).toBe(true)
  })

  test('callback arg is boolean', () => {
    expect(typeof mockCallback.mock.calls[0][0]).toBe('boolean')
  })
})

describe('callback works correctly if returned value is false', () => {
  const mockCallback = jest.fn((returnedValue) => returnedValue)

  beforeEach(() => {
    validateUsername('usern@me123', mockCallback)
  })

  test('callback only runs once', () => {
    expect(mockCallback.mock.calls.length).toBe(1)
  })

  test('callback arg is false', () => {
    expect(mockCallback.mock.calls[0][0]).toBe(false)
  })

  test('callback arg is boolean', () => {
    expect(typeof mockCallback.mock.calls[0][0]).toBe('boolean')
  })
})
