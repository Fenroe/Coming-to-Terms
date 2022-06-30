import React from 'react'
import { Form, HeaderAlt, Row, Col } from '../components'

const EditProfile = () => {
  return (
    <>
      <HeaderAlt />
      <main className="mb-4">
        <Row className="gx-4 gx-lg-5 justify-content-center">
          <Col className="md-10" lg={8} xl={7}>
            <h1 className="text-center">Edit Profile</h1>
            <div className="my-5">
              <Form>
                <Form.Floating>
                  <Form.Control />
                  <Form.Label>Bio</Form.Label>
                </Form.Floating>
              </Form>
            </div>
          </Col>
        </Row>
      </main>
    </>
  )
}

export default EditProfile
