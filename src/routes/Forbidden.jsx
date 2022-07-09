import React from 'react'
import { MainNav, HeaderAlt, Container, Col, Row } from '../components'

const Forbidden = () => {
  return (
    <>
      <MainNav />
      <HeaderAlt />
      <main className="mb-4">
        <Container className="px-4 px-lg-5">
          <Row className="gx-4 gx-lg-5 justify-content-center">
            <Col className="md-10" lg={8} xl={7}>
              <h2 className="text-center">Sorry, you don&apos;t have permission to view this page.</h2>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

export default Forbidden
