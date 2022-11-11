import { axios } from './index'

const updateUserSecurely = async (email, currentPassword, newPassword, token) => {
  const updateUserSecurelyUrl = `${process.env.REACT_APP_API_URL}/profiles/update-credentials`
  const response = await axios.put(updateUserSecurelyUrl, {
    email,
    currentPassword,
    newPassword
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}

export default updateUserSecurely
