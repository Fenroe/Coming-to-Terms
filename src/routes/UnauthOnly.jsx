import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks'

const UnauthOnly = () => {
  const { auth } = useAuth()

  const navigate = useNavigate()

  return (
    <>
      { !auth.token ? <Outlet /> : navigate('/', { replace: true }) }
    </>
  )
}

export default UnauthOnly
