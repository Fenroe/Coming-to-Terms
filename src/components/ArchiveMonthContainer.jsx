import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, ArchivePostCard } from './index'

const ArchiveMonthContainer = ({ postArray }) => {
  return (
    <Row className="gx-4 gx-lg-5 justify-content-center">
      <Col className="md-10 col-lg-8 col-xl-7">
        <h1>{postArray[0].yearAndMonthPublished}</h1>
        {postArray.map((post) =>
        <ArchivePostCard
        key={post._id}
        id={post._id}
        title={post.title}
        subtitle={post.previewText}
        author={post.author.username}
        datePublished={post.datePublishedFormatted}
        />)}
      </Col>
    </Row>
  )
}

ArchiveMonthContainer.propTypes = {
  postArray: PropTypes.array
}

export default ArchiveMonthContainer
