import React, { useState } from 'react'
import { navigate } from 'gatsby'

import Button from '../../basics/Button/Button'
import BreadcrumbNav from '../../basics/BreadcrumbNav/BreadcrumbNav'
import getClassNames from '../../../utils/get-class-names'
import * as styles from './survey.module.css'

const CharacterQuestion: React.FC = () => {
  const [chosenCharacter, setChosenCharacter] = useState('')

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
                  defaultClasses: [styles.buttonImage],
                  conditionalClasses: {
                    [`${styles.buttonImageSelected}`]: chosenCharacter == character.name,
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
                      className={styles.avatarImage}
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
