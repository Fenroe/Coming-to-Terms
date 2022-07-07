import { axios } from './index'

const getComment = async (id) => {
  const getCommentUrl = `${process.env.REACT_APP_API_URL}/comments/${id}`
  const response = await axios.get(getCommentUrl)
  return response.data.comment
}

export default getComment
