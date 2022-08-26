import React from 'react'

import BreadcrumbNav from '../basics/BreadcrumbNav/BreadcrumbNav'
import Text from '../basics/Text/Text'
import { VIEWS } from '../../App'
import './Download.css'
import { getDataFromLocalStorage, setDataToLocalStorage } from '../../utils/use-local-storage'

const SuccessPage: React.FC = (): JSX.Element => {
  // if (typeof window === 'undefined') return null
  // COLLECT ALL THE FORMS OF DATA FROM JUST FINISHED SURVEY
  const detailsFormString = window.sessionStorage.getItem('detailsForm')
  const quizQuestionsString = window.sessionStorage.getItem(VIEWS.QUIZ)
  const smileyQuestionsString = window.sessionStorage.getItem(VIEWS.SMILEY)
  const characterString = window.sessionStorage.getItem('character')
  const details = detailsFormString ? JSON.parse(detailsFormString) : null
  const character = characterString ? JSON.parse(characterString) : null
  const smileyQuestions = smileyQuestionsString ? JSON.parse(smileyQuestionsString) : null
  const quizQuestions = quizQuestionsString ? JSON.parse(quizQuestionsString) : null
  const newSurvey = details && character && smileyQuestions && quizQuestions

  // PULL OUT ALL STORED SURVEYS
  const allGroupsData = getDataFromLocalStorage('allGroups')
  console.log('allGroupsData:', allGroupsData)

  if (newSurvey) {
    const latestChildData = { details, character, smileyQuestions, quizQuestions }
    const latestChildName = latestChildData.details.name
    const latestGroupName = latestChildData.details.group

    // Retrieve other surveys from this group
    const existingGroupData = allGroupsData.latestGroupName
    const latestGroupFullData = { ...existingGroupData, latestChildName: latestChildData }
    console.log('adding latest survey:', { [latestGroupName]: latestGroupFullData })

    // STORE with other surveys under the group name in local storage.
    setDataToLocalStorage({ [latestGroupName]: latestGroupFullData }, 'allGroups')

    return (
      <>
        <BreadcrumbNav urlList={[{ url: '.', label: 'RE-START' }, { label: 'Success Page' }]} />
        <div className='download_content'>
          <Text>{`Successfully completed quiz for ${latestChildName}`}</Text>
          <Text>{`Data stored under group: ${latestGroupName}`}</Text>
        </div>
      </>
    )
  } else {
    return (
      <>
        <BreadcrumbNav
          urlList={[{ url: '.', label: 'RE-START' }, { label: 'Success(ish) Page' }]}
        />
        <div className='download_content'>
          <Text>Processing data.... or maybe somethings gone wrong if this does not go away</Text>
        </div>
      </>
    )
  }
}

export default SuccessPage
