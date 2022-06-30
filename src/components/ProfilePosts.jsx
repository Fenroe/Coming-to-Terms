import React from 'react'
import PropTypes from 'prop-types'
import { Col } from './index'
// import { useAuth } from '../hooks'

const ProfilePosts = ({ publishedPosts, drafts, username }) => {
  // const { auth } = useAuth()

  return (
    <>
      <Col className="md-10" lg={8} xl={7}>
        <h1>Published</h1>
        {publishedPosts.length === 0 ? <p>No published posts</p> : null}
        {publishedPosts.map((post) =>
          <p key={post._id}>{post.title}</p>
        )}
        <h1>Drafts</h1>
        {drafts.length === 0 ? <p>No drafts</p> : null}
        {drafts.map((post) =>
        <p key={post._id}>{post.title}</p>)}
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
