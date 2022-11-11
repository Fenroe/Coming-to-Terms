import { axios } from './index'

const getUserPosts = async (profileId) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/articles/all?profile=${profileId}`)
  console.log(response.data.articles)
  return response.data.articles
}

export default getUserPosts
