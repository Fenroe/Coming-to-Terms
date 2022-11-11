import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, PostCard } from './index'

const RecentPostsContainer = ({ recentPosts }) => {
  return (
    <Row className="gx-4 gx-lg-5 justify-content-center">
      <Col className="md-10 col-lg-8 col-xl-7">
        {recentPosts.length === 0
          ? (
          <h2 className="text-center">No posts to show.</h2>
            )
          : null}
        {recentPosts.map((post) =>
        <PostCard
        key={post._id}
        id={post.url}
        title={post.title}
        subtitle={post.previewText}
        author={post.profile.username}
        datePublished={post.datePublishedFormatted}
        />)}
      </Col>
    </Row>
  )
}

RecentPostsContainer.propTypes = {
  recentPosts: PropTypes.array
}

export default RecentPostsContainer
