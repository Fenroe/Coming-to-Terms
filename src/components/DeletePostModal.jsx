import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from './index'

const DeletePostModal = ({ showCondition, handleDeletePost, closeModal }) => {
  return (
    <Modal show={showCondition} onHide={closeModal} backdrop="static" keyboard={true} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this post?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleDeletePost}>Delete</Button>
      </Modal.Footer>
    </Modal>
  )
}

DeletePostModal.propTypes = {
  showCondition: PropTypes.bool,
  handleDeletePost: PropTypes.func,
  closeModal: PropTypes.func
}

export default DeletePostModal
