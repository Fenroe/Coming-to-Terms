import React from 'react'
import PropTypes from 'prop-types'
import { Alert, ListGroup } from './index'

const ErrorAlert = ({ errorMessage, closeAlert }) => {
  return (
    <Alert style={{ width: '100%' }} variant="danger" onClose={closeAlert} dismissible>
      {typeof errorMessage === 'string' && <span>{errorMessage}</span> }
      {Array.isArray(errorMessage) &&
      <ListGroup>
        {errorMessage.map((message) =>
        <ListGroup.Item variant="danger" key={message}>
          * {message}
        </ListGroup.Item>)}
      </ListGroup>
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
