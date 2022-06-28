import { comparePasswords } from '../index'

describe('function correctly returns false', () => {
  test('returns false on undefined args', () => {
    expect(comparePasswords()).toBe(false)
  })

  test('returns false if both args are empty strings', () => {
    expect(comparePasswords('', '')).toBe(false)
  })

  test('returns false if args don\'t match', () => {
    expect(comparePasswords('password', 'wordpass')).toBe(false)
  })
})

describe('function correctly returns true', () => {
  test('returns true if args match', () => {
    expect(comparePasswords('password', 'password')).toBe(true)
  })
})

describe('callback works correctly if returned value is true', () => {
  const mockCallback = jest.fn((returnedValue) => returnedValue)

  beforeEach(() => {
    comparePasswords('password', 'password', mockCallback)
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
    comparePasswords('password', 'wordpass', mockCallback)
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
