import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { HeaderAlt, Container, Row, Col, Nav, ProfileActivity, ProfilePosts, ProfileAbout } from '../components'

const Profile = () => {
  const [showing, setShowing] = useState('activity')

  const setActive = (navItemName) => {
    if (navItemName === showing) {
      return 'active'
    }
  }

  const { userId } = useParams()

  const renderComponent = () => {
    if (showing === 'activity') {
      return <ProfileActivity />
    }
    if (showing === 'posts') {
      return <ProfilePosts />
    }
    if (showing === 'about') {
      return <ProfileAbout />
    }
  }
  useEffect(() => {
    console.log(userId)
  }, [])

  return (
    <>
    <HeaderAlt />
    <Container className="px-4 px-lg-5">
      <Row className="gx-4 gx-lg-5 justify-content-center">
        <Col className="md-10 text-center" lg={8} xl={7}>
          <h1>Fenroe</h1>
        </Col>
      </Row>
      <Row className="gx-4 gx-lg-5 justify-content-center">
        <Col className="md-10" lg={8} xl={7}>
          <Nav className="nav-tabs justify-content-center">
            <Nav.Link className={setActive('activity')} onClick={() => setShowing('activity')}>Activity</Nav.Link>
            <Nav.Link className={setActive('posts')} onClick={() => setShowing('posts')}>Posts</Nav.Link>
            <Nav.Link className={setActive('about')} onClick={() => setShowing('about')}>About</Nav.Link>
          </Nav>
        </Col>
      </Row>
      <Row className="gx-4 gx-lg-5 justify-content-center">
        {renderComponent()}
      </Row>
    </Container>
    </>
  )
}

export default Profile
