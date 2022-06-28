import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, HeaderAlt, Button } from '../components'
import { handleLogin } from '../utils'
import { useAuth } from '../hooks'

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('')

  const { setAuth } = useAuth()

  const usernameRef = useRef()

  const passwordRef = useRef()

  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const token = await handleLogin(usernameRef.current.value, passwordRef.current.value)
      setAuth(token)
      navigate('/')
    } catch (err) {
      if (err.name === 'AxiosError') {
        if (err.response.status === 404) {
          setErrorMessage('Invalid username or password')
        }
        if (err.response.status >= 500) {
          setErrorMessage('There was a problem on our end. Our servers might be down.')
        }
      }
      console.clear()
    }
  }

  return (
    <>
      <HeaderAlt />
      <main className="mb-4">
        <Container className="px-4 px-lg-5">
          <Row className="gx-4 gx-lg-5 justify-content-center">
            <Col className="md-10" lg={8} xl={7}>
              <h1 className="text-center">Log in</h1>
              <div className="my-5">
                <Form autoComplete="off" preventdefault="true">
                  <input autoComplete="false" name="hidden" tyoe="text" style={{ display: 'none' }} />
                  <div className="form-floating">
                    <Form.Control ref={usernameRef} name="username" id="username" type="text" placeholder="Username" />
                    <Form.Label htmlFor="username">Username</Form.Label>
                  </div>
                  <div className="form-floating">
                    <Form.Control
                    ref={passwordRef}
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    />
                    <Form.Label htmlFor="password">Password</Form.Label>
                  </div>
                  <br />
                  <Button id="submitButton" className="btn btn-primary text-uppercase" type="button" onClick={handleSubmit}>Log in</Button>
                  <div>
                    <span>{errorMessage}</span>
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

export default Login
