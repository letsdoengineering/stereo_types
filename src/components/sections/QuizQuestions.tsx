import React, { FormEvent, useEffect, useState } from 'react'

import getClassNames from '../../utils/get-class-names'
import Button from '../basics/Button/Button'
import BreadcrumbNav from '../basics/BreadcrumbNav/BreadcrumbNav'

import quizQuestionsStyles from './QuizQuestions.module.css'

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

interface Props {
  setView(view: string): void
}

const QuizQuestions: React.FC<Props> = ({ setView }: Props) => {
  const [quizQuestionResponses, setQuizQuestionResponses] = useState({})
  const [chosenCharacters, setChosenCharacters] = useState(defaultCharacterButtons)
  const [questionNumber, setQuestionNumber] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>(1)
  const [characterChoiceLast, setCharacterChoiceLast] = useState(false)
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
    if (questionNumber === 8) {
      window.sessionStorage.setItem(
        'quizQuestions',
        JSON.stringify({ ...quizQuestionResponses, ...latestAnswer })
      )
      if (quizBeforeSmileyFaces) {
        setView('smileyQuestions')
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
    }
  }

  const quizQuestion = (questionNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8): JSX.Element => (
    <form onSubmit={handleFormSubmit}>
      <fieldset>
        <legend>Quiz Question {questionNumber}</legend>
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
                  alt={`character ${character.name}`}
                  className={quizQuestionsStyles.avatarImage}
                  src={`/images/avatar/${character.name}.png`}
                />
              </button>
            )
          })}
        </>
        <div>
          <Button
            type='submit'
            buttonText={`Submit Question ${questionNumber} answer`}
            fillSpace={false}
          />
        </div>
      </fieldset>
      {/*<p>Chosen Characters - {JSON.stringify(chosenCharacters)}</p>*/}
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
