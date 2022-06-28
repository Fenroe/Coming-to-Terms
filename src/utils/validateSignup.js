import { validateUsername, validateEmail, validatePassword, comparePasswords } from './index'

const validateSignup = (username, email, firstPassword, secondPassword) => {
  if (!validateUsername(username)) return false
  if (!validateEmail(email)) return false
  if (!validatePassword(firstPassword)) return false
  if (!comparePasswords(firstPassword, secondPassword)) return false
  return true
}

export default validateSignup
