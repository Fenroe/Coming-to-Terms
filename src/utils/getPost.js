import { axios } from './index'

const getPost = async (postId) => {
  const getPostUrl = `${process.env.REACT_APP_API_URL}/posts/postinfo/${postId}`
  const response = await axios.get(getPostUrl)
  console.log(response.data.post)
  return {
    post: response.data.post,
    comments: response.data.comments
  }
}

export default getPost
