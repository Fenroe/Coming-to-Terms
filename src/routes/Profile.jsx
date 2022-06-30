import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { HeaderAlt, Container, Row, Col, Nav, ProfilePosts, ProfileBio } from '../components'
import { getUser } from '../utils'
import { useAuth } from '../hooks'

const Profile = () => {
  const { auth } = useAuth()

  const [profileInfo, setProfileInfo] = useState({
    username: '',
    bio: ''
  })

  const [publishedPosts, setPublishedPosts] = useState([])

  const [drafts, setDrafts] = useState([])

  const [showing, setShowing] = useState('bio')

  const setActive = (navItemName) => {
    if (navItemName === showing) {
      return 'active'
    }
  }

  const { id } = useParams()

  const navigate = useNavigate()

  const renderComponent = () => {
    if (showing === 'posts') {
      return <ProfilePosts publishedPosts={publishedPosts} drafts={drafts} username={profileInfo.username}/>
    }
    if (showing === 'bio') {
      return <ProfileBio bio={profileInfo.bio} username={profileInfo.username}/>
    }
  }
  useEffect(() => {
    const getProfileData = async () => {
      const response = await getUser(id)
      console.log(response)
      setProfileInfo({
        username: response.data.userData.username,
        bio: response.data.userData.bio
      })
      setPublishedPosts(response.data.posts.published)
      if (id === auth.username) {
        setDrafts(response.data.posts.drafts)
      }
    }

    if (id) {
      getProfileData()
    } else {
      navigate(-1)
    }
  }, [])

  return (
    <>
    <HeaderAlt />
    <Container className="px-4 px-lg-5">
      <Row className="gx-4 gx-lg-5 justify-content-center">
        <Col className="md-10 text-center" lg={8} xl={7}>
          <h1>{profileInfo.username}</h1>
        </Col>
      </Row>
      <Row className="gx-4 gx-lg-5 justify-content-center">
        <Col className="md-10" lg={8} xl={7}>
          <Nav className="nav-tabs justify-content-center">
            <Nav.Link className={setActive('bio')} onClick={() => setShowing('bio')}>Bio</Nav.Link>
            <Nav.Link className={setActive('posts')} onClick={() => setShowing('posts')}>Posts</Nav.Link>
          </Nav>
        </Col>
      </Row>
      <Row className="gx-4 gx-lg-5 justify-content-center">
        {renderComponent()}
      </Row>
    </Container>
    </>
  )
}

export default Profile
