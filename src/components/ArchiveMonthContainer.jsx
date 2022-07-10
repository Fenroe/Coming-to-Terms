import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Row, Col } from './index'

const ArchiveMonthContainer = ({ postArray }) => {
  return (
    <Row className="gx-4 gx-lg-5 justify-content-center">
      <Col className="md-10 col-lg-8 col-xl-7">
        <h2 className="mb-4">{postArray[0].yearAndMonthPublished}</h2>
        {postArray.map((post) =>
        <div key={post._id} className="my-2">
          <Link to={`/posts/${post._id}`} className="archive-link">{post.title}</Link>
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
