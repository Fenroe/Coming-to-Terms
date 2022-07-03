import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Header, RecentPostsContainer, HomeSpinner, MainNav } from '../components'
import { headerImageHome } from '../assets'
import { getRecentPosts } from '../utils'

const Home = () => {
  const [recentPosts, setRecentPosts] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRecentPosts()
      .then((result) => setRecentPosts(result))
      .then(() => setLoading(false))
  }, [])
  return (
    <>
      <MainNav />
      <Header backgroundImage={headerImageHome} heading="Coming to Terms" subheading="One day at a time" />
      <Container className="px-4 px-lg-5">
        <Row className="gx-4 gx-lg-5 justify-content-center">
          <Col className="md-10 col-lg-8 col-xl-7 text-center">
            <h1>Recent Posts</h1>
          </Col>
        </Row>
        <Row className="gx-4 gx-lg-5 justify-content-center">
          {loading ? <HomeSpinner /> : <RecentPostsContainer recentPosts={recentPosts} /> }
        </Row>
      </Container>
    </>
  )
}

export default Home
