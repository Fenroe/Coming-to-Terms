const organiseArchive = (posts) => {
  posts.sort((a, b) => b.datePublished - a.datePublished)
  const monthAndYearSet = new Set()
  posts.forEach((post) => monthAndYearSet.add(post.yearAndMonthPublished))
  const archive = []
  monthAndYearSet.forEach((entry) => {
    const array = posts.filter((post) => post.yearAndMonthPublished === entry ? post : null)
    archive.push(array)
  })
  return archive
}

export default organiseArchive
