import React from 'react'
import PropTypes from 'prop-types'
import { Col, ProfileDrafts, ThreeDots, Dropdown } from './index'
import { useAuth } from '../hooks'

const ProfilePosts = ({ publishedPosts, drafts, username }) => {
  const { auth } = useAuth()

  return (
    <>
      <Col className="md-10" lg={8} xl={7}>
        <h1>Published</h1>
        {publishedPosts.length === 0 && <p>No published posts</p>}
        {publishedPosts.map((post) =>
        <div className="profile-post-container" key={post._id}>
          <a href={`/posts/${post._id}`}>{post.title}</a>
          <Dropdown>
            <Dropdown.Toggle className="comment-options-btn"><ThreeDots /></Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as="div">
                <a href={`/posts/edit/${post._id}`}>Edit post</a>
              </Dropdown.Item>
              <Dropdown.Item>Delete post</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        )}
        {auth.username === username && (
          <ProfileDrafts drafts={drafts} />
        )}
      </Col>
    </>
  )
}

ProfilePosts.propTypes = {
  publishedPosts: PropTypes.array,
  drafts: PropTypes.array,
  username: PropTypes.string
}

export default ProfilePosts
