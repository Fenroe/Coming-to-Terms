import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Button, ErrorAlert } from './index'
import { updateUserSecurely } from '../utils'
import { useAuth } from '../hooks'

const UpdatePasswordModal = ({ showCondition, newEmail, newPassword, closeModal }) => {
  const [loading, setLoading] = useState(false)

  const [passwordReadOnly, setPasswordReadOnly] = useState(true)

  const passwordRef = useRef()

  const [errorMessage, setErrorMessage] = useState('')

  const { auth } = useAuth()

  const handleSave = async () => {
    try {
      if (loading) return
      if (passwordRef.current.value === '') {
        return setErrorMessage('Please enter your password')
      }
      setLoading(true)
      await updateUserSecurely(auth.username, passwordRef.current.value, newEmail, newPassword, auth.token)
    } catch {
      setErrorMessage('The password you entered was incorrect')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal show={showCondition} backdrop="static" onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update sensitive info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Floating>
            <Form.Control
            ref={passwordRef}
            onFocus={() => setPasswordReadOnly(false)}
            onBlur={() => setPasswordReadOnly(true)}
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            readOnly={passwordReadOnly}/>
            <Form.Label>Enter your password.</Form.Label>
          </Form.Floating>
          <br />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSave}>Update</Button>
        {errorMessage !== '' && <ErrorAlert errorMessage={errorMessage} closeAlert={() => setErrorMessage('')}/>}
      </Modal.Footer>
    </Modal>
  )
}

UpdatePasswordModal.propTypes = {
  showCondition: PropTypes.bool,
  newEmail: PropTypes.string,
  newPassword: PropTypes.string,
  closeModal: PropTypes.func
}

export default UpdatePasswordModal
