import { axios } from './index'

const deleteUser = async (password, token) => {
  const deleteUserUrl = `${process.env.REACT_APP_API_URL}/profiles/close-account`
  const response = await axios.delete(deleteUserUrl, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      password
    }
  })
  return response
}

export default deleteUser
