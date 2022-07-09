import React from 'react'
import { Row, Col, Spinner } from './index'

const HomeSpinner = () => {
  return (
    <Row className="gx-4 gx-lg-5 justify-content-center">
      <Col className="md-10 col-lg-8 col-xl-7 text-center">
        <Spinner animation="border" size="lg"/>
      </Col>
    </Row>
  )
}

export default HomeSpinner
