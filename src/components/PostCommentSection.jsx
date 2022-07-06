import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Form, Button, Comment, HomeSpinner } from './index'
import { useQuery } from 'react-query'
import { getPostComments, createComment } from '../utils'
import { useAuth } from '../hooks'

const PostCommentSection = ({ postId }) => {
  const [newCommentLoading, setNewCommentLoading] = useState(false)

  const [userAddedComments, setUserAddedComments] = useState([])

  const commentSectionRef = useRef()

  const contentRef = useRef()

  const { auth } = useAuth()

  const getPostCommentsWithId = async () => {
    const result = await getPostComments(postId)
    console.log(result)
    return result
  }

  const handleAddNewComment = async () => {
    if (newCommentLoading) return
    if (!contentRef.current.value) return
    setNewCommentLoading(true)
    const newComment = await createComment(auth.username, postId, contentRef.current.value, auth.token)
    contentRef.current.value = ''
    setUserAddedComments([newComment, ...userAddedComments])
    if (commentSectionRef) {
      commentSectionRef.current.scrollIntoView()
    }
    setNewCommentLoading(false)
  }

  const { data, status } = useQuery(`postComments${postId}`, getPostCommentsWithId)

  return (
    <>
      {status === 'loading' && <HomeSpinner />}
      {status === 'success' &&
      <>
        {auth.username &&
        <Row className="gx-4 gx-lg-5 justify-content-center">
          <Col className="md-10" lg={8} xl={7}>
          <div className="my-5">
            <h1>Leave a reply</h1>
            <Form>
              <Form.Floating>
                <Form.Control ref={contentRef} as="textarea" name="comment" id="comment" placeholder="Write your comment here."/>
                <Form.Label>Write your comment here.</Form.Label>
              </Form.Floating>
              <br />
              <Button type="button" onClick={handleAddNewComment}>Add</Button>
            </Form>
          </div>
          </Col>
        </Row>
        }
        <Row className="gx-4 gx-lg-5 justify-content-center">
          <Col className="md-10" lg={8} xl={7}>
            <h1>Comments</h1>
          </Col>
        </Row>
        <Row className="gx-4 gx-lg-5 justify-content-center">
          <Col ref={commentSectionRef} className="md-10" lg={8} xl={7}>
            {[...userAddedComments, ...data].length === 0 && <h2>There are no comments.</h2>}
            {[...userAddedComments, ...data].map((comment) =>
            <Comment
            key={comment._id}
            author={comment.author._id || comment.author}
            content={comment.content}
            dateCommented={comment.dateCommentedFromNow}
            dateEdited={comment.dateEditedFromNow}
            />)}
          </Col>
        </Row>
      </>
      }
    </>
  )
}

PostCommentSection.propTypes = {
  postId: PropTypes.string
}

export default PostCommentSection
