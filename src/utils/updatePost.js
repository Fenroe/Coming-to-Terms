import { axios } from './index'

const updatePost = async (postId, username, title, previewText, content, token) => {
  const updatePostUrl = `${process.env.REACT_APP_API_URL}/posts/postinfo/${postId}`
  const response = await axios.put(updatePostUrl, {
    postId,
    username,
    title,
    previewText,
    content
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}

export default updatePost
