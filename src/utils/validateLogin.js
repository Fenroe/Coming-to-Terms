import { validateUsername, validatePassword } from './index'

const validateLogin = (username, password) => {
  if (!validateUsername(username)) return false
  if (!validatePassword(password)) return false
  return true
}

export default validateLogin
