import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar, Container, Nav, Button } from './index'
import { useAuth } from '../hooks'

const MainNav = () => {
  const { auth } = useAuth()

  const navigate = useNavigate()

  const handleNewPostClick = () => {
    if (auth.isContributor) {
      navigate('/newpost')
    }
  }

  return (
    <Navbar expand="lg" variant="light" id="mainNav" aria-controls='navbarResponsive' aria-expanded='false' aria-label='Toggle navigation'>
      <Container className="px-4 px-lg-5">
        <Navbar.Brand href="/">Coming to Terms</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="navbarResponsive">
          <Nav className="navbar-nav ms-auto py-4 py-lg-0">
            <Nav.Item as="li" className="nav-item">
              <Nav.Link className="nav-link px-lg-3 py-3 py-lg-4" href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link className="nav-link px-lg-3 py-3 py-lg-4" href="/about">About</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link className="nav-link px-lg-3 py-3 py-lg-4" href="/posts/archive">Archive</Nav.Link>
            </Nav.Item>
            { auth.token
              ? (
              <>
                <Nav.Item as="li">
                  <Nav.Link className="nav-link px-lg-3 py-3 py-lg-4" href={`/profile/${auth.username}`}>Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link className="nav-link px-lg-3 py-3 py-lg-4" href='/logout'>Log out</Nav.Link>
                </Nav.Item>
                    {auth.isContributor === true && (
                      <Nav.Item as="li" className="nav-btn-container">
                        <Button onClick={handleNewPostClick}>New Post</Button>
                      </Nav.Item>
                    )}
              </>)
              : (
                <>
                <Nav.Item as="li">
                  <Nav.Link className="nav-link px-lg-3 py-3 py-lg-4" href="/login">Log in</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link className="nav-link px-lg-3 py-3 py-lg-4" href="/signup">Sign up</Nav.Link>
                </Nav.Item>
              </>
                )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MainNav
