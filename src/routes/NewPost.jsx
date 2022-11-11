import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  HeaderAlt, Container, Row, Col, Form, Button,
  MainNav, ErrorAlert
} from '../components'
import { useAuth } from '../hooks'
import { createNewPost } from '../utils'

const NewPost = () => {
  const [loading, setLoading] = useState()

  const [errorMessage, setErrorMessage] = useState('')

  const { auth } = useAuth()

  const titleRef = useRef()

  const navigate = useNavigate()

  const titleOnChange = () => {
    if (titleRef.current.value.length <= 50) {
      return setErrorMessage('')
    } else {
      return setErrorMessage('Title can\'t be longer than 50 characters.')
    }
  }

  const handleContinue = async () => {
    if (loading) return
    if (!titleRef.current.value) return setErrorMessage('Please enter a title.')
    if (titleRef.current.value.length > 50) return setErrorMessage('Title can\'t be longer than 50 characters.')
    try {
      setLoading(true)
      const newPostUrl = await createNewPost(titleRef.current.value, auth.username, auth.token)
      navigate(`/posts/edit/${newPostUrl}`)
    } catch (err) {
      setErrorMessage('Sorry, something went wrong. Your post hasn\'t been created.')
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
              <h1 className="text-center">Create New Post</h1>
              <div className="my-5">
                <Form>
                  <Form.Floating>
                    <Form.Control ref={titleRef} onChange={titleOnChange} type="text" name="title" id="title" placeholder="Title"/>
                    <Form.Label htmlFor="title">Title</Form.Label>
                  </Form.Floating>
                  <br />
                  <Button type="button" onClick={handleContinue}>Continue</Button>
                </Form>
                {errorMessage !== '' && <ErrorAlert errorMessage={errorMessage} closeAlert={() => setErrorMessage('')}/>}
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

export default NewPost
