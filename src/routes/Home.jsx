import React from 'react'
import { Container, Row, Col, Header } from '../components'
import { headerImageHome } from '../assets'

const Home = () => {
  return (
    <>
      <Header backgroundImage={headerImageHome} heading="Coming to Terms" subheading="One day at a time" />
      <Container className="px-4 px-lg-5">
        <Row className="gx-4 gx-lg-5 justify-content-center">
          <Col className="md-10 col-lg-8 col-xl-7 text-center">
            <h1>Recent Posts</h1>
          </Col>
        </Row>
        <Row className="gx-4 gx-lg-5 justify-content-center">
          <Col className="md-10 col-lg-8 col-xl-7">
            <div className="post-preview">
              <a href="">
                <h2 className="post-title">An Interesting Blog Post</h2>
                <h3 className="post-subtitle">An interesting blog post that also has an interesting subtitle.</h3>
              </a>
              <p className="post-meta">Posted by <a href="">User</a> on September 24 2021</p>
              <hr className="my-4" />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home
