import { axios } from './index'

const updateUserSecurely = async (username, password, email, newPassword, token) => {
  const updateUserSecurelyUrl = `${process.env.REACT_APP_API_URL}/users/userinfo/sensitiveupdate/${username}`
  const response = await axios.put(updateUserSecurelyUrl, {
    password,
    email,
    newPassword
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}

export default updateUserSecurely
