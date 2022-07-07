import { axios } from './index'

const deleteComment = async (commentId, username, token) => {
  const deleteCommentUrl = `${process.env.REACT_APP_API_URL}/comments/${commentId}`
  const response = await axios.delete(deleteCommentUrl, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      username
    }
  })
  return response.data.comment
}

export default deleteComment
