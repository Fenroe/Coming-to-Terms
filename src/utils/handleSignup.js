import { axios } from './index'

const signupFetchUrl = `${process.env.REACT_APP_API_URL}/users/signup`

const handleSignup = async (username, email, password) => {
  const response = await axios.post(signupFetchUrl, {
    username,
    email,
    password
  })
  if (!response.data.userWasCreated) throw new Error(response.data.message)
  return response
}

export default handleSignup
