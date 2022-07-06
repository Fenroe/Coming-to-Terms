import { axios } from './index'

const updateComment = async (commentId, username, content, token) => {
  const updateCommentUrl = `${process.env.REACT_APP_API_URL}/comments/${commentId}`
  const response = await axios.put(updateCommentUrl, {
    username,
    content,
    token
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data.comment
}

export default updateComment
