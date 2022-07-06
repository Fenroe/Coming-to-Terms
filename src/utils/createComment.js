import { axios } from './index'

const createCommentUrl = `${process.env.REACT_APP_API_URL}/comments`

const createComment = async (username, postId, content, token) => {
  const response = await axios.post(createCommentUrl, {
    username,
    postId,
    content,
    token
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data.comment
}

export default createComment
