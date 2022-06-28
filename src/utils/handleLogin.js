import { axios } from './index'

const loginFetchUrl = `${process.env.REACT_APP_API_URL}/users/login`

const handleLogin = async (username, password) => {
  const response = await axios.post(loginFetchUrl, {
    username,
    password
  })
  if (!response.data.loginWasSuccessful) throw new Error(response.data.message)
  return response.data.token
}

export default handleLogin
