import React from 'react'
import { MainNav, HeaderAlt } from '../components'

const Forbidden = () => {
  return (
    <>
      <MainNav />
      <HeaderAlt />
      <main>
        <h1>Sorry, you don&apos;t have permission to view this page.</h1>
      </main>
    </>
  )
}

export default Forbidden
