import { axios } from './index'

const deleteComment = async (commentId, username, token) => {
  const deleteCommentUrl = `${process.env.REACT_APP_API_URL}/comments/${commentId}`
  const response = await axios.delete(deleteCommentUrl, {
    username,
    token
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data.comment
}

export default deleteComment
