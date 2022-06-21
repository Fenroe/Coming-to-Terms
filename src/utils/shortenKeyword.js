const shortenKeyword = (keyword) => {
  if (keyword.length <= 12) {
    return keyword
  } else {
    return `${keyword.substring(0, 9)}...`
  }
}

export default shortenKeyword
