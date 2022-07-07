import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Row, Col, Form, Button, Comment, HomeSpinner,
  EditCommentModal, DeleteCommentModal
} from './index'
import { useQuery } from 'react-query'
import { getPostComments, createComment } from '../utils'
import { useAuth } from '../hooks'

const PostCommentSection = ({ postId }) => {
  const [showEditCommentModal, setShowEditCommentModal] = useState(false)

  const [editedCommentId, setEditedCommentId] = useState('')

  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false)

  const [deletedCommentId, setDeletedCommentId] = useState('')

  const [newCommentLoading, setNewCommentLoading] = useState(false)

  const [userAddedComments, setUserAddedComments] = useState([])

  const commentSectionRef = useRef()

  const contentRef = useRef()

  const { auth } = useAuth()

  const getPostCommentsWithId = async () => {
    const result = await getPostComments(postId)
    return result
  }

  const { data, status, refetch } = useQuery(`postComments${postId}`, getPostCommentsWithId)

  const closeModal = () => {
    refetch()
    setShowEditCommentModal(false)
    setShowDeleteCommentModal(false)
  }

  const handleEditComment = (commentId) => {
    setEditedCommentId(commentId)
    setShowEditCommentModal(true)
  }

  const handleDeleteComment = (commentId) => {
    setDeletedCommentId(commentId)
    setShowDeleteCommentModal(true)
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

  const getCombinedCommentStream = () => {
    const commentIdSet = new Set()
    data.forEach((comment) => commentIdSet.add(comment._id))
    const filteredUserAddedComments = userAddedComments.filter((comment) => !commentIdSet.has(comment._id) && comment)
    return [...filteredUserAddedComments, ...data]
  }

  return (
    <>
      {showEditCommentModal && <EditCommentModal
      showCondition={showEditCommentModal}
      commentId={editedCommentId}
      closeModal={closeModal} />}
      {showDeleteCommentModal &&
      <DeleteCommentModal
      showCondition={showDeleteCommentModal}
      commentId={deletedCommentId}
      closeModal={closeModal} />}
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
            {getCombinedCommentStream().length === 0 && <h2>There are no comments.</h2>}
            {getCombinedCommentStream().map((comment) =>
            <Comment
            key={comment._id}
            id={comment._id}
            author={comment.author._id || comment.author}
            content={comment.content}
            dateCommented={comment.dateCommentedFromNow}
            dateEdited={comment.dateEditedFromNow}
            handleEditComment={handleEditComment}
            handleDeleteComment={handleDeleteComment}
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
