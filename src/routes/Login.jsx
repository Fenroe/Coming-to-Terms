import React from 'react'
import { Container, Row, Col, Form, HeaderAlt, Button } from '../components'

const Login = () => {
  return (
    <>
      <HeaderAlt />
      <main className="mb-4">
        <Container className="px-4 px-lg-5">
          <Row className="gx-4 gx-lg-5 justify-content-center">
            <Col className="md-10" lg={8} xl={7}>
              <h1 className="text-center">Log in</h1>
              <div className="my-5">
                <Form autoComplete="off">
                  <input autoComplete="false" name="hidden" tyoe="text" style={{ display: 'none' }} />
                  <div className="form-floating">
                    <Form.Control name="Username" type="text" placeholder="Username"/>
                    <Form.Label htmlFor="Username">Username</Form.Label>
                    <div className="invalid-feedback"></div>
                  </div>
                  <div className="form-floating">
                    <Form.Control name="Password" type="password" placeholder="Password"/>
                    <Form.Label htmlFor="Password">Password</Form.Label>
                    <div className="invalid-feedback"></div>
                  </div>
                  <br />
                  <Button id="submitButton" className="btn btn-primary text-uppercase" type="submit">Log in</Button>
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
