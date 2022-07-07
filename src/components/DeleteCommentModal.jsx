import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from './index'
import { useAuth } from '../hooks'
import { deleteComment } from '../utils'

const DeleteCommentModal = ({ showCondition, commentId, closeModal }) => {
  const { auth } = useAuth()

  const handleDelete = async () => {
    await deleteComment(commentId, auth.username, auth.token)
    closeModal()
  }

  return (
    <Modal show={showCondition} onHide={closeModal} backdrop="static" keyboard={true} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this comment?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleDelete}>Delete</Button>
      </Modal.Footer>
    </Modal>
  )
}

DeleteCommentModal.propTypes = {
  showCondition: PropTypes.bool,
  commentId: PropTypes.string,
  closeModal: PropTypes.func
}

export default DeleteCommentModal
