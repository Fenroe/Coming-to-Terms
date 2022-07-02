import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Header, Container, Row, Col, Form, Button } from '../components'
import { getPost } from '../utils'
import { headerImagePost } from '../assets'

const Post = () => {
  const [postData, setPostData] = useState({
    title: '',
    subheading: '',
    author: {
      username: ''
    },
    datePublishedFormatted: ''
  })

  const [comments, setComments] = useState([])

  const { id } = useParams()

  useEffect(() => {
    getPost(id)
      .then((result) => {
        setPostData(result.post)
        setComments(result.comments)
      })
  }, [])

  return (
    <>
      <Header
      backgroundImage={headerImagePost}
      heading={postData.title}
      subheading={postData.previewText}
      metaAuthor={postData.author.username}
      metaDate={postData.datePublishedFormatted}/>
      <main>
        <Container className="px-4 px-lg-5">
          <Row className="gx-4 gx-lg-5 justify-content-center">
            <Col className="md-10" lg={8} xl={7}>
              <div dangerouslySetInnerHTML={{ __html: postData.content }}/>
            </Col>
          </Row>
          <Row className="gx-4 gx-lg-5 justify-content-center">
            <Col className="md-10" lg={8} xl={7}>
            <div className="my-5">
              <Form>
                <Form.Floating>
                  <Form.Control as="textarea" name="comment" id="comment" placeholder="Write your comment here."/>
                  <Form.Label>Write your comment here.</Form.Label>
                </Form.Floating>
                <br />
                <Button>Add</Button>
              </Form>
            </div>
            </Col>
          </Row>
          <Row className="gx-4 gx-lg-5 justify-content-center">
            <Col className="md-10" lg={8} xl={7}>
              <h1>Comments</h1>
            </Col>
          </Row>
          <Row className="gx-4 gx-lg-5 justify-content-center">
            <Col className="md-10" lg={8} xl={7}>
              {comments.length === 0 && <h2>There are no comments.</h2>}
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

export default Post
