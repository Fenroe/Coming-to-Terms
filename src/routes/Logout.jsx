import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks'

const Logout = () => {
  const navigate = useNavigate()

  const { setAuth } = useAuth()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('isContributor')
    localStorage.removeItem('email')
    setAuth({
      token: '',
      username: '',
      isContributor: null,
      email: ''
    })
    navigate('/', { replace: true })
  }

  useEffect(() => {
    handleLogout()
  }, [])

  return (
    <main />
  )
}

export default Logout
