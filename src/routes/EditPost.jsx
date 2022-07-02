import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { HeaderAlt, Container, Row, Col, Form, Button, Editor } from '../components'
import { getPost, updatePost } from '../utils'
import { useAuth } from '../hooks'

const EditPost = () => {
  const [postData, setPostData] = useState({
    title: '',
    author: '',
    previewText: '',
    content: ''
  })

  const { id } = useParams()

  const { auth } = useAuth()

  const titleRef = useRef()

  const previewTextRef = useRef()

  const editorRef = useRef()

  const navigate = useNavigate()

  const handleSave = async () => {
    await updatePost(id, auth.username, titleRef.current.value, previewTextRef.current.value, editorRef.current.getContent(), auth.token)
  }

  const handlePreview = async () => {
    await updatePost(id, auth.username, titleRef.current.value, previewTextRef.current.value, editorRef.current.getContent(), auth.token)
    navigate(`/preview/${id}`)
  }

  useEffect(() => {
    getPost(id)
      .then((result) => setPostData(result))
  }, [])

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
                    <Form.Control ref={titleRef} name="Title" type="text" placeholder="Title" style={{ fontSize: '20px' }} defaultValue={postData.title}/>
                    <Form.Label htmlFor="Title">Title</Form.Label>
                    <div className="invalid-feedback"></div>
                  </div>
                  <div className="form-floating">
                    <Form.Control ref={previewTextRef} name="Subheading" type="text" placeholder="Subheading" style={{ fontSize: '20px' }} defaultValue={postData.previewText}/>
                    <Form.Label htmlFor="Subheading">Subheading</Form.Label>
                    <div className="invalid-feedback"></div>
                  </div>
                  <Editor
                  onInit={function (evt, editor) {
                    editorRef.current = editor
                  }}
                  className="form-control"
                  apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                  initialValue={postData.content}
                  init={{
                    selector: 'textarea',
                    menubar: false,
                    toolbar: false,
                    plugins: 'autoresize quickbars table link',
                    skin: 'snow',
                    icons: 'thin',
                    placeholder: 'What do you want to say?',
                    content_style: "@import url('https://fonts.googleapis.com/css2?family=Tinos&display=swap'); body { font-family: 'Tinos', serif; font-size: 16pt; color: #292929; }",
                    quickbars_selection_toolbar: 'bold italic | h2 | blockquote | table link',
                    quickbars_insert_toolbar: false
                  }}/>
                  <br />
                  <div className="mb-3">
                    <Button className="btn btn-primary text-uppercase" type="button" onClick={handleSave}>Save</Button>
                  </div>
                  <div className="mb-3">
                    <Button className="btn btn-danger text-uppercase" type="button" onClick={handlePreview}>Preview</Button>
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
