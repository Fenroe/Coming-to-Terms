import { axios } from './index'

const deleteUser = async (username, password, token) => {
  const deleteUserUrl = `${process.env.REACT_APP_API_URL}/users/userinfo/${username}`
  const response = await axios.delete(deleteUserUrl, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      username,
      password
    }
  })
  return response
}

export default deleteUser
