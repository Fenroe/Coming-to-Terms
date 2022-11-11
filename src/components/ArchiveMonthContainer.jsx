import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, PostCard } from './index'

const ArchiveMonthContainer = ({ postArray }) => {
  return (
    <Row className="gx-4 gx-lg-5 justify-content-center">
      <Col className="md-10 col-lg-8 col-xl-7">
        <h1 className="mb-4">{postArray[0].yearAndMonthPublished}</h1>
        {postArray.map((post) =>
        <div key={post._id} className="my-2">
          <PostCard
          id={post.url}
          title={post.title}
          subtitle={post.subtitle}
          author={post.profile.username}
          datePublished={post.datePublishedFormatted}/>
        </div>
        )}
      </Col>
    </Row>
  )
}

ArchiveMonthContainer.propTypes = {
  postArray: PropTypes.array
}

export default ArchiveMonthContainer
