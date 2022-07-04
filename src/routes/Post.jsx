import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Header, Container, Row, Col, Form,
  Button, Comment, MainNav, HomeSpinner, HeaderAlt
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
      backgroundImage={headerImagePost}
      heading={data.post.title}
      subheading={data.post.previewText}
      metaAuthor={data.post.author.username}
      metaDate={data.post.datePublishedFormatted}
      />
        : <HeaderAlt /> }
      <main>
        <Container className="px-4 px-lg-5">
          {status === 'loading' && <HomeSpinner />}
          {status === 'success' &&
          <>
            <Row className="gx-4 gx-lg-5 justify-content-center">
              <Col className="md-10" lg={8} xl={7}>
                <div dangerouslySetInnerHTML={{ __html: data.post.content }}/>
              </Col>
            </Row>
            <Row className="gx-4 gx-lg-5 justify-content-center">
              <Col className="md-10" lg={8} xl={7}>
              <div className="my-5">
                <h1>Leave a reply</h1>
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
                {data.comments.length === 0 && <h2>There are no comments.</h2>}
                {data.comments.map((comment) =>
                <Comment
                key={comment._id}
                author={comment.author.username}
                content={comment.content}
                dateCommented={comment.dateCommentedFromNow}
                dateEdited={comment.dateEditedFromNow}
                />)}
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
