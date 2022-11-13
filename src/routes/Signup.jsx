import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks'
import {
  validateUsername, validateEmail, validatePassword,
  comparePasswords, handleSignup, handleLogin
} from '../utils'
import {
  Container, Row, Col, Form, HeaderAlt, Button,
  MainNav, ErrorAlert
} from '../components'

const Signup = () => {
  const [loading, setLoading] = useState(false)

  const [errorMessages, setErrorMessages] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    system: ''
  })

  const usernameRef = useRef()

  const emailRef = useRef()

  const passwordRef = useRef()

  const confirmPasswordRef = useRef()

  const { setAuth } = useAuth()

  const navigate = useNavigate()

  const errorMessagesInArray = () => {
    const errorArray = []
    if (errorMessages.username !== '') errorArray.push(errorMessages.username)
    if (errorMessages.email !== '') errorArray.push(errorMessages.email)
    if (errorMessages.password !== '') errorArray.push(errorMessages.password)
    if (errorMessages.confirmPassword !== '') errorArray.push(errorMessages.confirmPassword)
    if (errorMessages.system !== '') errorArray.push(errorMessages.system)
    return errorArray
  }

  const resetErrorMessages = () => {
    setErrorMessages({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      system: ''
    })
    errorMessagesInArray()
  }

  const validateSignup = () => {
    let isValid = true
    validateUsername(usernameRef.current.value, (result) => {
      if (result === false) {
        isValid = false
        setErrorMessages((prevState) => ({
          ...prevState,
          username: 'Username must be between 4 and 20 characters and can only have letters, numbers and underscores'
        }))
      } else {
        setErrorMessages((prevState) => ({
          ...prevState,
          username: ''
        }))
      }
      errorMessagesInArray()
    })

    validateEmail(emailRef.current.value, (result) => {
      if (result === false) {
        isValid = false
        setErrorMessages((prevState) => ({
          ...prevState,
          email: 'Please use a valid email address'
        }))
      } else {
        setErrorMessages((prevState) => ({
          ...prevState,
          email: ''
        }))
      }
      errorMessagesInArray()
    })
    validatePassword(passwordRef.current.value, (result) => {
      if (result === false) {
        isValid = false
        setErrorMessages((prevState) => ({
          ...prevState,
          password: 'Password must be at least six characters long'
        }))
      } else {
        setErrorMessages((prevState) => ({
          ...prevState,
          password: ''
        }))
      }
      errorMessagesInArray()
    })
    comparePasswords(passwordRef.current.value, confirmPasswordRef.current.value, (result) => {
      if (result === false) {
        isValid = false
        setErrorMessages((prevState) => ({
          ...prevState,
          confirmPassword: 'Passwords don\'t match'
        }))
      } else {
        setErrorMessages((prevState) => ({
          ...prevState,
          confirmPassword: ''
        }))
      }
      errorMessagesInArray()
    })
    return isValid
  }

  const handleSubmit = async () => {
    try {
      if (loading) return
      if (!validateSignup()) return
      setLoading(true)
      const response = await handleSignup(usernameRef.current.value, emailRef.current.value, passwordRef.current.value)
      if (response.data.userWasCreated === true) {
        const loginResponse = await handleLogin(emailRef.current.value, passwordRef.current.value)
        localStorage.setItem('token', loginResponse.data.token)
        localStorage.setItem('username', loginResponse.data.profile.username)
        localStorage.setItem('isContributor', JSON.stringify(loginResponse.data.isContributor))
        localStorage.setItem('email', loginResponse.data.email)
        setAuth({
          token: loginResponse.data.token,
          username: loginResponse.data.profile.username,
          isContributor: loginResponse.data.isContributor,
          email: loginResponse.data.email
        })
        navigate('/')
      }
    } catch (err) {
      if (err.name === 'AxiosError') {
        if (err.response.status === 409) {
          if (err.response.data === 'Username unavailable') {
            setErrorMessages((prevState) => ({
              ...prevState,
              username: 'This username is already in use'
            }))
          }
          if (err.response.data === 'Email unavailable') {
            setErrorMessages((prevState) => ({
              ...prevState,
              email: 'This email is already in use'
            }))
          }
        } else if (err.response.status >= 500) {
          setErrorMessages((prevState) => ({
            ...prevState,
            system: 'There was a problem on our end. Account wasn\'t created'
          }))
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const handleTestAccountLogin = async () => {
    try {
      if (loading) return
      setLoading(true)
      const loginResponse = await handleLogin(process.env.REACT_APP_DEMO_ACCOUNT_EMAIL, process.env.REACT_APP_DEMO_ACCOUNT_PASSWORD)
      localStorage.setItem('token', loginResponse.data.token)
      localStorage.setItem('username', loginResponse.data.profile.username)
      localStorage.setItem('isContributor', JSON.stringify(loginResponse.data.isContributor))
      setAuth({
        token: loginResponse.data.token,
        username: loginResponse.data.profile.username,
        isContributor: loginResponse.data.isContributor
      })
      navigate('/')
    } catch (err) {
      if (err.name === 'AxiosError') {
        setErrorMessages((prevState) => ({
          ...prevState,
          system: 'There was a problem on our end. Our servers might be down.'
        }))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <MainNav />
      <HeaderAlt />
      <main className="mb-4">
        <Container className="px-4 px-lg-5">
          <Row className="gx-4 gx-lg-5 justify-content-center">
            <Col className="md-10" lg={8} xl={7}>
              <h1 className="text-center">Sign up</h1>
              <div className="my-5">
                <Form>
                  <Form.Floating>
                    <Form.Control
                    ref={usernameRef}
                    name="username"
                    id="username"
                    type="text"
                    placeholder="Username"
                    onBlur={() => validateUsername(usernameRef.current.value, (result) => {
                      if (result === false) {
                        setErrorMessages((prevState) => ({
                          ...prevState,
                          username: 'Username must be between 4 and 20 characters and can only have letters, numbers and underscores'
                        }))
                      } else {
                        setErrorMessages((prevState) => ({
                          ...prevState,
                          username: ''
                        }))
                      }
                      errorMessagesInArray()
                    })}
                    />
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <div className="invalid-feedback"></div>
                  </Form.Floating>
                  <Form.Floating className="form-floating">
                    <Form.Control
                    ref={emailRef}
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Email"
                    onBlur={() => validateEmail(emailRef.current.value, (result) => {
                      if (result === false) {
                        setErrorMessages((prevState) => ({
                          ...prevState,
                          email: 'Please use a valid email address'
                        }))
                      } else {
                        setErrorMessages((prevState) => ({
                          ...prevState,
                          email: ''
                        }))
                      }
                      errorMessagesInArray()
                    })}
                    />
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <div className="invalid-feedback"></div>
                  </Form.Floating>
                  <Form.Floating className="form-floating">
                    <Form.Control
                    ref={passwordRef}
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    onBlur={() => validatePassword(passwordRef.current.value, (result) => {
                      if (result === false) {
                        setErrorMessages((prevState) => ({
                          ...prevState,
                          password: 'Password must be at least six characters long'
                        }))
                      } else {
                        setErrorMessages((prevState) => ({
                          ...prevState,
                          password: ''
                        }))
                      }
                      errorMessagesInArray()
                    })}
                    />
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <div className="invalid-feedback"></div>
                  </Form.Floating>
                  <Form.Floating className="form-floating">
                    <Form.Control
                    ref={confirmPasswordRef}
                    name="confirm password"
                    id="confirm password"
                    type="password"
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                    onBlur={() => comparePasswords(passwordRef.current.value, confirmPasswordRef.current.value, (result) => {
                      if (result === false) {
                        setErrorMessages((prevState) => ({
                          ...prevState,
                          confirmPassword: 'Passwords don\'t match'
                        }))
                      } else {
                        setErrorMessages((prevState) => ({
                          ...prevState,
                          confirmPassword: ''
                        }))
                      }
                      errorMessagesInArray()
                    })}
                    />
                    <Form.Label htmlFor="confirm password">Confirm Password</Form.Label>
                  </Form.Floating>
                  <br />
                  <div className="mb-3">
                    <Button id="submitButton" className="btn btn-primary text-uppercase" type="button" onClick={handleSubmit}>Sign up</Button>
                  </div>
                  <div className="mb-3">
                    <Button className="btn text-uppercase" variant='danger' type="button" onClick={handleTestAccountLogin}>Use test account</Button>
                  </div>
                  {errorMessagesInArray().length > 0 && <ErrorAlert errorMessage={errorMessagesInArray()} closeAlert={() => resetErrorMessages()}/>}
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

export default Signup
