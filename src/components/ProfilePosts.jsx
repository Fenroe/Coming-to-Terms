import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Col, ThreeDots, Dropdown, DeletePostModal } from './index'
import { useAuth } from '../hooks'
import { getUserPosts, getMyPosts, deletePost } from '../utils'
import { useQuery } from 'react-query'

const ProfilePosts = ({
  username, profileId
}) => {
  const [loading, setLoading] = useState(false)

  const { auth } = useAuth()

  const { data, status, refetch } = useQuery(
    `userposts${profileId}`,
    username === auth.username ? () => getMyPosts(auth.token) : () => getUserPosts(profileId)
  )

  const [
    showDeletePostModal,
    setShowDeletePostModal
  ] = useState(false)

  const [postToDelete, setPostToDelete] = useState('')

  const closeModal = () => {
    setShowDeletePostModal(false)
  }

  const handleDeleteClick = (id) => {
    setPostToDelete(id)
    setShowDeletePostModal(true)
  }

  const handleDeletePost = async () => {
    if (loading) return
    if (postToDelete === '') return
    setLoading(true)
    await deletePost(postToDelete, auth.username, auth.token)
    refetch()
    closeModal()
    setPostToDelete('')
    setLoading(false)
  }

  return (
    <>
      {showDeletePostModal &&
      <DeletePostModal
      showCondition={showDeletePostModal}
      handleDeletePost={handleDeletePost}
      closeModal={closeModal}/>}
      {status === 'success' &&
      <Col className="md-10" lg={8} xl={7}>
        <h1>Published</h1>
        {data.filter((article) => article.isPublished && article).length === 0 && <p>No published posts</p>}
        {data.filter((article) => article.isPublished && article).map((post) =>
        <div className="profile-post-container" key={post._id}>
          <div className="post-link-wrapper">
            <Link className="profile-post-link" to={`/posts/${post.url}`}>{post.title}</Link>
          </div>
          {auth.username === username &&
          <Dropdown>
            <Dropdown.Toggle className="comment-options-btn"><ThreeDots /></Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as="div">
                <Link to={`/posts/edit/${post.url}`}>Edit post</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <button onClick={() => handleDeleteClick(post.url)} className="profile-post-dropdown-btn">Delete post</button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          }
        </div>
        )}
        {auth.username === username && (
              <div className="">
              <h1>Drafts</h1>
              {data.filter((article) => !article.isPublished && article).length === 0 && <p>No drafts</p>}
              {data.filter((article) => !article.isPublished && article).map((post) =>
                <div className="profile-post-container" key={post._id}>
                  <div className="post-link-wrapper">
                    <Link to={`/posts/edit/${post.url}`}>{post.title}</Link>
                  </div>
                  <Dropdown>
                    <Dropdown.Toggle className="comment-options-btn"><ThreeDots /></Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as="div">
                        <Link to={`/posts/edit/${post.url}`}>Edit post</Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <button onClick={() => handleDeleteClick(post.url)} className="profile-post-dropdown-btn">Delete post</button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}
            </div>
        )}
      </Col>
      }
    </>
  )
}

ProfilePosts.propTypes = {
  profileId: PropTypes.string,
  username: PropTypes.string
}

export default ProfilePosts
