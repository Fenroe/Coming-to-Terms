import { validatePassword } from '../index'

describe('function successfully returns true', () => {
  test('returns true if password is over six characters', () => {
    expect(validatePassword('password')).toBe(true)
  })
})

describe('function successfully returns false', () => {
  test('returns false on empty string', () => {
    expect(validatePassword('')).toBe(false)
  })

  test('returns false if no arg provided', () => {
    expect(validatePassword()).toBe(false)
  })

  test('returns false if password is less than six characters', () => {
    expect(validatePassword('pword')).toBe(false)
  })
})

describe('callback works correctly if returned value is true', () => {
  const mockCallback = jest.fn((returnedValue) => returnedValue)

  beforeEach(() => {
    validatePassword('password', mockCallback)
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
    validatePassword('pword', mockCallback)
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
