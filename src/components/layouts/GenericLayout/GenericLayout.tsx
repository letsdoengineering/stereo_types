import React from 'react'
import Head from '../../basics/Head/Head'
import Heading from '../../basics/Heading/Heading'
import genericLayoutStyles from './GenericLayout.module.css'

interface GenericLayoutProps {
  children: React.ReactNode
}

/** GenericLayout: generic layout with a footer and header used to e.g. wrap other layouts */
const GenericLayout = ({ children }: GenericLayoutProps): React.ReactNode => (
  <div className={genericLayoutStyles.fullPage}>
    <Head>
      <title>Engineering Survey for wee ones</title>
    </Head>
    <main>
      <Heading>Engineering Survey for wee ones</Heading>
      <div className={genericLayoutStyles.mainContent}>{children}</div>
    </main>
  </div>
)

export default GenericLayout
