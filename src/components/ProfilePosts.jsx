import React from 'react'
import PropTypes from 'prop-types'
import { Col, ProfileDrafts } from './index'
import { useAuth } from '../hooks'

const ProfilePosts = ({ publishedPosts, drafts, username }) => {
  const { auth } = useAuth()

  return (
    <>
      <Col className="md-10" lg={8} xl={7}>
        <h1>Published</h1>
        {publishedPosts.length === 0 && <p>No published posts</p>}
        {publishedPosts.map((post) =>
        <div key={post._id}>
          <a href={`/posts/${post._id}`}>{post.title}</a>
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
