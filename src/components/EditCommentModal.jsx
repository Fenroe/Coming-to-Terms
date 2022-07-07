import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Modal, HomeSpinner, Form, Button } from './index'
import { useAuth } from '../hooks'
import { getComment, updateComment } from '../utils'
import { useQuery } from 'react-query'

const EditCommentModal = ({ showCondition, commentId, closeModal }) => {
  const [handleSaveLoading, setHandleSaveLoading] = useState(false)

  const editCommentInputRef = useRef()

  const { auth } = useAuth()

  const handleSave = async () => {
    if (handleSaveLoading) return
    if (!editCommentInputRef || editCommentInputRef.current.value === '') return
    setHandleSaveLoading(true)
    await updateComment(commentId, auth.username, editCommentInputRef.current.value, auth.token)
    setHandleSaveLoading(false)
    closeModal()
  }

  const getCommentWithId = async () => {
    return await getComment(commentId)
  }

  const { data, status } = useQuery(`editComment${commentId}`, getCommentWithId)

  return (
    <Modal show={showCondition} backdrop="static" onHide={closeModal} keyboard={true} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {status === 'loading' && <HomeSpinner />}
        {status === 'success' &&
          <Form.Floating>
            <Form.Control ref={editCommentInputRef} as="textarea" name="edit-comment" id="edit-comment" placeholder="Write your comment here." defaultValue={data.content}/>
            <Form.Label>Write your comment here.</Form.Label>
          </Form.Floating>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSave}>{handleSaveLoading ? 'Saving' : 'Save'}</Button>
      </Modal.Footer>
    </Modal>
  )
}

EditCommentModal.propTypes = {
  showCondition: PropTypes.bool,
  commentId: PropTypes.string,
  closeModal: PropTypes.func
}

export default EditCommentModal
