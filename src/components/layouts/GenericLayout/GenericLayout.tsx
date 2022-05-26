import React from 'react'
import Head from '../../basics/Head/Head'
import Heading from '../../basics/Heading/Heading'
import * as genericLayoutStyles from './GenericLayout.module.css'

/** GenericLayout: generic layout with a footer and header used to e.g. wrap other layouts */
const GenericLayout: React.FC = ({ children }) => (
  <div className={genericLayoutStyles.fullPage}>
    <Head title='Engineering Survey for wee ones' />
    <main>
      <Heading>Engineering Survey for wee ones</Heading>
      <div className={genericLayoutStyles.mainContainer}>{children}</div>
    </main>
  </div>
)

export default GenericLayout
