import React from 'react'
import { format } from 'date-fns'

import Text from '../../basics/Text/Text'
import BreadcrumbNav from '../../basics/BreadcrumbNav/BreadcrumbNav'
import { navigate } from 'gatsby'

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
    return (
      <>
        <BreadcrumbNav urlList={[{ url: '/', label: 'RE-START' }, { label: 'Download' }]} />
        <p>
          <a
            href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`}
            download={`${fileName}.csv`}
          >
            <Text size='XL'>{`DOWNLOAD data: "${fileName}.json"`}</Text>
          </a>
        </p>
        <p>{JSON.stringify(data)}</p>
      </>
    )
  }
  return (
    <>
      <BreadcrumbNav urlList={[{ url: '/', label: 'RE-START' }, { label: 'Download' }]} />
      <p>retrieving data....</p>
    </>
  )
}

export default DownloadSection
