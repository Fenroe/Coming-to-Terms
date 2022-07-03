import React from 'react'
import PropTypes from 'prop-types'
import { Card } from './index'

const Comment = ({ author, content, dateCommented, dateEdited }) => {
  return (
    <div className="my-5">
      <Card>
        <Card.Header>
          <Card.Title as="a" href={`/profile/${author}`} className="comment-author-text">
            {author}
          </Card.Title>
          <Card.Subtitle>
            {dateCommented}
          </Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {content}
          </Card.Text>
          {dateEdited && (
            <Card.Text className="edited-text">
              Edited {dateEdited}
            </Card.Text>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}

Comment.propTypes = {
  author: PropTypes.string,
  content: PropTypes.string,
  dateCommented: PropTypes.string,
  dateEdited: PropTypes.string
}

export default Comment
