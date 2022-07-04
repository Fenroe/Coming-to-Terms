import React, { useState } from 'react'
import { AuthContext } from './index'
import PropTypes from 'prop-types'

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: '',
    username: '',
    isContributor: null
  })

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.any
}

export default AuthProvider
