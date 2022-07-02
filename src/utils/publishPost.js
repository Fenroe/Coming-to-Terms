import { axios } from './index'

const publishPost = async (postId, username, token) => {
  const publishPostUrl = `${process.env.REACT_APP_API_URL}/posts/publish/${postId}`
  const response = await axios.put(publishPostUrl, {
    username
  }
  , {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}

export default publishPost
