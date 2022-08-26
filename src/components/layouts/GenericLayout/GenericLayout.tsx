import React from 'react'
import Heading from '../../basics/Heading/Heading'
import './GenericLayout.css'

interface GenericLayoutProps {
  children: React.ReactNode
}

/** GenericLayout: generic layout with a footer and header used to e.g. wrap other layouts */
const GenericLayout = ({ children }: GenericLayoutProps): JSX.Element => (
  <div className='generic-layout_full-page'>
    <main>
      <Heading>Engineering Survey for wee ones</Heading>
      <div className='generic-layout_main-content'>{children}</div>
    </main>
  </div>
)

export default GenericLayout
