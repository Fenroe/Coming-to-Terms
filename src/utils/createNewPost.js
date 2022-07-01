import { axios } from './index'

const createNewPostUrl = `${process.env.REACT_APP_API_URL}/posts/new`

const createNewPost = async (title, username, token) => {
  const response = await axios.post(createNewPostUrl, {
    title,
    username
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data.post._id
}

export default createNewPost
