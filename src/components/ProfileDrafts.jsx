import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, ThreeDots } from './index'

const ProfileDrafts = ({ drafts }) => {
  return (
    <div className="">
      <h1>Drafts</h1>
      {drafts.length === 0 && <p>No drafts</p>}
      {drafts.map((post) =>
        <div className="profile-post-container" key={post._id}>
          <a href={`/coming-to-terms/posts/edit/${post._id}`}>{post.title}</a>
          <Dropdown>
            <Dropdown.Toggle className="comment-options-btn"><ThreeDots /></Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as="div">
                <a href={`/coming-to-terms/posts/edit/${post._id}`}>Edit post</a>
              </Dropdown.Item>
              <Dropdown.Item>Delete post</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </div>
  )
}

ProfileDrafts.propTypes = {
  drafts: PropTypes.array
}

export default ProfileDrafts
