import React, { useState } from 'react'
import { format } from 'date-fns'

import BreadcrumbNav from '../basics/BreadcrumbNav/BreadcrumbNav'
import Text from '../basics/Text/Text'
import Heading from '../basics/Heading/Heading'
import { getDataFromLocalStorage, setDataToLocalStorage } from '../../utils/use-local-storage'
import './ManageDownload.css'

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

function convertToCSV(arr: any[]): string {
  const array = [Object.keys(arr[0])].concat(arr)
  return array
    .map((it) => {
      return Object.values(it).toString()
    })
    .join('\n')
}

const ManageDownloads: React.FC = (): JSX.Element => {
  const [allGroupsData, setAllGroupsData] = useState(getDataFromLocalStorage('allGroups'))
  // const allGroupsData = getDataFromLocalStorage('allGroups')
  const allGroupNames = Object.keys(allGroupsData)

  const handleDeleteGroup = (groupName: string): void => {
    const shouldDelete = window.confirm(
      `PRESS OK TO REMOVE ALL THE DATA FOR '${groupName}'. Press Cancel to leave it alone.`
    )
    if (shouldDelete) {
      const reallyShouldDelete = window.confirm(
        `ARE YOU SURE!?? Pressing 'OK' will remove data for group "${groupName}". Press 'Cancel' to back away from this.`
      )
      if (reallyShouldDelete) {
        // const allGroupsData = getDataFromLocalStorage('allGroups')
        const remainingGroupNames = Object.keys(allGroupsData).filter(
          (group) => group !== groupName
        )
        const remainingGroupsData: Record<string, any> = {}
        remainingGroupNames.forEach(
          (groupName) => (remainingGroupsData[groupName] = allGroupsData[groupName])
        )
        setDataToLocalStorage(remainingGroupsData, 'allGroups')
        setAllGroupsData(remainingGroupsData)
      }
    }
  }

  // map over the names of each group to make cvs file and download link
  const groupDownLoadLinks = allGroupNames.map((groupName) => {
    const namesInGroup = Object.keys(allGroupsData[groupName]) // get array of child names from group to pull data out with for flattening
    const arrayOfGroupsFlattenedData = namesInGroup.map((name) => {
      // Pull out each child's data using their name from current group: allGroupsData[groupName][name]
      // then flatten that survey-data object so all the flat keys are the same
      // (child's name is in the values, group name is the file name)
      return flattenObject(allGroupsData[groupName][name])
    })
    const csvData = convertToCSV(arrayOfGroupsFlattenedData) // convert array of groups flattened data to csv
    const todaysDate = format(new Date(), 'yyyy-MM-dd')
    const fileName = groupName + '_' + todaysDate
    return (
      <li key={fileName} className='download_list_item'>
        <a
          className='download_link'
          href={`data:text/json;charset=utf-8,${csvData}`}
          download={`${fileName}.csv`}
        >
          <Text size='XL'>{groupName}</Text>
        </a>
        <button
          className='download_delete_button'
          type='button'
          onClick={(): void => handleDeleteGroup(groupName)}
        >
          Delete Group
        </button>
      </li>
    )
  })

  return (
    <>
      <BreadcrumbNav urlList={[{ url: '.', label: 'RE-START' }, { label: 'Manage Downloads' }]} />
      <div className='download_content'>
        <Heading level='2'>
          <Text size='L'>
            Click group name to download a csv file of the group&apos;s survey data
          </Text>
        </Heading>
        <ul>{groupDownLoadLinks}</ul>
      </div>
    </>
  )
}

export default ManageDownloads
