import React, { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { navigate } from 'gatsby'

import Button from '../../basics/Button/Button'
import GridRow from '../../basics/Grid/GridRow/GridRow'
import GridColumn from '../../basics/Grid/GridColumn/GridColumn'
import BreadcrumbNav from '../../basics/BreadcrumbNav/BreadcrumbNav'
import Text from '../../basics/Text/Text'
import { setDataToLocalStorage, getDataFromLocalStorage } from '../../../utils/use-local-storage'
import * as styles from './survey.module.css'
import getClassNames from '../../../utils/get-class-names'
import Image from '../../basics/Image/Image'

const Survey: React.FC = () => {
  const { control, handleSubmit, register, setValue } = useFormContext()
  const [previousFormData, setPreviousFormData] = useState<Record<string, any>>()
  const [surveyQuestionResponses, setSurveyQuestionResponses] = useState({})
  const [chosenChar, setChosenChar] = useState('')
  const [question1, setQuestion1] = useState('')
  const [surveyQuestionNumber, setSurveyQuestionNumber] = useState<1 | 2 | 3 | 4>(1)

  useEffect(() => {
    register('character')
    register('question1')
    register('question2')
    register('question3')
    register('question4')
    register('question5')
    register('question6')
    register('question7')
    register('question8')
  }, [register])

  useEffect(() => {
    const existingData = getDataFromLocalStorage('proj')
    setPreviousFormData(existingData)
  }, [])

  const handleMySubmit = async (formData: Record<string, any>): Promise<void> => {
    console.log('data this time:', formData)
    console.log('previous responses:', surveyQuestionResponses)
    setDataToLocalStorage(
      {
        survey: { ...surveyQuestionResponses, ...formData },
        details: previousFormData?.details,
      },
      'proj'
    )
    setSurveyQuestionResponses({ ...surveyQuestionResponses, ...formData })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setSurveyQuestionNumber(surveyQuestionNumber + 1)
    if (surveyQuestionNumber == 2) await navigate(`/proj3`)
  }

  const avatarImages = [
    { src: '../../../images/avatar/1.png', name: '1' },
    { src: '../../../images/avatar/2.png', name: '2' },
    { src: '../../../images/avatar/3.png', name: '3' },
    { src: '../../../images/avatar/4.png', name: '4' },
    { src: '../../../images/avatar/5.png', name: '5' },
    { src: '../../../images/avatar/6.png', name: '6' },
    { src: '../../../images/avatar/7.png', name: '7' },
  ]

  const smileyFaceImages = [
    { name: '5' },
    { name: '4' },
    { name: '3' },
    { name: '2' },
    { name: '1' },
  ]
  // const personImages = [
  //     { name: '1' },
  //     { name: '2' },
  //     { name: '3' },
  //     { name: '4' },
  //     { name: '5' },
  //     { name: '6' },
  //     { name: '7' },
  // ]
  const characterQuestion = (
    <form
      onSubmit={handleSubmit(({ character }) => {
        handleMySubmit({
          characterChoice: character,
        })
      })}
    >
      <Controller
        name='character'
        control={control}
        render={(): React.ReactElement => (
          <fieldset>
            <legend>Choose your character</legend>
            <>
              {avatarImages.map((character) => {
                const buttonClassNames = getClassNames({
                  defaultClasses: [styles.buttonImage],
                  conditionalClasses: {
                    [`${styles.buttonImageSelected}`]: chosenChar == character.name,
                  },
                })
                return (
                  <button
                    className={buttonClassNames}
                    type='button'
                    key={character.name}
                    onClick={(): void => {
                      console.log('Clicked with character:', character.name)
                      setValue('character', character.name)
                      setChosenChar(character.name)
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
        )}
      />
      <Button
        disabled={chosenChar == ''}
        type='submit'
        buttonText='Submit Chosen Character'
        fillSpace={false}
      />
      <p>Chosen character - {chosenChar}</p>
    </form>
  )

  const questionOne = (
    <form
      onSubmit={handleSubmit(({ question1 }) => {
        handleMySubmit({ question1 })
      })}
    >
      <Controller
        name='question1'
        control={control}
        render={(): React.ReactElement => (
          <fieldset>
            <legend>Question 1</legend>
            <>
              <Text size='XL' weight='Bold'>
                How likely is this person to be an Engineer?
              </Text>
              <Image
                className={styles.personSceneImage}
                alt={'Image of person 1'}
                src={`/images/questions/1.png`}
              />
              {smileyFaceImages.map((face) => {
                const buttonClassNames = getClassNames({
                  defaultClasses: [styles.buttonImage],
                  conditionalClasses: {
                    [`${styles.buttonImageSelected}`]: question1 == face.name,
                  },
                })
                return (
                  <button
                    className={buttonClassNames}
                    type='button'
                    key={'face-' + face.name}
                    onClick={(): void => {
                      console.log('Q1) Clicked with face:', face.name)
                      setValue('question1', face.name)
                      setQuestion1(face.name)
                    }}
                  >
                    <img className={styles.smileyImage} src={`/images/smileys/${face.name}.png`} />
                  </button>
                )
              })}
            </>
          </fieldset>
        )}
      />
      <Button
        disabled={question1 == ''}
        type='submit'
        buttonText='Submit Choice'
        fillSpace={false}
      />
      <p>Choice - {question1}</p>
    </form>
  )

  const questionTwo = <p>question2</p>
  const questionThree = <p>question3</p>
  const surveyQuestions = {
    1: characterQuestion,
    2: questionOne,
    3: questionTwo,
    4: questionThree,
  }
  // if ()
  return (
    <>
      <BreadcrumbNav urlList={[{ url: '/', label: 're-start' }, { label: 'survey questions' }]} />
      <GridRow isPadded>
        <GridColumn isPadded>{surveyQuestions[surveyQuestionNumber]}</GridColumn>
      </GridRow>
    </>
  )
}

export default Survey
