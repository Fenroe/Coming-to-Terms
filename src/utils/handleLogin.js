import { axios } from './index'

const loginFetchUrl = `${process.env.REACT_APP_API_URL}/profiles/login`

const handleLogin = async (email, password) => {
  const response = await axios.post(loginFetchUrl, {
    email,
    password
  })
  return response
}

export default handleLogin
