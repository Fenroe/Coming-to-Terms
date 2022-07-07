import { axios } from './index'

const updateUser = async (username, bio, token) => {
  const updateUserUrl = `${process.env.REACT_APP_API_URL}/users/userinfo/${username}`
  const response = await axios.put(updateUserUrl, {
    bio
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}

export default updateUser
