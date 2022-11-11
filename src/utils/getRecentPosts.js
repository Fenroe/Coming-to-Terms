import { axios } from './index'

const getRecentPosts = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/articles/all`)
  console.log(response.data.articles)
  return response.data.articles
}

export default getRecentPosts
