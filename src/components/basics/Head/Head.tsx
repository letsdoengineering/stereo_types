import React from 'react'
import { Helmet } from 'react-helmet'

type HeadProps = {
  title: string
}

/** Head: reusable <head> elements built with react-helmet */
const Head: React.FC<HeadProps> = ({ title }: HeadProps) => {
  return (
    <Helmet
      htmlAttributes={{
        lang: 'en',
      }}
    >
      <title>{title}</title>
      <script src='https://kit.fontawesome.com/3fb4da1d2f.js' crossOrigin='anonymous' />
    </Helmet>
  )
}

export default Head
