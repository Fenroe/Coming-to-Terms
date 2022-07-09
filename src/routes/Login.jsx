import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container, Row, Col, Form, HeaderAlt, Button, MainNav,
  ErrorAlert
} from '../components'
import { handleLogin } from '../utils'
import { useAuth } from '../hooks'

const Login = () => {
  const [loading, setLoading] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')

  const { setAuth } = useAuth()

  const usernameRef = useRef()

  const passwordRef = useRef()

  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      if (loading) return
      setLoading(true)
      const loginResponse = await handleLogin(usernameRef.current.value, passwordRef.current.value)
      localStorage.setItem('token', loginResponse.data.token)
      localStorage.setItem('username', loginResponse.data.username)
      localStorage.setItem('isContributor', JSON.stringify(loginResponse.data.isContributor))
      setAuth({
        token: loginResponse.data.token,
        username: loginResponse.data.username,
        isContributor: loginResponse.data.isContributor
      })
      navigate('/')
    } catch (err) {
      if (err.name === 'AxiosError') {
        if (err.response.status >= 500) {
          setErrorMessage('There was a problem on our end. Our servers might be down.')
        } else {
          setErrorMessage('Invalid username or password.')
        }
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
                  <Button className="btn btn-primary text-uppercase" type="button" onClick={handleSubmit}>Use test account</Button>
                  {errorMessage !== '' && <ErrorAlert errorMessage={errorMessage} closeAlert={() => setErrorMessage('')} />}
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
