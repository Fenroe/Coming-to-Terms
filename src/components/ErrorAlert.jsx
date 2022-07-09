import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from './index'

const ErrorAlert = ({ errorMessage, closeAlert }) => {
  return (
    <Alert style={{ width: '100%' }} variant="danger" onClose={closeAlert}>
      {typeof errorMessage === 'string' && <span>{errorMessage}</span> }
      {Array.isArray(errorMessage) &&
      <ul>
        {errorMessage.map((message) =>
        <li key={message}>
          {message}
        </li>)}
      </ul>
      }
    </Alert>
  )
}

ErrorAlert.propTypes = {
  errorMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  closeAlert: PropTypes.func
}

export default ErrorAlert
