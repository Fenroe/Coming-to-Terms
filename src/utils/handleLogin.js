import { axios } from './index'

const loginFetchUrl = `${process.env.REACT_APP_API_URL}/users/login`

const handleLogin = async (username, password) => {
  const response = await axios.post(loginFetchUrl, {
    username,
    password
  })
  return response
}

export default handleLogin
