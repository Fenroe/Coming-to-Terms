import React from 'react'
import PropTypes from 'prop-types'

const ProfileDrafts = ({ drafts }) => {
  return (
    <div className="">
      <h1>Drafts</h1>
      {drafts.length === 0 && <p>No drafts</p>}
      {drafts.map((post) =>
      <div key={post._id} className="">
        <a href={`/posts/edit/${post._id}`}>{post.title}</a>
      </div>
      )}
    </div>
  )
}

ProfileDrafts.propTypes = {
  drafts: PropTypes.array
}

export default ProfileDrafts
