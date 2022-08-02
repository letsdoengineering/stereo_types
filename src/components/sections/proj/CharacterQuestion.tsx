import React, { useState } from 'react'
import { navigate } from 'gatsby'

import Button from '../../basics/Button/Button'
import BreadcrumbNav from '../../basics/BreadcrumbNav/BreadcrumbNav'
import getClassNames from '../../../utils/get-class-names'
import * as characterQuestionsStyles from './CharacterQuestion.module.css'

const CharacterQuestion: React.FC = () => {
  const [chosenCharacter, setChosenCharacter] = useState('')

  const avatarImages = [
    { src: '../../../images/avatar/white_female_disabled.png', name: '1' },
    { src: '../../../images/avatar/white_male_disabled.png', name: '2' },
    { src: '../../../images/avatar/black_female.png', name: '3' },
    { src: '../../../images/avatar/black_male.png', name: '4' },
    { src: '../../../images/avatar/asian_female.png', name: '5' },
    { src: '../../../images/avatar/asian_male.png', name: '6' },
    { src: '../../../images/avatar/white_female.png', name: '7' },
    { src: '../../../images/avatar/white_male.png', name: '8' },
  ]

  return (
    <>
      <BreadcrumbNav urlList={[{ url: '/', label: 're-start' }, { label: 'Character question' }]} />
      <div>
        <form
          onSubmit={async (formData): Promise<void> => {
            console.log('Submitted:', formData)
            window.sessionStorage.setItem('character', chosenCharacter)
            await navigate(`/download`)
          }}
        >
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
          <p>Chosen character - {chosenCharacter}</p>
        </form>
      </div>
    </>
  )
}

export default CharacterQuestion
