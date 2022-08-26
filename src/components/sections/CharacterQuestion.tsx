import React, { FormEvent, useEffect, useState } from 'react'

import Button from '../basics/Button/Button'
import BreadcrumbNav from '../basics/BreadcrumbNav/BreadcrumbNav'
import getClassNames from '../../utils/get-class-names'
import { VIEWS } from '../../App'
import './CharacterQuestion.css'

interface Props {
  setView(view: string): void
}

const CharacterQuestion: React.FC<Props> = ({ setView }: Props) => {
  const [chosenCharacter, setChosenCharacter] = useState('')
  const [characterChoiceFirst, setCharacterChoiceFirst] = useState(false)
  const [quizBeforeSmileyFaces, setQuizBeforeSmileyFaces] = useState(false)

  useEffect(() => {
    const detailsFormString = window.sessionStorage.getItem('detailsForm')
    const detailsForm = detailsFormString ? JSON.parse(detailsFormString) : null

    if (!detailsForm) {
      setView(VIEWS.LANDING)
    } else {
      if (detailsForm.characterChoiceFirst) {
        setCharacterChoiceFirst(detailsForm.characterChoiceFirst)
      }
      if (detailsForm.quizBeforeSmileyFaces) {
        setQuizBeforeSmileyFaces(detailsForm.quizBeforeSmileyFaces)
      }
    }
  }, [setView])

  const avatarImages = [
    { src: './images/avatar/white_female_disabled.png', name: 'white_female_disabled' },
    { src: './images/avatar/white_male_disabled.png', name: 'white_male_disabled' },
    { src: './images/avatar/black_female.png', name: 'black_female' },
    { src: './images/avatar/black_male.png', name: 'black_male' },
    { src: './images/avatar/asian_female.png', name: 'asian_female' },
    { src: './images/avatar/asian_male.png', name: 'asian_male' },
    { src: './images/avatar/white_female.png', name: 'white_female' },
    { src: './images/avatar/white_male.png', name: 'white_male' },
  ]

  const handleFormSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    window.sessionStorage.setItem('character', JSON.stringify({ character: chosenCharacter }))
    if (!characterChoiceFirst) {
      setView(VIEWS.SUCCESS)
    } else {
      if (quizBeforeSmileyFaces) {
        setView(VIEWS.QUIZ)
      } else {
        setView(VIEWS.SMILEY)
      }
    }
  }

  return (
    <>
      <BreadcrumbNav urlList={[{ url: '.', label: 'RE-START' }, { label: 'Character question' }]} />
      <form onSubmit={handleFormSubmit}>
        <fieldset>
          <legend>Choose your character</legend>
          <>
            {avatarImages.map((character) => {
              const buttonClassNames = getClassNames({
                defaultClasses: ['character_button-image'],
                conditionalClasses: {
                  'character_button-image-selected': chosenCharacter === character.name,
                },
              })
              return (
                <button
                  className={buttonClassNames}
                  type='button'
                  key={character.name}
                  onClick={(): void => {
                    setChosenCharacter(character.name)
                  }}
                >
                  <img
                    alt={`character ${character.name}`}
                    className='character_avatar-image'
                    src={`./images/avatar/${character.name}.png`}
                  />
                </button>
              )
            })}
          </>
          <div>
            <Button
              disabled={chosenCharacter === ''}
              type='submit'
              buttonText='Submit Chosen Character'
              fillSpace={false}
            />
          </div>
        </fieldset>
      </form>
    </>
  )
}

export default CharacterQuestion
