import React from 'react'
import PropTypes from 'prop-types'

const ArchivePostCard = ({ id, title, subtitle, author, datePublished }) => {
  return (
    <div className="post-preview">
      <a href={`/coming-to-terms/posts/${id}`}>
        <h2 className="post-title">{title}</h2>
        <h3 className="post-subtitle">{subtitle}</h3>
      </a>
      <p className="post-meta">Posted by <a href={`/coming-to-terms/profile/${author}`}>{author}</a> on {datePublished}</p>
      <hr className="my-4" />
    </div>
  )
}

ArchivePostCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  author: PropTypes.string,
  datePublished: PropTypes.string
}

export default ArchivePostCard
