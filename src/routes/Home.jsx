import React from 'react'
import { Container, Row, Col, Header, RecentPostsContainer, HomeSpinner, MainNav } from '../components'
import { headerImageHome } from '../assets'
import { getRecentPosts } from '../utils'
import { useQuery } from 'react-query'

const Home = () => {
  const { data, status } = useQuery('recentPosts', getRecentPosts)

  return (
    <>
      <MainNav />
      <Header backgroundImage={headerImageHome} heading="Coming to Terms" subheading="One day at a time" />
      <Container className="px-4 px-lg-5">
        <Row className="gx-4 gx-lg-5 justify-content-center">
          <Col className="md-10 col-lg-8 col-xl-7 text-center">
            <h1 className="mb-5 page-heading">Recent Posts</h1>
          </Col>
        </Row>
        <Row className="gx-4 gx-lg-5 justify-content-center">
          {status === 'loading' && <HomeSpinner />}
          {status === 'success' && <RecentPostsContainer recentPosts={data} />}
        </Row>
      </Container>
    </>
  )
}

export default Home
