import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useAuth } from '../hooks'

const Private = ({ children }) => {
  const [identityChecked, setIdentityChecked] = useState(false)

  const { setAuth } = useAuth()

  useEffect(() => {
    if (identityChecked) return
    setAuth({
      token: localStorage.getItem('token'),
      username: localStorage.getItem('username')
    })
    setIdentityChecked(true)
  }, [])

  return (
    <>
      {identityChecked ? children : null}
    </>
  )
}

Private.propTypes = {
  children: PropTypes.any
}

export default Private
