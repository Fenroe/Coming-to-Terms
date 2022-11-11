import { axios } from './index'

const getMyPosts = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/articles/all-user`)
  return response.data.articles
}

export default getMyPosts
