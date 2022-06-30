import { axios } from './index'

const getUser = async (username) => {
  const getUserUrl = `${process.env.REACT_APP_API_URL}/users/userInfo/${username}`
  const response = await axios.get(getUserUrl)
  return response
}

export default getUser
