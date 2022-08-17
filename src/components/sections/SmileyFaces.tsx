import React, { FormEvent, useEffect, useState } from 'react'

import Button from '../basics/Button/Button'
import BreadcrumbNav from '../basics/BreadcrumbNav/BreadcrumbNav'
import Text from '../basics/Text/Text'
import getClassNames from '../../utils/get-class-names'
import imageSources from './SmileyQuestionImageSequences'
import smileyFacesStyles from './SmileyFaces.module.css'

interface Props {
  setView(view: string): void
}

const SmileyFaces: React.FC<Props> = ({ setView }: Props) => {
  const [smileyQuestionResponses, setSmileyQuestionResponses] = useState({})
  const [chosenSmiley, setChosenSmiley] = useState('')
  const [questionNumber, setQuestionNumber] = useState(1)
  const [characterChoiceLast, setCharacterChoiceLast] = useState(false)
  const [pictureSequence, setPictureSequence] = useState(null)
  const [quizBeforeSmileyFaces, setQuizBeforeSmileyFaces] = useState(false)

  useEffect(() => {
    const detailsFormString = window.sessionStorage.getItem('detailsForm')
    const detailsForm = detailsFormString ? JSON.parse(detailsFormString) : null

    if (!detailsForm) {
      setView('landing')
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
    if (questionNumber === 8) {
      window.sessionStorage.setItem(
        'smileyQuestions',
        JSON.stringify({ ...smileyQuestionResponses, ...latestAnswer })
      )
      if (!quizBeforeSmileyFaces) {
        setView('quizQuestions')
      } else {
        if (characterChoiceLast) {
          setView('characterChoice')
        } else {
          setView('downloadForm')
        }
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setQuestionNumber(questionNumber + 1)
      setChosenSmiley('')
    }
  }
  if (!pictureSequence) return null

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
              alt={`background for question ${questionNumber}`}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              src={imageSources[pictureSequence][questionNumber].backgroundSrc}
            />
            <img
              className={smileyFacesStyles.personBackground}
              alt={`person for question ${questionNumber}`}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              src={imageSources[pictureSequence][questionNumber].avatarSrc}
            />
          </div>
          {smileyFaceImages.map((face) => {
            const buttonClassNames = getClassNames({
              defaultClasses: [smileyFacesStyles.buttonImage],
              conditionalClasses: {
                [`${smileyFacesStyles.buttonImageSelected}`]: chosenSmiley === face.name,
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
                  alt={`face of ${face.name}`}
                  className={smileyFacesStyles.smileyImage}
                  src={`/images/smileys/${face.name}.png`}
                />
              </button>
            )
          })}
        </>
        <div>
          <Button
            disabled={chosenSmiley === ''}
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