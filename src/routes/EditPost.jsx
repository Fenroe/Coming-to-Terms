import React, { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  HeaderAlt, Container, Row, Col, Form, Button, Editor, MainNav,
  SuccessAlert,
  ErrorAlert
} from '../components'
import { getPost, updatePost } from '../utils'
import { useAuth } from '../hooks'
import { useQuery } from 'react-query'

const EditPost = () => {
  const [loading, setLoading] = useState(false)

  const [showSuccess, setShowSuccess] = useState(false)

  const [showError, setShowError] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')

  const { id } = useParams()

  const { auth } = useAuth()

  const titleRef = useRef()

  const previewTextRef = useRef()

  const editorRef = useRef()

  const navigate = useNavigate()

  const validateTitle = () => {
    if (titleRef.current.value === '') {
      setErrorMessage('Title can\'t be left blank')
      setShowError(true)
    }
  }

  const getPostWithId = async () => {
    return await getPost(id)
  }

  const { data, status } = useQuery('editPostData', getPostWithId)

  const handleSave = async () => {
    if (loading) return
    validateTitle()
    if (errorMessage !== '') return
    setLoading(true)
    await updatePost(id, auth.username, titleRef.current.value, previewTextRef.current.value, editorRef.current.getContent(), auth.token)
    setShowSuccess(true)
    setLoading(false)
  }

  const handlePreview = async () => {
    if (loading) return
    validateTitle()
    if (errorMessage !== '') return
    setLoading(true)
    await updatePost(id, auth.username, titleRef.current.value, previewTextRef.current.value, editorRef.current.getContent(), auth.token)
    navigate(`/preview/${id}`)
    setLoading(false)
  }

  return (
      <>
        <MainNav />
        <HeaderAlt />
        <main className="mb-4">
        <Container className="px-4 px-lg-5">
          <Row className="gx-4 gx-lg-5 justify-content-center">
            {status === 'success' &&
            <Col className="md-10" lg={8} xl={7}>
              <h1 className="text-center">Write Your Post</h1>
              <div className="my-5">
                <Form autoComplete="off">
                  <input autoComplete="false" name="hidden" tyoe="text" style={{ display: 'none' }} />
                  <div className="form-floating">
                    <Form.Control onBlur={validateTitle} ref={titleRef} name="Title" type="text" placeholder="Title" style={{ fontSize: '20px' }} defaultValue={data.title}/>
                    <Form.Label htmlFor="Title">Title</Form.Label>
                    <div className="invalid-feedback"></div>
                  </div>
                  <div className="form-floating">
                    <Form.Control ref={previewTextRef} name="Subheading" type="text" placeholder="Subheading" style={{ fontSize: '20px' }} defaultValue={data.previewText}/>
                    <Form.Label htmlFor="Subheading">Subheading</Form.Label>
                    <div className="invalid-feedback"></div>
                  </div>
                  <Editor
                  onInit={function (evt, editor) {
                    editorRef.current = editor
                  }}
                  className="form-control"
                  apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                  initialValue={data.content}
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
                  {showSuccess && <SuccessAlert closeAlert={() => setShowSuccess(false)}/>}
                  {showError && <ErrorAlert errorMessage={errorMessage} closeAlert={() => setShowError(false)} />}
                </Form>
              </div>
            </Col>
            }
          </Row>
        </Container>
      </main>
      </>
  )
}

export default EditPost
