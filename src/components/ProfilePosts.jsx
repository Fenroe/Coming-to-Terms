import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Col, ThreeDots, Dropdown, DeletePostModal } from './index'
import { useAuth } from '../hooks'
import { deletePost } from '../utils'

const ProfilePosts = ({
  publishedPosts, drafts, username, refetch
}) => {
  const [loading, setLoading] = useState(false)

  const [
    showDeletePostModal,
    setShowDeletePostModal
  ] = useState(false)

  const [postToDelete, setPostToDelete] = useState('')

  const { auth } = useAuth()

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
      <Col className="md-10" lg={8} xl={7}>
        <h1>Published</h1>
        {publishedPosts.length === 0 && <p>No published posts</p>}
        {publishedPosts.map((post) =>
        <div className="profile-post-container" key={post._id}>
          <div className="post-link-wrapper">
            <a className="profile-post-link" href={`/posts/${post._id}`}>{post.title}</a>
          </div>
          {auth.username === username &&
          <Dropdown>
            <Dropdown.Toggle className="comment-options-btn"><ThreeDots /></Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as="div">
                <a href={`/posts/edit/${post._id}`}>Edit post</a>
              </Dropdown.Item>
              <Dropdown.Item>
                <button onClick={() => handleDeleteClick(post._id)} className="profile-post-dropdown-btn">Delete post</button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          }
        </div>
        )}
        {auth.username === username && (
              <div className="">
              <h1>Drafts</h1>
              {drafts.length === 0 && <p>No drafts</p>}
              {drafts.map((post) =>
                <div className="profile-post-container" key={post._id}>
                  <div className="post-link-wrapper">
                    <a href={`/posts/edit/${post._id}`}>{post.title}</a>
                  </div>
                  <Dropdown>
                    <Dropdown.Toggle className="comment-options-btn"><ThreeDots /></Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as="div">
                        <a href={`/posts/edit/${post._id}`}>Edit post</a>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <button onClick={() => handleDeleteClick(post._id)} className="profile-post-dropdown-btn">Delete post</button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}
            </div>
        )}
      </Col>
    </>
  )
}

ProfilePosts.propTypes = {
  publishedPosts: PropTypes.array,
  drafts: PropTypes.array,
  username: PropTypes.string,
  refetch: PropTypes.func
}

export default ProfilePosts
