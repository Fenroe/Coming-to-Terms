import React, { useState, useEffect } from 'react'
import { MainNav, HeaderAlt, Container, Row, Col, ArchiveMonthContainer } from '../components'
import { organiseArchive, getAllPosts } from '../utils'

const Archive = () => {
  const [archive, setArchive] = useState([])

  useEffect(() => {
    getAllPosts()
      .then((result) => organiseArchive(result))
      .then((result) => setArchive(result))
  }, [])

  return (
      <>
        <MainNav />
        <HeaderAlt />
          <Container className="px-4 px-lg-5">
          <Row className="gx-4 gx-lg-5 justify-content-center">
            <Col className="md-10 col-lg-8 col-xl-7 text-center">
              <h1>All Posts</h1>
            </Col>
          </Row>
          {archive.map((array) =>
            <ArchiveMonthContainer key={array[0].yearAndMonthPublished} postArray={array} />
          )}
        </Container>
      </>
  )
}

export default Archive
