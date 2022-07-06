import React from 'react'
import PropTypes from 'prop-types'
import { Card, Dropdown, ThreeDots } from './index'
import { useAuth } from '../hooks'

const Comment = ({ author, content, dateCommented, dateEdited }) => {
  const { auth } = useAuth()

  return (
    <div className="my-5">
      <Card>
        <Card.Header className="comment-header">
          <div>
            <Card.Title as="a" href={`/profile/${author}`} className="comment-author-text">
              {author}
            </Card.Title>
            <Card.Subtitle>
              {dateCommented}
            </Card.Subtitle>
          </div>
          {auth.username === author &&
          <Dropdown>
            <Dropdown.Toggle className="comment-options-btn"><ThreeDots /></Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <button className="comment-dropdown-btn">Edit comment</button>
              </Dropdown.Item>
              <Dropdown.Item>
                <button className="comment-dropdown-btn">Delete comment</button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          }
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
