import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from './index'

const UserNotFound = ({ username }) => {
  return (
    <Row className="gx-4 gx-lg-5 justify-content-center">
      <Col className="md-10" lg={8} xl={7}>
        <h1>Couldn&apos;t find user &quot;{username}&quot;</h1>
      </Col>
    </Row>
  )
}

UserNotFound.propTypes = {
  username: PropTypes.string
}

export default UserNotFound
