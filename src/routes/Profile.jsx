import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { HeaderAlt, Container, Row, Col, Nav, ProfilePosts, ProfileBio, ThreeDots, Dropdown } from '../components'
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
        bio: response.data.userData.bio,
        isContributor: response.data.userData.isContributor
      })
      setPublishedPosts(response.data.posts.published)
      setDrafts(response.data.posts.drafts)
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
        <Col className="md-10 justify-content-between" lg={8} xl={7}>
          <div className="profile-heading">
            <h1>{profileInfo.username}</h1>
            {profileInfo.username === auth.username &&
              (
              <Dropdown>
                <Dropdown.Toggle style={{ backgroundColor: 'transparent', border: 'none' }}>
                  <ThreeDots className="profile-heading-three-dots"/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Edit profile</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Delete account</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              )}
          </div>
        </Col>
      </Row>
      <Row className="gx-4 gx-lg-5 justify-content-center">
        <Col className="md-10" lg={8} xl={7}>
          <Nav className="nav-tabs justify-content-center">
            <Nav.Link className={setActive('bio')} onClick={() => setShowing('bio')}>Bio</Nav.Link>
            {profileInfo.isContributor && <Nav.Link className={setActive('posts')} onClick={() => setShowing('posts')}>Posts</Nav.Link>}
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
