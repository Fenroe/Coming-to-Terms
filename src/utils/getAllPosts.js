import { axios } from './index'

const getAllPostsUrl = `${process.env.REACT_APP_API_URL}/articles/all`

const getAllPosts = async () => {
  const response = await axios.get(getAllPostsUrl)
  return response.data.articles
}

export default getAllPosts
