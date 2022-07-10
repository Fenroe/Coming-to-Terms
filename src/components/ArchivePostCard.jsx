import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ArchivePostCard = ({ id, title, subtitle, author, datePublished }) => {
  return (
    <div className="post-preview">
      <Link to={`/posts/${id}`}>
        <h2 className="post-title">{title}</h2>
        <h3 className="post-subtitle">{subtitle}</h3>
      </Link>
      <p className="post-meta">Posted by <Link to={`/profile/${author}`}>{author}</Link> on {datePublished}</p>
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
