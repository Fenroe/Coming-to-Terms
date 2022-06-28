import { validateEmail } from '../index'

describe('function correctly returns true', () => {
  test('returns true when arg is valid email', () => {
    expect(validateEmail('example@email.com')).toBe(true)
  })
})

describe('function correctly returns false', () => {
  test('returns false on empty string', () => {
    expect(validateEmail('')).toBe(false)
  })

  test('returns false if no arg provided', () => {
    expect(validateEmail()).toBe(false)
  })

  test('returns false if invalid email pattern #1', () => {
    expect(validateEmail('exampleemailcom')).toBe(false)
  })

  test('returns false if invalid email pattern #2', () => {
    expect(validateEmail('example@email@email.com')).toBe(false)
  })
})

describe('callback works correctly if returned value is true', () => {
  const mockCallback = jest.fn((returnedValue) => returnedValue)

  beforeEach(() => {
    validateEmail('example@email.com', mockCallback)
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
    validateEmail('exampleemail.com', mockCallback)
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
