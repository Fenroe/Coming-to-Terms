import { axios } from './index'

const getPostComments = async (postId) => {
  const getPostCommentsUrl = `${process.env.REACT_APP_API_URL}/comments/post/${postId}`
  const response = await axios.get(getPostCommentsUrl)
  return response.data.comments
}

export default getPostComments
