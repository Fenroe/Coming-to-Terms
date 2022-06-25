import React from 'react'
import { Container, Row, Col, Form, HeaderAlt, Button } from '../components'

const Signup = () => {
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
                    <Form.Control name="Username" type="text" placeholder="Username" />
                    <Form.Label htmlFor="Username">Username</Form.Label>
                    <div className="invalid-feedback"></div>
                  </Form.Floating>
                  <Form.Floating className="form-floating">
                    <Form.Control name="Email" type="email" placeholder="Email" />
                    <Form.Label htmlFor="Email">Email</Form.Label>
                    <div className="invalid-feedback"></div>
                  </Form.Floating>
                  <Form.Floating className="form-floating">
                    <Form.Control name="Password" type="password" placeholder="Password" autoComplete="new-password" />
                    <Form.Label htmlFor="Password">Password</Form.Label>
                    <div className="invalid-feedback"></div>
                  </Form.Floating>
                  <Form.Floating className="form-floating">
                    <Form.Control name="Confirm password" type="password" placeholder="Confirm Password" autoComplete="new-password" />
                    <Form.Label htmlFor="Confirm password">Confirm Password</Form.Label>
                    <div className="invalid-feedback"></div>
                  </Form.Floating>
                  <br />
                  <Button id="submitButton" className="btn btn-primary text-uppercase" type="submit">Sign up</Button>
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
