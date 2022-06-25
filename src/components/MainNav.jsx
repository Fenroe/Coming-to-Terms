import React from 'react'
import { Navbar, Container, Nav } from './index'

const MainNav = () => {
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
            <Nav.Item as="li">
              <Nav.Link className="nav-link px-lg-3 py-3 py-lg-4" href="/login">Log in</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link className="nav-link px-lg-3 py-3 py-lg-4" href="/signup">Sign up</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MainNav
