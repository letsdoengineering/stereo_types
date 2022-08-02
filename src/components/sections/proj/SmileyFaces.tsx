import React, { useState } from 'react'
import { navigate } from 'gatsby'

import Button from '../../basics/Button/Button'
import BreadcrumbNav from '../../basics/BreadcrumbNav/BreadcrumbNav'
import Image from '../../basics/Image/Image'
import Text from '../../basics/Text/Text'
import getClassNames from '../../../utils/get-class-names'
import * as smileyFacesStyles from './SmileyFaces.module.css'

const SmileyFaces: React.FC = () => {
  const [surveyQuestionResponses, setSurveyQuestionResponses] = useState({})
  const [chosenSmiley, setChosenSmiley] = useState('')
  const [questionNumber, setQuestionNumber] = useState(1)

  const smileyFaceImages = [
    { name: '5' },
    { name: '4' },
    { name: '3' },
    { name: '2' },
    { name: '1' },
  ]

  const smileyQuestion = (questionNumber: number): JSX.Element => (
    <form
      onSubmit={async (formData): Promise<void> => {
        console.log('submitted:', formData)
        console.log('previous responses:', surveyQuestionResponses)
        setSurveyQuestionResponses({ ...surveyQuestionResponses, ...formData })
        setQuestionNumber(questionNumber + 1)
        if (questionNumber == 3) {
          window.sessionStorage.setItem('quizQuestions', JSON.stringify(surveyQuestionResponses))
          await navigate(`/download`)
        }
      }}
    >
      <fieldset>
        <legend>Question {questionNumber}</legend>
        <>
          <Text size='XL' weight='Bold'>
            How likely is this person to be an Engineer?
          </Text>
          <Image
            className={smileyFacesStyles.personSceneImage}
            alt={'Image of person 1'}
            src={`/images/questions/1.png`}
          />
          {smileyFaceImages.map((face) => {
            const buttonClassNames = getClassNames({
              defaultClasses: [smileyFacesStyles.buttonImage],
              conditionalClasses: {
                [`${smileyFacesStyles.buttonImageSelected}`]: chosenSmiley == face.name,
              },
            })
            return (
              <button
                className={buttonClassNames}
                type='button'
                key={'face-' + face.name}
                onClick={(): void => {
                  console.log('Q1) Clicked with face:', face.name)
                  setChosenSmiley(face.name)
                }}
              >
                <img
                  className={smileyFacesStyles.smileyImage}
                  src={`/images/smileys/${face.name}.png`}
                />
              </button>
            )
          })}
        </>
      </fieldset>
      <Button
        disabled={chosenSmiley == ''}
        type='submit'
        buttonText='Submit Choice'
        fillSpace={false}
      />
      <p>Choice - {chosenSmiley}</p>
    </form>
  )

  return (
    <>
      <BreadcrumbNav
        urlList={[{ url: '/', label: 're-start' }, { label: 'SmileyFace questions' }]}
      />
      {smileyQuestion(questionNumber)}
    </>
  )
}

export default SmileyFaces
