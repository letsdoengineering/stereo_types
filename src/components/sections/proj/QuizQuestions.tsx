import React, { useState } from 'react'
import { navigate } from 'gatsby'

import getClassNames from '../../../utils/get-class-names'
import Button from '../../basics/Button/Button'
import BreadcrumbNav from '../../basics/BreadcrumbNav/BreadcrumbNav'

import * as styles from './survey.module.css'

const QuizQuestions: React.FC = () => {
  const [surveyQuestionResponses, setSurveyQuestionResponses] = useState({})
  const [chosenCharacters, setChosenCharacters] = useState('')
  const [questionNumber, setQuestionNumber] = useState(1)

  const avatarImages = [
    { src: '../../../images/avatar/1.png', name: '1' },
    { src: '../../../images/avatar/2.png', name: '2' },
    { src: '../../../images/avatar/3.png', name: '3' },
    { src: '../../../images/avatar/4.png', name: '4' },
    { src: '../../../images/avatar/5.png', name: '5' },
    { src: '../../../images/avatar/6.png', name: '6' },
    { src: '../../../images/avatar/7.png', name: '7' },
    { src: '../../../images/avatar/8.png', name: '8' },
  ]

  const quizQuestion = (questionNumber: number): JSX.Element => (
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
        <legend className='visually-hidden'>
          Choose some characters (question - {questionNumber})
        </legend>
        <>
          {avatarImages.map((character) => {
            const buttonClassNames = getClassNames({
              defaultClasses: [styles.buttonImage],
              conditionalClasses: {
                [`${styles.buttonImageSelected}`]: chosenCharacters == character.name,
              },
            })
            return (
              <button
                className={buttonClassNames}
                type='button'
                key={character.name}
                onClick={(): void => {
                  console.log('Clicked with character:', character.name)
                  setChosenCharacters(character.name)
                }}
              >
                <img className={styles.avatarImage} src={`/images/avatar/${character.name}.png`} />
              </button>
            )
          })}
        </>
      </fieldset>
      <Button
        disabled={chosenCharacters == ''}
        type='submit'
        buttonText='Submit Chosen Character'
        fillSpace={false}
      />
      <p>Chosen characters - {chosenCharacters}</p>
    </form>
  )

  return (
    <>
      <BreadcrumbNav urlList={[{ url: '/', label: 're-start' }, { label: 'Quiz questions' }]} />
      {quizQuestion(questionNumber)}
    </>
  )
}

export default QuizQuestions
