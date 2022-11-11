import { axios } from './index'

const getEditablePost = async (postId, token) => {
  const getPostUrl = `${process.env.REACT_APP_API_URL}/articles/user-article/${postId}`
  const response = await axios.get(getPostUrl, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data.article
}

export default getEditablePost
