import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, About, Archive, EditPost, DeletePost, Login, Signup, Profile, Logout, NewPost, EditProfile, Preview, Post, AuthOnly, ContributorOnly, UnauthOnly, NotFound } from './routes'
import { useAuth } from './hooks'

export const App = () => {
  const { setAuth } = useAuth()

  useEffect(() => {
    setAuth({
      token: localStorage.getItem('token'),
      username: localStorage.getItem('username'),
      isContributor: localStorage.getItem('isContributor')
    })
  }, [])

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={ <Home /> } />
        <Route exact path="/about" element={ <About /> } />
        <Route exact path="/posts/archive" element={ <Archive /> } />
        <Route exact path="/posts/:id" element={ <Post /> } />
        <Route exact path="/profile/:id" element={ <Profile /> } />
        <Route element={<UnauthOnly />}>
          <Route exact path="/login" element={ <Login /> } />
          <Route exact path="/signup" element={ <Signup /> } />
        </Route>
        <Route element={<AuthOnly />}>
          <Route exact path="/logout" element={ <Logout /> } />
          <Route exact path="/editprofile" element={ <EditProfile /> } />
        </Route>
        <Route element={<ContributorOnly /> }>
          <Route exact path="/newpost" element={ <NewPost /> } />
          <Route exact path="/preview/:id" element={ <Preview /> } />
          <Route exact path="/posts/edit/:id" element={ <EditPost /> } />
          <Route exact path="/posts/delete/:id" element={ <DeletePost /> } />
        </Route>
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}
