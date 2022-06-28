import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, About, Archive, EditPost, DeletePost, Login, Signup, Profile } from './routes'
import { MainNav } from './components'
import { AuthProvider } from './contexts'

export const App = () => {
  return (
    <AuthProvider>
      <MainNav />
      <Router>
        <Routes>
          <Route exact path="/" element={ <Home /> } />
          <Route exact path="/about" element={ <About /> } />
          <Route exact path = "/posts/archive" element={ <Archive /> } />
          <Route exact path="/posts/edit/:id" element={ <EditPost /> } />
          <Route exact path ="/posts/delete/:id" element={ <DeletePost /> } />
          {<Route exact path="/login" element={ <Login /> } /> }
          <Route exact path = "/signup" element={ <Signup /> } />
          <Route exact path ="/profile/:id" element={ <Profile /> } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}
