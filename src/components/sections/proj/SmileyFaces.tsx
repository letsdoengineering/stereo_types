import React, { FormEvent, useEffect, useState } from 'react'
import { navigate } from 'gatsby'

import Button from '../../basics/Button/Button'
import BreadcrumbNav from '../../basics/BreadcrumbNav/BreadcrumbNav'
import Image from '../../basics/Image/Image'
import Text from '../../basics/Text/Text'
import getClassNames from '../../../utils/get-class-names'
import * as smileyFacesStyles from './SmileyFaces.module.css'

const SmileyFaces: React.FC = () => {
  const [smileyQuestionResponses, setSmileyQuestionResponses] = useState({})
  const [chosenSmiley, setChosenSmiley] = useState('')
  const [questionNumber, setQuestionNumber] = useState(1)
  const [characterChoiceLast, setCharacterChoiceLast] = useState(false)
  const [quizBeforeSmileyFaces, setQuizBeforeSmileyFaces] = useState(false)

  useEffect(() => {
    const detailsFormString = window.sessionStorage.getItem('detailsForm')
    const detailsForm = detailsFormString ? JSON.parse(detailsFormString) : null
    if (detailsForm?.characterChoiceLast) {
      setCharacterChoiceLast(detailsForm.characterChoiceLast)
    }
    if (detailsForm?.quizBeforeSmileyFaces) {
      setQuizBeforeSmileyFaces(detailsForm.quizBeforeSmileyFaces)
    }
  }, [])

  const smileyFaceImages = [
    { name: '5' },
    { name: '4' },
    { name: '3' },
    { name: '2' },
    { name: '1' },
  ]
  const handleFormSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    const latestAnswer = {
      [questionNumber]: chosenSmiley,
    }
    console.log('Submitted Response:', latestAnswer)
    console.log('Full smiley questions so far:', { ...smileyQuestionResponses, ...latestAnswer })
    setSmileyQuestionResponses({ ...smileyQuestionResponses, ...latestAnswer })
    if (questionNumber == 8) {
      window.sessionStorage.setItem(
        'quizQuestions',
        JSON.stringify({ ...smileyQuestionResponses, ...latestAnswer })
      )
      if (!quizBeforeSmileyFaces) {
        await navigate('/smiley-faces')
      } else {
        if (characterChoiceLast) {
          await navigate(`/character`)
        } else {
          await navigate(`/download`)
        }
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setQuestionNumber(questionNumber + 1)
      setChosenSmiley('')
    }
  }

  const smileyQuestion = (questionNumber: number): JSX.Element => (
    <form onSubmit={handleFormSubmit}>
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
                  console.log('Question', questionNumber, ', current selection:', face.name)
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
