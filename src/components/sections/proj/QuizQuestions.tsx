import React, { FormEvent, useEffect, useState } from 'react'
import { navigate } from 'gatsby'

import getClassNames from '../../../utils/get-class-names'
import Button from '../../basics/Button/Button'
import Text from '../../basics/Text/Text'
import BreadcrumbNav from '../../basics/BreadcrumbNav/BreadcrumbNav'

import * as quizQuestionsStyles from './QuizQuestions.module.css'

const defaultCharacterButtons = {
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false,
}

const questions = {
  1: 'Who do you feel would... leave lego on the floor at bed time?',
  2: 'Who do you feel would... share their sweeties?',
  3: 'Who do you feel would... help a granny across the road?',
  4: 'Who do you feel would... pretend the smell was not their fart?',
  5: 'Who do you feel would... eat all the cake without sharing?',
  6: 'Who do you feel would... be able to make a paper plane?',
  7: 'Who do you feel would... eat marmite?',
  8: 'Who do you feel would... snore in their sleep?',
}
const QuizQuestions: React.FC = () => {
  const [quizQuestionResponses, setQuizQuestionResponses] = useState({})
  const [chosenCharacters, setChosenCharacters] = useState(defaultCharacterButtons)
  const [questionNumber, setQuestionNumber] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>(1)
  const [characterChoiceLast, setCharacterChoiceLast] = useState(false)
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
      if (detailsForm.quizBeforeSmileyFaces) {
        setQuizBeforeSmileyFaces(detailsForm.quizBeforeSmileyFaces)
      }
    }
  }, [])

  const avatarImages = [
    { src: '../../../images/avatar/white_female_disabled.png', name: 'white_female_disabled' },
    { src: '../../../images/avatar/white_male_disabled.png', name: 'white_male_disabled' },
    { src: '../../../images/avatar/black_female.png', name: 'black_female' },
    { src: '../../../images/avatar/black_male.png', name: 'black_male' },
    { src: '../../../images/avatar/asian_female.png', name: 'asian_female' },
    { src: '../../../images/avatar/asian_male.png', name: 'asian_male' },
    { src: '../../../images/avatar/white_female.png', name: 'white_female' },
    { src: '../../../images/avatar/white_male.png', name: 'white_male' },
  ]

  const handleFormSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    const latestAnswer = {
      [questionNumber]: chosenCharacters,
    }
    setQuizQuestionResponses({ ...quizQuestionResponses, ...latestAnswer })
    setChosenCharacters(defaultCharacterButtons)
    if (questionNumber == 1) {
      window.sessionStorage.setItem(
        'quizQuestions',
        JSON.stringify({ ...quizQuestionResponses, ...latestAnswer })
      )
      if (quizBeforeSmileyFaces) {
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
    }
  }

  const quizQuestion = (questionNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8): JSX.Element => (
    <form onSubmit={handleFormSubmit}>
      <fieldset>
        <legend>Quiz Question {questionNumber}</legend>
        <p>
          <Text size='L'>{questions[questionNumber]}</Text>
        </p>
        <>
          {avatarImages.map((character, index) => {
            const buttonClassNames = getClassNames({
              defaultClasses: [quizQuestionsStyles.buttonImage],
              conditionalClasses: {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                [`${quizQuestionsStyles.buttonImageSelected}`]: chosenCharacters[`${index + 1}`],
              },
            })
            return (
              <button
                className={buttonClassNames}
                type='button'
                key={character.name}
                onClick={(): void => {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  const previous = chosenCharacters[`${index + 1}`]
                  setChosenCharacters({ ...chosenCharacters, [`${index + 1}`]: !previous })
                }}
              >
                <img
                  className={quizQuestionsStyles.avatarImage}
                  src={`/images/avatar/${character.name}.png`}
                />
              </button>
            )
          })}
        </>
      </fieldset>
      <Button
        type='submit'
        buttonText={`Submit Question ${questionNumber} answer`}
        fillSpace={false}
      />
      <p>Chosen Characters - {JSON.stringify(chosenCharacters)}</p>
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
