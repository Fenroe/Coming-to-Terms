import React from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Button from 'react-bootstrap/Button'
import { shortenKeyword } from '../utils'

const ArticleCard = ({ article }) => {
  return (
    <Card style={{ minWidth: '18rem', height: '25rem', marginBottom: '1rem' }}>
      <Card.Header>
        {article.datePublishedFromNow}
      </Card.Header>
      <Card.Body>
        <Card.Title>{article.title}</Card.Title>
        <Card.Text>
          {article.previewText}
        </Card.Text>
        <ListGroup horizontal>
          {article.keywords.map((keyword) =>
          <OverlayTrigger
          key={keyword}
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip>{keyword}</Tooltip>}
          >
            <ListGroup.Item action href="/about">{shortenKeyword(keyword)}</ListGroup.Item>
          </OverlayTrigger>
          )}
        </ListGroup>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary">Read more</Button>
      </Card.Footer>
    </Card>
  )
}

ArticleCard.propTypes = {
  article: PropTypes.object
}

export default ArticleCard
