import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../hooks'
import { Forbidden } from './index'

const AuthOnly = () => {
  const { auth } = useAuth()

  return (
    <>
      { auth.token ? <Outlet /> : <Forbidden /> }
    </>
  )
}

export default AuthOnly
