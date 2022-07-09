import { axios } from './index'

const updatePost = async (postId, username, title, previewText, coverImage, content, token) => {
  const updatePostUrl = `${process.env.REACT_APP_API_URL}/posts/postinfo/${postId}`
  const response = await axios.put(updatePostUrl, {
    postId,
    username,
    title,
    previewText,
    coverImage,
    content
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}

export default updatePost
