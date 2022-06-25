import React, { useRef } from 'react'
import { HeaderAlt, Container, Row, Col, Form, Button, Editor } from '../components'

const EditPost = () => {
  const editorRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(editorRef.current.getContent())
  }

  return (
      <>
        <HeaderAlt />
        <main className="mb-4">
        <Container className="px-4 px-lg-5">
          <Row className="gx-4 gx-lg-5 justify-content-center">
            <Col className="md-10" lg={8} xl={7}>
              <h1 className="text-center">Write Your Post</h1>
              <div className="my-5">
                <Form autoComplete="off">
                  <input autoComplete="false" name="hidden" tyoe="text" style={{ display: 'none' }} />
                  <div className="form-floating">
                    <Form.Control name="Title" type="text" placeholder="Title"/>
                    <Form.Label htmlFor="Title">Title</Form.Label>
                    <div className="invalid-feedback"></div>
                  </div>
                  <div className="form-floating">
                    <Form.Control name="Subheading" type="text" placeholder="Subheading" />
                    <Form.Label htmlFor="Subheading">Subheading</Form.Label>
                    <div className="invalid-feedback"></div>
                  </div>
                  <Editor
                  onInit={function (evt, editor) {
                    editorRef.current = editor
                  }}
                  className="form-control"
                  apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                  init={{
                    selector: 'textarea',
                    menubar: false,
                    toolbar: false,
                    plugins: 'autoresize quickbars table link',
                    skin: 'snow',
                    icons: 'thin',
                    placeholder: 'What do you want to say?',
                    content_style: "@import url('https://fonts.googleapis.com/css2?family=Tinos&display=swap'); body { font-family: 'Tinos', serif; font-size: 16pt; color: #292929; }",
                    quickbars_selection_toolbar: 'bold italic | h1 | blockquote | table link',
                    quickbars_insert_toolbar: false
                  }}/>
                  <br />
                  <div className="mb-3">
                    <Button className="btn btn-primary text-uppercase" type="submit" onClick={(e) => handleSubmit(e)}>Save</Button>
                  </div>
                  <div className="mb-3">
                    <Button className="btn btn-danger text-uppercase" type="submit" onClick={(e) => handleSubmit(e)}>Preview</Button>
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

export default EditPost
