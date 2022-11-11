import React from 'react'
import { MainNav, HeaderAlt, Container, Row, Col, ArchiveMonthContainer, HomeSpinner, NetworkError } from '../components'
import { organiseArchive, getAllPosts } from '../utils'
import { useQuery } from 'react-query'

const Archive = () => {
  const { data, status } = useQuery('postArchive', getAllPosts)

  return (
      <>
        <MainNav />
        <HeaderAlt />
          <Container className="px-4 px-lg-5">
          <Row className="gx-4 gx-lg-5 justify-content-center">
            <Col className="md-10 col-lg-8 col-xl-7 text-center">
              <h1 className="mb-5 page-heading">All Posts</h1>
            </Col>
          </Row>
          {status === 'loading' && <HomeSpinner />}
          {status === 'success' && data.length === 0 &&
          <Row className="gx-4 gx-lg-5 justify-content-center">
            <Col className="md-10 col-lg-8 col-xl-7 text-center">
              <h2 className="mb-5">No posts to show</h2>
            </Col>
          </Row>
        }
          {status === 'success' && data.length > 0 && organiseArchive(data).map((array) =>
            <ArchiveMonthContainer key={array[0].yearAndMonthPublished} postArray={array} />
          )}
          {status === 'error' && <NetworkError />}
        </Container>
      </>
  )
}

export default Archive
