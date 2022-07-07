import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  HeaderAlt, Container, Row, Col, Form, Button,
  HomeSpinner, MainNav, UpdatePasswordModal,
  DeleteAccountModal,
  SuccessAlert
} from '../components'
import { useAuth } from '../hooks'
import { useQuery } from 'react-query'
import { getUser, updateUser } from '../utils'

const ProfileSettings = () => {
  const [loading, setLoading] = useState(false)

  const [showSuccessOne, setShowSuccessOne] = useState(false)

  // const [showSuccessTwo, setShowSuccessTwo] = useState(false)

  const [passwordReadOnly, setPasswordReadOnly] = useState(true)

  const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false)

  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false)

  const bioRef = useRef()

  const emailRef = useRef()

  const newPasswordRef = useRef()

  const navigate = useNavigate()

  const { auth, setAuth } = useAuth()

  const closeModal = () => {
    setShowUpdatePasswordModal(false)
    setShowDeleteAccountModal(false)
    refetch()
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

  const handleBioAndPreferencesSave = async () => {
    if (loading) return
    setLoading(true)
    if (bioRef.current.value !== data.userData.bio) {
      await updateUser(auth.username, bioRef.current.value, auth.token)
    }
    setShowSuccessOne(true)
    setLoading(false)
    setTimeout(() => {
      setShowSuccessOne(false)
    }, 2000)
  }

  const handleSensitiveDataSave = () => {
    setShowUpdatePasswordModal(true)
  }

  const handleDeleteAccount = () => {
    setShowDeleteAccountModal(true)
  }

  const { data, status, refetch } = useQuery(`updateProfile${auth.username}`, getUserWithId)
  return (
    <>
      {showUpdatePasswordModal && <UpdatePasswordModal
      showCondition={showUpdatePasswordModal}
      newEmail={emailRef.current.value}
      newPassword={newPasswordRef.current.value}
      closeModal={closeModal}/>}
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
              <div className="my-5">
                <Form>
                  <h2>Bio and preferences</h2>
                  <Form.Floating>
                    <Form.Control ref={bioRef} as="textarea" name="bio" id="bio" placeholder="Update your bio." defaultValue={data.userData.bio}/>
                    <Form.Label htmlFor="bio">Update your bio.</Form.Label>
                  </Form.Floating>
                  <br />
                  <Button onClick={handleBioAndPreferencesSave} type="button">Save</Button>
                  {showSuccessOne && <SuccessAlert closeAlert={() => setShowSuccessOne(false)}/>}
                </Form>
              </div>
              <div className="my-5">
                <Form>
                  <h2>Sensitive information</h2>
                  <Form.Floating>
                    <Form.Control ref={emailRef} type="email" name="email" id="email" placeholder="Update your email." defaultValue={data.userData.email}/>
                    <Form.Label htmlFor="email">Update your email.</Form.Label>
                  </Form.Floating>
                  <Form.Floating>
                    <Form.Control ref={newPasswordRef} onFocus={() => setPasswordReadOnly(false)} onBlur={() => setPasswordReadOnly(true)} type="password" name="password" id="password" placeholder="Change your password." readOnly={passwordReadOnly} autoComplete="new-password"/>
                    <Form.Label htmlFor="password">Change your password.</Form.Label>
                  </Form.Floating>
                  <br />
                  <Button onClick={handleSensitiveDataSave} type="button">Save</Button>
                </Form>
              </div>
              <div className="my-5">
                <Form>
                  <h2>Danger zone</h2>
                  <br />
                  <Button className="delete-account-btn" onClick={handleDeleteAccount} variant="danger" type="button">Delete account</Button>
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
