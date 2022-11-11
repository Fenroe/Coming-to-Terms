import { axios } from './index'

const updatePost = async (postId, title, subtitle, content, coverImage, token) => {
  const updatePostUrl = `${process.env.REACT_APP_API_URL}/posts/postinfo/${postId}`
  const response = await axios.put(updatePostUrl, {
    title,
    subtitle,
    content,
    coverImage
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}

export default updatePost
