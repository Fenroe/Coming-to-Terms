import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from './index'

const ArchiveMonthContainer = ({ postArray }) => {
  return (
    <Row className="gx-4 gx-lg-5 justify-content-center">
      <Col className="md-10 col-lg-8 col-xl-7">
        <h2 className="mb-4">{postArray[0].yearAndMonthPublished}</h2>
        {postArray.map((post) =>
        <div key={post._id} className="my-2">
          <a className="archive-link" href={`/coming-to-terms/posts/${post._id}`}>{post.title}</a>
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
