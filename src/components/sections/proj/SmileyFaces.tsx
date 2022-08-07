import React, { FormEvent, useEffect, useState } from 'react'
import { navigate } from 'gatsby'

import Button from '../../basics/Button/Button'
import BreadcrumbNav from '../../basics/BreadcrumbNav/BreadcrumbNav'
import Text from '../../basics/Text/Text'
import getClassNames from '../../../utils/get-class-names'
import * as smileyFacesStyles from './SmileyFaces.module.css'

const SmileyFaces: React.FC = () => {
  const [smileyQuestionResponses, setSmileyQuestionResponses] = useState({})
  const [chosenSmiley, setChosenSmiley] = useState('')
  const [questionNumber, setQuestionNumber] = useState(1)
  const [characterChoiceLast, setCharacterChoiceLast] = useState(false)
  const [pictureSequence, setPictureSequence] = useState('')
  const [quizBeforeSmileyFaces, setQuizBeforeSmileyFaces] = useState(false)

  useEffect(() => {
    const detailsFormString = window.sessionStorage.getItem('detailsForm')
    const detailsForm = detailsFormString ? JSON.parse(detailsFormString) : null

    if (!detailsForm) {
      navigate('/').then()
    } else {
      if (detailsForm.characterChoiceLast) {
        setCharacterChoiceLast(detailsForm.characterChoiceLast)
      }
      if (detailsForm.pictureSequence) {
        setPictureSequence(detailsForm.pictureSequence)
      }
      if (detailsForm.quizBeforeSmileyFaces) {
        setQuizBeforeSmileyFaces(detailsForm.quizBeforeSmileyFaces)
      }
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
    setSmileyQuestionResponses({ ...smileyQuestionResponses, ...latestAnswer })
    if (questionNumber == 1) {
      window.sessionStorage.setItem(
        'smileyQuestions',
        JSON.stringify({ ...smileyQuestionResponses, ...latestAnswer })
      )
      if (!quizBeforeSmileyFaces) {
        await navigate('/quiz')
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

  const imageSources = {
    1: {
      backgroundSrc: '../../../images/avatar-backgrounds/civil.png',
      avatarSrc: '../../../images/avatar/white_female_disabled.png',
      name: 'wfd_civil',
    },
    2: {
      background: '../../../images/avatar-backgrounds/civil.png',
      avatar: '../../../images/avatar/asian_female.png',
      name: 'aw-civil',
    },
    // 3: { background:  '../../../images/avatar-backgrounds/civil.png', avatar: '../../../images/avatar/asian_female.png', name: 'aw-civil'  },
    // 4: { background: '', avatar: '' },
    // 5: { background: '', avatar: '' },
    // 6: { background: '', avatar: '' },
    // 7: { background: '', avatar: '' },
    // 8: { background: '', avatar: '' },
    // 9: { background: '', avatar: '' },
    // 10: { background: '', avatar: '' },
    // 11: { background: '', avatar: '' },
    // 12: { background: '', avatar: '' },
    // 13: { background: '', avatar: '' },
    // 14: { background: '', avatar: '' },
    // 15: { background: '', avatar: '' },
    // 16: { background: '', avatar: '' },
    // 17: { background: '', avatar: '' },
    // 18: { background: '', avatar: '' },
    // 19: { background: '', avatar: '' },
    // 20: { background: '', avatar: '' },
    // 21: { background: '', avatar: '' },
    // 22: { background: '', avatar: '' },
    // 23: { background: '', avatar: '' },
    // 24: { background: '', avatar: '' },
    // 25: { background: '', avatar: '' },
    // 26: { background: '', avatar: '' },
    // 27: { background: '', avatar: '' },
    // 28: { background: '', avatar: '' },
    // 29: { background: '', avatar: '' },
    // 30: { background: '', avatar: '' },
    // 31: { background: '', avatar: '' },
    // 32: { background: '', avatar: '' },
    // 33: { background: '', avatar: '' },
    // 34: { background: '', avatar: '' },
  }

  const smileyQuestion = (questionNumber: number): JSX.Element => (
    <form onSubmit={handleFormSubmit}>
      <fieldset>
        <legend>
          Question {questionNumber} (sequence {pictureSequence})
        </legend>
        <>
          <Text size='XL' weight='Bold'>
            How likely is this person to be an Engineer?
          </Text>
          <div className={smileyFacesStyles.imageWrapper}>
            <img
              className={smileyFacesStyles.personImage}
              alt={`Image of background ${questionNumber}`}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              src={imageSources[questionNumber].backgroundSrc}
            />
            <img
              className={smileyFacesStyles.personBackground}
              alt={'Image of person  ${questionNumber}'}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              src={imageSources[questionNumber].avatarSrc}
            />
          </div>
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
        <div>
          <Button
            disabled={chosenSmiley == ''}
            type='submit'
            buttonText='Submit Choice'
            fillSpace={false}
          />
        </div>
      </fieldset>
      {/*<p>Choice - {chosenSmiley}</p>*/}
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
