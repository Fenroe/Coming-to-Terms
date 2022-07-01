import { axios } from './index'

const getRecentPosts = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/recent`)
  return response.data.posts
}

export default getRecentPosts
