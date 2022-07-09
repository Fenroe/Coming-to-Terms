import React from 'react'
import PropTypes from 'prop-types'
import { Header, HeaderAlt, Container, Row, Col, Button, MainNav, HomeSpinner } from '../components'
import { useParams, useNavigate } from 'react-router-dom'
import { getPost, publishPost } from '../utils'
import { useAuth } from '../hooks'
import { useQuery } from 'react-query'
import { headerImagePost } from '../assets'

const Preview = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const { auth } = useAuth()

  const handlePublish = async () => {
    await publishPost(id, auth.username, auth.token)
    navigate(`/posts/${id}`)
  }

  const getPostWithId = async () => {
    return await getPost(id)
  }

  const { data, status } = useQuery(`preview${id}`, getPostWithId)

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
          <Row className="gx-4 gx-lg-5 justify-content-center">
            {status === 'loading' && <HomeSpinner />}
            {status === 'success' &&
            <Col className="md-10" lg={8} xl={7}>
              <div dangerouslySetInnerHTML={{ __html: data.content }} />
              <br />
              <div className="mb-3">
                <Button className="btn btn-danger text-uppercase" type="button" onClick={handlePublish}>Publish</Button>
              </div>
            </Col>
            }
          </Row>
        </Container>
      </main>
    </>
  )
}

Preview.propTypes = {
  previewData: PropTypes.object,
  setPreviewData: PropTypes.func
}

export default Preview
