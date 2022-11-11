import { axios } from './index'

const getMyPosts = async (token) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/articles/all-user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data.articles
}

export default getMyPosts
