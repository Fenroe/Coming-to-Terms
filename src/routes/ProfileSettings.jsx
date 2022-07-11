import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  HeaderAlt, Container, Row, Col, Form, Button,
  HomeSpinner, MainNav, UpdatePasswordModal,
  DeleteAccountModal, SuccessAlert, ErrorAlert
} from '../components'
import { useAuth } from '../hooks'
import { useQuery } from 'react-query'
import { getUser, updateUser } from '../utils'

const ProfileSettings = () => {
  const [loading, setLoading] = useState(false)

  const [showBioSaved, setShowBioSaved] = useState(false)

  const [showPasswordSaved, setShowPasswordSaved] = useState(false)

  const [passwordReadOnly, setPasswordReadOnly] = useState(true)

  const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false)

  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false)

  const [updatePasswordErrorMessage, setUpdatePasswordErrorMessage] = useState('')

  const bioRef = useRef()

  const newPasswordRef = useRef()

  const navigate = useNavigate()

  const { auth, setAuth } = useAuth()

  const closeModal = () => {
    setShowUpdatePasswordModal(false)
    setShowDeleteAccountModal(false)
  }

  const resolveUpdatePassword = () => {
    setShowUpdatePasswordModal(false)
    newPasswordRef.current.value = ''
    setShowPasswordSaved(true)
  }

  const resolveDeleteAccount = () => {
    setShowDeleteAccountModal(false)
    setAuth({
      token: '',
      username: '',
      isContributor: null
    })
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('isContributor')
    navigate('/')
  }

  const getUserWithId = async () => {
    return await getUser(auth.username)
  }

  const onBioFocusAndBlur = () => {
    setShowBioSaved(false)
    setShowPasswordSaved(false)
    setUpdatePasswordErrorMessage('')
  }

  const onPasswordFocus = () => {
    setPasswordReadOnly(false)
    setShowBioSaved(false)
    setShowPasswordSaved(false)
    setUpdatePasswordErrorMessage('')
  }

  const onPasswordBlur = () => {
    setPasswordReadOnly(true)
    setShowBioSaved(false)
    setShowPasswordSaved(false)
    setUpdatePasswordErrorMessage('')
  }

  const handleBioAndPreferencesSave = async () => {
    if (loading) return
    setLoading(true)
    setShowBioSaved(false)
    setShowPasswordSaved(false)
    setUpdatePasswordErrorMessage('')
    if (bioRef.current.value !== data.userData.bio) {
      await updateUser(auth.username, bioRef.current.value, auth.token)
    }
    setShowBioSaved(true)
    setLoading(false)
  }

  const handleUpdatePassword = () => {
    if (loading) return
    if (newPasswordRef.current.value === '') {
      return setUpdatePasswordErrorMessage('Please enter a password.')
    }
    setLoading(true)
    setShowBioSaved(false)
    setShowPasswordSaved(false)
    setUpdatePasswordErrorMessage('')
    setShowUpdatePasswordModal(true)
    setLoading(false)
  }

  const handleDeleteAccount = () => {
    if (loading) return
    setLoading(true)
    setShowDeleteAccountModal(true)
    setShowBioSaved(false)
    setShowPasswordSaved(false)
    setUpdatePasswordErrorMessage('')
    setLoading(false)
  }

  const { data, status } = useQuery(`updateProfile${auth.username}`, getUserWithId)

  return (
    <>
      {showUpdatePasswordModal && <UpdatePasswordModal
      showCondition={showUpdatePasswordModal}
      newPassword={newPasswordRef.current.value}
      closeModal={closeModal}
      resolveUpdatePassword={resolveUpdatePassword}/>}
      {showDeleteAccountModal && <DeleteAccountModal
      showCondition={showDeleteAccountModal}
      closeModal={closeModal}
      resolveDeleteAccount={resolveDeleteAccount}/>}
      <MainNav />
      <HeaderAlt />
      <main>
        {status === 'loading' && <HomeSpinner />}
        {status === 'success' &&
        <Container className="px-4 px-lg-5">
          <Row className="gx-4 gx-lg-5 justify-content-center">
            <Col className="md-10" lg={8} xl={7}>
              <h1 className="text-center">Profile settings</h1>
              <div>
                <Form>
                  <h2 className="form-heading">Update bio</h2>
                  <Form.Floating>
                    <Form.Control
                    ref={bioRef}
                    onFocus={onBioFocusAndBlur}
                    onBlur={onBioFocusAndBlur}
                    as="textarea"
                    name="bio"
                    id="bio"
                    placeholder="Update your bio."
                    defaultValue={data.userData.bio}/>
                    <Form.Label
                    htmlFor="bio">
                      Update your bio.
                    </Form.Label>
                  </Form.Floating>
                  <Button
                  className="text-uppercase"
                  onClick={handleBioAndPreferencesSave}
                  type="button">
                    Save
                  </Button>
                </Form>
                <div className="alert-container">
                  {showBioSaved && <SuccessAlert />}
                </div>
              </div>
              <div>
                <Form>
                  <h2 className="form-heading">Change password</h2>
                  <Form.Floating>
                    <Form.Control
                    ref={newPasswordRef}
                    onFocus={onPasswordFocus}
                    onBlur={onPasswordBlur}
                    type="password" name="password" id="password"
                    placeholder="Change your password."
                    readOnly={passwordReadOnly}
                    autoComplete="new-password"/>
                    <Form.Label
                    htmlFor="password">
                      Change your password.
                    </Form.Label>
                  </Form.Floating>
                  <Button
                  className="text-uppercase"
                  onClick={handleUpdatePassword}
                  type="button">
                    Save
                  </Button>
                </Form>
                <div className="alert-container">
                  {showPasswordSaved &&
                  <SuccessAlert
                  />}
                  {updatePasswordErrorMessage !== '' &&
                  <ErrorAlert
                  errorMessage={updatePasswordErrorMessage}
                  />}
                </div>
              </div>
              <div className="">
                <Form>
                  <h2 className="form-heading">Danger zone</h2>
                  <Button
                  className="delete-account-btn text-uppercase"
                  onClick={handleDeleteAccount}
                  variant="danger"
                  type="button">
                    Delete account
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
        }
      </main>
    </>
  )
}

export default ProfileSettings
