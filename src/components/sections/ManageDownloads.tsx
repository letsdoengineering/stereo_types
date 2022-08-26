import React from 'react'
import { format } from 'date-fns'

import BreadcrumbNav from '../basics/BreadcrumbNav/BreadcrumbNav'
import Text from '../basics/Text/Text'
import { getDataFromLocalStorage } from '../../utils/use-local-storage'
import './Download.css'

function flattenObject(obj: Record<string, any>): Record<string, string> {
  const toReturn = {}

  for (const item in obj) {
    if (!obj.hasOwnProperty(item)) continue

    if (typeof obj[item] === 'object' && obj[item] !== null) {
      const flatObject = flattenObject(obj[item])
      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        toReturn[item + '.' + x] = flatObject[x]
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toReturn[item] = obj[item]
    }
  }
  return toReturn
}

function convertToCSV(arr: any[]): string[] {
  const array = [Object.keys(arr[0])].concat(arr)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return array
    .map((it) => {
      return Object.values(it).toString()
    })
    .join('\n')
}

const ManageDownloads: React.FC = (): JSX.Element => {
  // if (typeof window === 'undefined') return null
  const todaysDate = format(new Date(), 'yyyy-MM-dd')
  const allGroupsData = getDataFromLocalStorage('allGroups')
  console.log('allGroupsData:', allGroupsData)
  const groupNames = Object.keys(allGroupsData)

  const groupLinks = groupNames.map((groupName) => {
    const flatData = flattenObject(allGroupsData[groupName])
    const csv = convertToCSV([flatData])
    const fileName = groupName + '_' + todaysDate
    return (
      <a key={fileName} href={`data:text/json;charset=utf-8,${csv}`} download={`${fileName}.csv`}>
        <Text size='XL' className='download_link'>{`${fileName}.csv`}</Text>
      </a>
    )
  })

  return (
    <>
      <BreadcrumbNav urlList={[{ url: '.', label: 'RE-START' }, { label: 'Manage Downloads' }]} />
      <div className='download_content'>
        <div className='download_link-wrapper'>{groupLinks}</div>
      </div>
    </>
  )
}

export default ManageDownloads
