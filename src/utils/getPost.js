import { axios } from './index'

const getPost = async (postId) => {
  const getPostUrl = `${process.env.REACT_APP_API_URL}/posts/postinfo/${postId}`
  const response = await axios.get(getPostUrl)
  console.log(response.data.post)
  return response.data.post
}

export default getPost
