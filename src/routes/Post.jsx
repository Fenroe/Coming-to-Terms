import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Header, Container, Row, Col, MainNav,
  HomeSpinner, HeaderAlt
} from '../components'
import { getPost } from '../utils'
import { headerImagePost } from '../assets'
import { useQuery } from 'react-query'

const Post = () => {
  const { id } = useParams()

  const getPostWithId = () => {
    return getPost(id)
  }

  const { data, status } = useQuery(`post${id}`, getPostWithId)

  return (
    <>
      <MainNav />
      {status === 'success'
        ? <Header
      backgroundImage={data.coverImage || headerImagePost}
      heading={data.title}
      subheading={data.previewText}
      metaAuthor={data.author.username}
      metaDate={data.datePublishedFormatted}
      />
        : <HeaderAlt /> }
      <main>
        <Container className="px-4 px-lg-5">
          {status === 'loading' && <HomeSpinner />}
          {status === 'success' &&
          <>
            <Row className="gx-4 gx-lg-5 justify-content-center">
              <Col className="md-10" lg={8} xl={7}>
                <div dangerouslySetInnerHTML={{ __html: data.content }}/>
              </Col>
            </Row>
          </>
        }
        </Container>
      </main>
    </>
  )
}

export default Post
