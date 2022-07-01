import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from './index'

const ArchiveMonthContainer = ({ postArray }) => {
  return (
    <Row className="gx-4 gx-lg-5 justify-content-center">
      <Col className="md-10 col-lg-8 col-xl-7 text-center">
        <h2>{postArray[0].yearAndMonthPublished}</h2>
      </Col>
      {postArray.map((post) =>
      <h1 key={post._id}>Post</h1>)}
    </Row>
  )
}

ArchiveMonthContainer.propTypes = {
  postArray: PropTypes.array
}

export default ArchiveMonthContainer
