import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { HeaderAlt } from '../components'
import { useAuth } from '../hooks'

const Logout = () => {
  const navigate = useNavigate()

  const { setAuth } = useAuth()

  useEffect(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setAuth({})
    navigate(-1)
  }, [])

  return (
    <>
      <HeaderAlt />
    </>
  )
}

export default Logout
