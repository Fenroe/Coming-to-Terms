import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Header, PostCard } from '../components'
import { headerImageHome } from '../assets'
import { axios } from '../utils'

const Home = () => {
  const [recentPosts, setRecentPosts] = useState([])

  useEffect(() => {
    const getRecentPosts = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/recent`)
      setRecentPosts(response.data.posts)
    }

    getRecentPosts()
  }, [])
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
            {recentPosts.length === 0
              ? (
              <p>No posts to show.</p>
                )
              : null}
            {recentPosts.map((post) =>
            <PostCard key={post._id} />)}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home
