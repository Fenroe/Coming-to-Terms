import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
        <Link className="navbar-brand" to="/">Coming to Terms</Link>
        <Navbar.Toggle />
        <Navbar.Collapse id="navbarResponsive">
          <Nav className="navbar-nav ms-auto py-4 py-lg-0">
            <Nav.Item as="li" className="nav-item">
              <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/">Home</Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/about">About</Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/posts/archive">Archive</Link>
            </Nav.Item>
            { auth.token
              ? (
              <>
                <Nav.Item as="li">
                  <Link className="nav-link px-lg-3 py-3 py-lg-4" to={`/profile/${auth.username}`}>Profile</Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Link className="nav-link px-lg-3 py-3 py-lg-4" to='/logout'>Log out</Link>
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
                  <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/login">Log in</Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/signup">Sign up</Link>
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
