const usernameRegex = /^\w+$/
/*
^ : start of string
[ : beginning of character group
\w : expect to cover alphanumeric, underscore and non-Latin alphabets
] : end of character group
+ : one or more of the given characters
$ : end of string
*/

const validateUsername = (username, cb) => {
  let result = true
  if (!username) return false
  if (username.length < 3) result = false
  if (username.length > 20) result = false
  if (!usernameRegex.test(username)) result = false
  if (!cb) return result
  cb(result)
}

export default validateUsername
