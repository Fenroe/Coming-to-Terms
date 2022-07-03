import React from 'react'
import { Form, HeaderAlt, Container, Row, Col, Button, MainNav } from '../components'

const EditProfile = () => {
  return (
    <>
      <MainNav />
      <HeaderAlt />
      <main className="mb-4">
        <Container className="px-4 px-lg-5">
          <Row className="gx-4 gx-lg-5 justify-content-center">
            <Col className="md-10" lg={8} xl={7}>
              <h1 className="text-center">Edit Profile</h1>
              <div className="my-5">
                <Form>
                  <Form.Floating>
                    <Form.Control type="text" name="bio" id="bio" placeholder="Bio" />
                    <Form.Label htmlFor="bio">Bio</Form.Label>
                  </Form.Floating>
                  <br />
                  <Button type="button">Save</Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

export default EditProfile
