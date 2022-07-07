import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Button, ErrorAlert } from './index'
import { deleteUser } from '../utils'
import { useAuth } from '../hooks'

const DeleteAccountModal = ({ showCondition, closeModal, resolveDeleteAccount }) => {
  const [loading, setLoading] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')

  const [passwordReadOnly, setPasswordReadOnly] = useState(true)

  const passwordRef = useRef()

  const { auth } = useAuth()

  const handleDelete = async () => {
    try {
      if (loading) return
      if (passwordRef.current.value === '') {
        setErrorMessage('Please enter your password')
        return
      }
      setLoading(true)
      await deleteUser(auth.username, passwordRef.current.value, auth.token)
      resolveDeleteAccount()
    } catch {
      setErrorMessage('The password you entered was incorrect')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal show={showCondition} backdrop="static" onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete account</Modal.Title>
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="delete-account-btn" variant={'danger'} onClick={handleDelete}>Delete Account</Button>
       {errorMessage !== '' && <ErrorAlert errorMessage={errorMessage} closeAlert={() => setErrorMessage('')}/>}
      </Modal.Footer>
    </Modal>
  )
}

DeleteAccountModal.propTypes = {
  showCondition: PropTypes.bool,
  closeModal: PropTypes.func,
  resolveDeleteAccount: PropTypes.func
}

export default DeleteAccountModal
