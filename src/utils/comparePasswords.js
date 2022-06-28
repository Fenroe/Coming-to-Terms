const comparePasswords = (firstPassword, secondPassword, cb) => {
  let result = true
  if (!firstPassword || !secondPassword) return false
  if (firstPassword !== secondPassword) result = false
  if (!cb) return result
  cb(result)
}

export default comparePasswords
