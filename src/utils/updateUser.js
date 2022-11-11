import { axios } from './index'

const updateUser = async (username, bio, token) => {
  const updateUserUrl = `${process.env.REACT_APP_API_URL}/profiles/update-profile`
  const response = await axios.put(updateUserUrl, {
    username,
    bio
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}

export default updateUser
