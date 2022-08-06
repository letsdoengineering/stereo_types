import React from 'react'
import { format } from 'date-fns'

import { getDataFromLocalStorage } from '../../../utils/use-local-storage'
import BreadcrumbNav from '../../basics/BreadcrumbNav/BreadcrumbNav'

const DownloadSection: React.FC = () => {
  const data = getDataFromLocalStorage('proj') || {}
  console.log('localStorage:', data)
  const fileName = data?.details?.name ? data.details.name : 'NONAME'
  const today = format(new Date(), 'yyyy-MM-dd')
  return (
    <>
      <BreadcrumbNav urlList={[{ url: '/', label: 'RE-START' }, { label: 'Download' }]} />
      <p>{JSON.stringify(data)}</p>
      <p>
        <a
          href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`}
          download={`${fileName}.csv`}
        >
          {`DOWNLOAD data: "${fileName}-${today}.csv"`}
        </a>
      </p>
    </>
  )
}

export default DownloadSection
