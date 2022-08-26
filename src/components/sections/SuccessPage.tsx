import React from 'react'
import { format } from 'date-fns'

import { getDataFromLocalStorage, setDataToLocalStorage } from '../../utils/use-local-storage'
import BreadcrumbNav from '../basics/BreadcrumbNav/BreadcrumbNav'
import Heading from '../basics/Heading/Heading'
import Text from '../basics/Text/Text'
import { VIEWS } from '../../App'
import './SuccessPage.css'

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

  if (newSurvey) {
    const latestChildData = {
      dateCollected: format(new Date(), 'yyyy-MM-dd'),
      ...details,
      character: character.character,
      smileyQuestions,
      quizQuestions,
    }
    const latestChildName = latestChildData.name
    const latestGroupName = latestChildData.group

    // Retrieve other surveys from this group
    const existingGroupData = allGroupsData[latestGroupName]

    // Add latest survey to the current group (if any others exist)
    const latestGroupUpdatedData = { ...existingGroupData, [latestChildName]: latestChildData }

    // STORE with other surveys under the group name in local storage.
    setDataToLocalStorage(
      { ...allGroupsData, [latestGroupName]: latestGroupUpdatedData },
      'allGroups'
    )

    return (
      <>
        <BreadcrumbNav urlList={[{ url: '.', label: 'RE-START' }, { label: 'Success Page' }]} />
        <Heading level='2'>Survey Completed!</Heading>
        <iframe
          title='Dancing Lemon'
          src='https://giphy.com/embed/d2L6QAODBKlAVdqz95'
          width='200'
          height='200'
          frameBorder='0'
          className='giphy-embed'
          allowFullScreen
        ></iframe>
        <div className='success_page-content'>
          <Text size='M'>{`Successfully completed quiz for `}</Text>
          <Text size='L' weight='Bold'>
            &quot;{latestChildName}&quot;
          </Text>
          <br />
          <br />
          <Text size='M'>{`Data stored under group `}</Text>
          <Text size='L' weight='Bold'>
            &quot;{latestGroupName}&quot;
          </Text>
          <br />
          <br />
          <br />
          <p>Note: Use button at bottom of start page to download data when ready :-)</p>
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
