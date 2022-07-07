import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from './index'

const SuccessAlert = ({ closeAlert }) => {
  return (
    <Alert variant="success" onClose={closeAlert} dismissible transition>
      Your changes have been saved
    </Alert>
  )
}

SuccessAlert.propTypes = {
  closeAlert: PropTypes.func
}

export default SuccessAlert
