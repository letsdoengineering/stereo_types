import React, { FormEvent, useEffect, useState } from 'react'
import { navigate } from 'gatsby'

import Button from '../../basics/Button/Button'
import BreadcrumbNav from '../../basics/BreadcrumbNav/BreadcrumbNav'
import getClassNames from '../../../utils/get-class-names'
import * as characterQuestionsStyles from './CharacterQuestion.module.css'

const CharacterQuestion: React.FC = () => {
  const [chosenCharacter, setChosenCharacter] = useState('')
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
    window.sessionStorage.setItem('character', chosenCharacter)
    if (characterChoiceLast) {
      await navigate(`/download`)
    } else {
      if (quizBeforeSmileyFaces) {
        await navigate('/quiz')
      } else {
        await navigate('/smiley-faces')
      }
    }
  }

  return (
    <>
      <BreadcrumbNav urlList={[{ url: '/', label: 're-start' }, { label: 'Character question' }]} />
      <form onSubmit={handleFormSubmit}>
        <fieldset>
          <legend>Choose your character</legend>
          <>
            {avatarImages.map((character) => {
              const buttonClassNames = getClassNames({
                defaultClasses: [characterQuestionsStyles.buttonImage],
                conditionalClasses: {
                  [`${characterQuestionsStyles.buttonImageSelected}`]:
                    chosenCharacter == character.name,
                },
              })
              return (
                <button
                  className={buttonClassNames}
                  type='button'
                  key={character.name}
                  onClick={(): void => {
                    console.log('Clicked with character:', character.name)
                    setChosenCharacter(character.name)
                  }}
                >
                  <img
                    className={characterQuestionsStyles.avatarImage}
                    src={`/images/avatar/${character.name}.png`}
                  />
                </button>
              )
            })}
          </>
        </fieldset>
        <Button
          disabled={chosenCharacter == ''}
          type='submit'
          buttonText='Submit Chosen Character'
          fillSpace={false}
        />
        <p>Chosen character - {chosenCharacter}</p> {/* TODO: REMOVE THIS */}
      </form>
    </>
  )
}

export default CharacterQuestion
