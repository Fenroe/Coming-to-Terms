import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../hooks'
import { Forbidden } from './index'

const ContributorOnly = () => {
  const { auth } = useAuth()

  return (
    <>
      { auth.isContributor === true ? <Outlet /> : <Forbidden /> }
    </>
  )
}

export default ContributorOnly
