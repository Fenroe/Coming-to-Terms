const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validateEmail = (email, cb) => {
  let result = true
  if (!emailRegex.test(email)) result = false
  if (!cb) return result
  cb(result)
}

export default validateEmail
