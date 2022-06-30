import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks'
import { validateUsername, validateEmail, validatePassword, comparePasswords, handleSignup, handleLogin } from '../utils'
import { Container, Row, Col, Form, HeaderAlt, Button } from '../components'

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
        const loginResponse = await handleLogin(usernameRef.current.value, passwordRef.current.value)
        setAuth({
          token: loginResponse.data.token,
          username: loginResponse.data.username
        })
        navigate('/')
      }
    } catch (err) {
      if (err.name === 'AxiosError') {
        if (err.response.status === 409) {
          setErrorMessages((prevState) => ({
            ...prevState,
            username: 'This username is already in use'
          }))
        }
        if (err.response.status >= 500) {
          setErrorMessages((prevState) => ({
            ...prevState,
            system: 'There was a problem on our end. Account wasn\'t created'
          }))
        }
      }
      console.clear()
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
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
                    })}
                    />
                    <Form.Label htmlFor="confirm password">Confirm Password</Form.Label>
                  </Form.Floating>
                  <br />
                  <Button id="submitButton" className="btn btn-primary text-uppercase" type="button" onClick={handleSubmit}>Sign up</Button>
                  <div>
                    <p>{errorMessages.username}</p>
                    <p>{errorMessages.email}</p>
                    <p>{errorMessages.password}</p>
                    <p>{errorMessages.confirmPassword}</p>
                  </div>
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
