import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { HeaderAlt, MainNav } from '../components'
import { useAuth } from '../hooks'

const Logout = () => {
  const navigate = useNavigate()

  const { setAuth } = useAuth()

  useEffect(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('isContributor')
    setAuth({})
    navigate(-1, { replace: true })
  }, [])

  return (
    <>
      <MainNav />
      <HeaderAlt />
    </>
  )
}

export default Logout
