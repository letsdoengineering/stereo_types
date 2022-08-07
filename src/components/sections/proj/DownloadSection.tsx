import React from 'react'
import { format } from 'date-fns'
import { navigate } from 'gatsby'

import BreadcrumbNav from '../../basics/BreadcrumbNav/BreadcrumbNav'
import Text from '../../basics/Text/Text'
import * as downloadStyles from './Download.module.css'

function flattenObject(obj: Record<string, any>): Record<string, string> {
  const toReturn = {}

  for (const item in obj) {
    if (!obj.hasOwnProperty(item)) continue

    if (typeof obj[item] == 'object' && obj[item] !== null) {
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

const DownloadSection: React.FC = () => {
  if (typeof window == 'undefined') return null
  const detailsFormString = window.sessionStorage.getItem('detailsForm')
  const quizQuestionsString = window.sessionStorage.getItem('quizQuestions')
  const smileyQuestionsString = window.sessionStorage.getItem('smileyQuestions')
  const characterString = window.sessionStorage.getItem('character')
  const details = detailsFormString ? JSON.parse(detailsFormString) : null
  const character = characterString ? JSON.parse(characterString) : null
  const smileyQuestions = smileyQuestionsString ? JSON.parse(smileyQuestionsString) : null
  const quizQuestions = quizQuestionsString ? JSON.parse(quizQuestionsString) : null
  if (!details) {
    navigate('/').then()
  }
  if (details) {
    const data = { details, character, smileyQuestions, quizQuestions }
    console.log('DATA from session storage:', data)
    const childName = data.details.name
    const groupName = data.details.group
    const todaysDate = format(new Date(), 'yyyy-MM-dd')
    const fileName = todaysDate + '_' + groupName + '_' + childName
    const flatData = flattenObject(data)

    console.log('Data flattened:', flatData)
    const csv = convertToCSV([flatData])
    console.log('And converted to csv:', csv)
    return (
      <>
        <BreadcrumbNav urlList={[{ url: '/', label: 'RE-START' }, { label: 'Download' }]} />
        <div className={downloadStyles.content}>
          <Text>Please remember to download the data by clicking this link:</Text>
          <div className={downloadStyles.downloadLinkWrapper}>
            <a
              href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`}
              download={`${fileName}.csv`}
            >
              <Text size='XL' className={downloadStyles.downloadLink}>{`${fileName}.json`}</Text>
            </a>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <BreadcrumbNav urlList={[{ url: '/', label: 'RE-START' }, { label: 'Download' }]} />
        <p>retrieving data....</p>
      </>
    )
  }
}

export default DownloadSection
