import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { navigate } from 'gatsby'

import Button from '../../basics/Button/Button'
import Checkbox from '../../basics/INPUTS/Checkbox/Checkbox'
import GridRow from '../../basics/Grid/GridRow/GridRow'
import GridColumn from '../../basics/Grid/GridColumn/GridColumn'
import Spacing from '../../basics/Spacing/Spacing'
import Heading from '../../basics/Heading/Heading'
import Radio from '../../basics/INPUTS/Radio/Radio'
import { getDataFromLocalStorage, setDataToLocalStorage } from '../../../utils/use-local-storage'
import * as styles from './landingForm.module.css'
import FieldError from '../../blocks/FieldError/FieldError'

const LandingForm: React.FC = () => {
  const {
    getValues,
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm()
  const [gender, setGender] = useState('F')
  const [quizSectionOrder, setQuizSectionOrder] = useState('A')
  // let genderInputFns: Record<string, any>
  // let handleGenderChange: any
  useEffect(() => {
    const previouslySetGroup = getDataFromLocalStorage('keepOnce') // fetch previously submitted group value
    console.log('previously set group value', previouslySetGroup.group)
    if (previouslySetGroup.group) {
      console.log('setting group to:', previouslySetGroup)
      setValue('group', previouslySetGroup.group)
    } // if a group value exists set to form value for group
    setDataToLocalStorage({}, 'keepOnce') // clear out group value after fetching it.
    setDataToLocalStorage({}, 'proj') // clear out any previous local storage under 'proj'
    // genderInputFns = register('genderInput')
    // handleGenderChange = genderInputFns?.onChange
    // register('quizSectionOrderInput')
  }, [])

  return (
    <form
      onSubmit={handleSubmit(
        async ({
          ageInput,
          groupInput,
          nameInput,
          pictureSequenceInput,
          characterFirstInput,
          genderInput,
          quizSectionOrderInput,
        }) => {
          const formData = {
            age: ageInput,
            group: groupInput,
            name: nameInput,
            pictureSequence: pictureSequenceInput,
            characterFirst: characterFirstInput,
            gender: genderInput,
            quizSectionOrder: quizSectionOrderInput,
          }
          console.log('my submit:', formData)
          // await navigate(`/proj2`)
        }
      )}
    >
      <GridRow isPadded className={styles.detailsForm}>
        <GridColumn className={styles.detailsFormColumn} isPadded>
          <Heading level='2'>Child Details</Heading>
          <FieldError errorMessage={'Error, please enter a group'} showError={errors.groupInput}>
            <label>
              Group:
              <input
                autoComplete={'off'}
                type='text'
                {...register('groupInput', { required: true })}
              />
            </label>
          </FieldError>
          <FieldError errorMessage={'Error, please enter a name'} showError={errors.nameInput}>
            <label>
              Name:
              <input type='text' {...register('nameInput', { required: true })} name='nameInput' />
            </label>
          </FieldError>
          <FieldError errorMessage={'Error, please enter an age'} showError={errors.ageInput}>
            <label>
              Age:
              <input type='text' {...register('ageInput', { required: true })} />
            </label>
          </FieldError>
          <label>Gender:</label>
          <fieldset>
            <Radio
              onChange={(): void => {
                setGender('F')
                // setValue('genderInput', 'F')
                // handleGenderChange(e.target.value)
              }}
              isChecked={gender === 'F'}
              // isChecked={getValues('genderInput') === 'F'}
              label='Female'
              value='F'
            />
            <Radio
              onChange={(): void => {
                setGender('M')
                // setValue('genderInput', 'M')
                // handleGenderChange(e.target.value)
              }}
              isChecked={gender === 'M'}
              // isChecked={getValues('genderInput') === 'M'}
              label='Male'
              value='M'
            />
          </fieldset>
          <Checkbox
            id='character-first-input'
            name='characterFirstInput'
            isChecked={getValues('characterFirst')}
            value={getValues('characterFirstInput')}
            text='Display character choice last?'
            onChange={(): void => {
              setValue('characterFirstInput', !getValues('characterFirst'))
            }}
          />
          <label>
            SmileyFace Picture sequence:
            <select {...register('pictureSequence')}>
              {[
                { label: '-- please choose one -- ', value: 'invalid' },
                { label: 'Sequence 1', value: '1' },
                { label: 'Sequence 2', value: '2' },
                { label: 'Sequence 3', value: '3' },
                { label: 'Sequence 4', value: '4' },
              ].map((item) => {
                return (
                  <option key={`${item.value}-${item.label}`} value={item.value}>
                    {item.label}
                  </option>
                )
              })}
            </select>
          </label>
          <label>Quiz Section Order:</label>
          <fieldset>
            <Radio
              onChange={(): void => {
                setQuizSectionOrder('A')
              }}
              isChecked={quizSectionOrder === 'A'}
              label='A'
              value='A'
            />
            <Radio
              onChange={(): void => {
                setQuizSectionOrder('B')
              }}
              isChecked={quizSectionOrder === 'B'}
              label='B'
              value='B'
            />
          </fieldset>
          <Spacing />
          <Button size='M' type='submit' buttonText='Submit' />
        </GridColumn>
      </GridRow>
    </form>
  )
}

export default LandingForm
