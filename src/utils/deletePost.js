import { axios } from './index'

const deletePost = async (postId, username, token) => {
  const deletePostUrl = `${process.env.REACT_APP_API_URL}/posts/${postId}`
  const response = await axios.delete(deletePostUrl, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      username,
      postId
    }
  })
  return response.data
}

export default deletePost
