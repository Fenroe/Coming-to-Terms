import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Posts, About } from './routes/index'
import { Container, Navbar, Nav } from './components'
import { headerImageHome } from './assets'

export const App = () => {
  return (
    <>
      <Navbar expand="lg" style={{ position: 'absolute', width: '100%' }}>
        <Container>
          <Navbar.Brand href="/">Coming to Terms</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/posts">Posts</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <header className="text-center" as="header" style={{
        width: '100%',
        height: '35rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${headerImageHome})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
        <Container>
          <h1>Coming to Terms</h1>
          <h2>Learning to let go, one day at a time.</h2>
        </Container>
      </header>
      <Router>
        <Routes>
          <Route exact path="/" element={ <Home /> } />
          <Route exact path="/posts" element={ <Posts /> } />
          <Route exact path="/about" element={ <About /> } />
        </Routes>
      </Router>
    </>
  )
}
