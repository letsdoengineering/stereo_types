import React from 'react'
import { Helmet } from 'react-helmet'

type HeadProps = {
  children: React.ReactNode
}

/** Head: reusable <head> elements built with react-helmet */
const Head = ({ children }: HeadProps): JSX.Element => {
  return (
    <Helmet
      htmlAttributes={{
        lang: 'en',
      }}
    >
      <script src='https://kit.fontawesome.com/3fb4da1d2f.js' crossOrigin='anonymous' />
      {children}
    </Helmet>
  )
}

export default Head
