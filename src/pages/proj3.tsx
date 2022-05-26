import React from 'react'

import GenericLayout from '../components/layouts/GenericLayout/GenericLayout'
import DownloadSection from '../components/sections/proj/downloadSection'

const submissionPage: React.FC = () => {
  return (
    <GenericLayout>
      <DownloadSection />
    </GenericLayout>
  )
}

export default submissionPage
