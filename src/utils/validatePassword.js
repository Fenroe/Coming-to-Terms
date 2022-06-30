const validatePassword = (password, cb) => {
  let result = true
  if (!password) {
    result = false
  } else {
    if (password.length < 6) result = false
  }
  if (!cb) return result
  cb(result)
}

export default validatePassword
