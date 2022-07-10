import React from 'react'
import { Row, Col } from './index'

const NetworkError = () => {
  return (
    <Row className="gx-4 gx-lg-5 justify-content-center">
      <Col className="md-10 col-lg-8 col-xl-7 text-center">
        <h2 className="text-center">The server isn&apos;t sending a response. Something might be wrong on our end.</h2>
      </Col>
    </Row>
  )
}

export default NetworkError
