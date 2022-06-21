import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { ArticleCard } from '../components'

const Home = () => {
  const [latestPosts, setLatestPosts] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/')
      .then((result) => result.json())
      .then((result) => setLatestPosts(result))
      .catch((error) => console.log(error))
  }, [])

  return (
    <Container as="main">
      <h1>Recent Posts</h1>
      <Row>
      {latestPosts.map((post) =>
        <Col key={post._id} sm={12} md={6} lg={4} >
          <ArticleCard article={post} />
        </Col>
      )}
      </Row>
    </Container>
  )
}

export default Home
