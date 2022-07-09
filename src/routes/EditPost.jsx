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

  const [errorMessage, setErrorMessage] = useState('')

  const [coverImageUrl, setCoverImageUrl] = useState('')

  const { id } = useParams()

  const { auth } = useAuth()

  const titleRef = useRef()

  const previewTextRef = useRef()

  const coverImageUrlRef = useRef()

  const editorRef = useRef()

  const navigate = useNavigate()

  const validateTitle = () => {
    if (titleRef.current.value === '') {
      setErrorMessage('Title can\'t be left blank')
    }
  }

  const onCoverImageUrlChange = () => {
    setCoverImageUrl(coverImageUrlRef.current.value)
  }

  const onImgError = () => {
    if (coverImageUrl) {
      setErrorMessage('URL does not point to an image')
    }
  }

  const getPostWithId = async () => {
    return await getPost(id)
  }

  const { data, status } = useQuery('editPostData', getPostWithId)

  const onFocus = () => {
    setShowSuccess(false)
    setErrorMessage('')
  }

  const handleSave = async () => {
    if (loading) return
    validateTitle()
    if (errorMessage !== '') return
    setLoading(true)
    await updatePost(id, auth.username, titleRef.current.value, previewTextRef.current.value, coverImageUrlRef.current.value, editorRef.current.getContent(), auth.token)
    setErrorMessage('')
    setShowSuccess(true)
    setLoading(false)
  }

  const handlePreview = async () => {
    if (loading) return
    validateTitle()
    if (errorMessage !== '') return
    setLoading(true)
    await updatePost(id, auth.username, titleRef.current.value, previewTextRef.current.value, coverImageUrlRef.current.value, editorRef.current.getContent(), auth.token)
    setErrorMessage('')
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
                    <Form.Control onFocus={onFocus} onBlur={validateTitle} ref={titleRef} name="title" type="text" placeholder="Title" style={{ fontSize: '20px' }} defaultValue={data.title}/>
                    <Form.Label htmlFor="title">Title</Form.Label>
                    <div className="invalid-feedback"></div>
                  </div>
                  <div className="form-floating">
                    <Form.Control ref={previewTextRef} onFocus={onFocus} name="subheading" type="text" placeholder="Subheading" style={{ fontSize: '20px' }} defaultValue={data.previewText}/>
                    <Form.Label htmlFor="subheading">Subheading</Form.Label>
                    <div className="invalid-feedback"></div>
                  </div>
                  <div className="form-floating">
                    <img style={{ display: 'none' }} src={coverImageUrl} onError={onImgError}/>
                    <Form.Control ref={coverImageUrlRef} onFocus={onFocus} onChange={onCoverImageUrlChange} name="cover-image" type="text" defaultValue={data.coverImage || ''}placeholder="cover-image" style={{ fontSize: '20px' }} />
                    <Form.Label htmlFor="cover-image">Cover image URL</Form.Label>
                  <div className="invalid-feedback"></div>
                  </div>
                  <Editor
                  onInit={function (evt, editor) {
                    editorRef.current = editor
                  }}
                  onFocus={onFocus}
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
                  {!data.isPublished &&
                    <div className="mb-3">
                      <Button className="btn btn-danger text-uppercase" type="button" onClick={handlePreview}>Preview</Button>
                    </div>
                  }
                  {showSuccess && <SuccessAlert closeAlert={() => setShowSuccess(false)}/>}
                  {errorMessage !== '' && <ErrorAlert errorMessage={errorMessage} closeAlert={() => setErrorMessage('')} />}
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
