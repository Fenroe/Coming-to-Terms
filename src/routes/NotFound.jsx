import React from 'react'
import { MainNav, HeaderAlt, Container, Row, Col } from '../components'

const NotFound = () => {
  return (
    <>
      <MainNav />
      <HeaderAlt />
      <main className="mb-4">
        <Container className="px-4 px-lg-5">
          <Row className="gx-4 gx-lg-5 justify-content-center">
            <Col className="md-10" lg={8} xl={7}>
              <h2 className="text-center">Sorry, we couldn&apos;t find this page.</h2>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

export default NotFound
