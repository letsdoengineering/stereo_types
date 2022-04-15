import React from 'react'

import { getPreviousSearchDataFromLocalStorage } from '../../../utils/use-local-storage'
import BreadcrumbNav from '../../basics/BreadcrumbNav/BreadcrumbNav'

const DownloadSection: React.FC = () => {
    const data = getPreviousSearchDataFromLocalStorage('proj') || {}
    console.log('localStorage:', data)
    const fileName = data?.details?.name ? data.details.name : 'NONAME'
    const today = new Date()
    return (
        <>
            <BreadcrumbNav
                urlList={[
                    { url: '/', label: 're-start' },
                    { url: '/proj2', label: 're-choose survey questions' },
                    { label: 'download' },
                ]}
            />
            <p>{JSON.stringify(data)}</p>
            <a
                href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`}
                download={`${fileName}.csv`}
            >
                {`DOWNLOAD data: "${fileName}-${today}.csv"`}
            </a>
        </>
    )
}

export default DownloadSection
