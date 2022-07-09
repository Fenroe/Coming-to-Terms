import React from 'react'
import PropTypes from 'prop-types'
import { Col } from './index'
import { useAuth } from '../hooks'

const ProfileBio = ({ bio, username }) => {
  const { auth } = useAuth()

  const returnCorrectMessage = () => {
    if (username === auth.username) {
      return (
        <p>You haven&apos;t written a bio yet.</p>
      )
    } else {
      return (
        <p>This user hasn&apos;t written a bio yet.</p>
      )
    }
  }

  return (
    <>
      <Col className="md-10" lg={8} xl={7}>
        {bio ? <p>{bio}</p> : returnCorrectMessage()}
      </Col>
    </>
  )
}

ProfileBio.propTypes = {
  bio: PropTypes.string,
  username: PropTypes.string
}

export default ProfileBio
