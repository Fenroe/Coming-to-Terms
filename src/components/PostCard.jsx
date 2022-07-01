import React from 'react'

const PostCard = () => {
  return (
    <div className="post-preview">
      <a href="">
        <h2 className="post-title">An Interesting Blog Post</h2>
        <h3 className="post-subtitle">An interesting blog post that also has an interesting subtitle.</h3>
      </a>
      <p className="post-meta">Posted by <a href="">User</a> on September 24 2021</p>
      <hr className="my-4" />
    </div>
  )
}

export default PostCard
