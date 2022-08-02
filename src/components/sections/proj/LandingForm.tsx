import React, { FormEvent, useEffect, useState } from 'react'
import { navigate } from 'gatsby'

import Button from '../../basics/Button/Button'
import Checkbox from '../../basics/INPUTS/Checkbox/Checkbox'
import CheckboxGroup from '../../basics/INPUTS/CheckboxGroup/CheckboxGroup'
import FieldError from '../../blocks/FieldError/FieldError'
import Heading from '../../basics/Heading/Heading'
import Radio from '../../basics/INPUTS/Radio/Radio'
import Spacing from '../../basics/Spacing/Spacing'
import * as landingFormStyles from './landingForm.module.css'

type FormData = {
  age: string | number | undefined
  group: string
  name: string
  pictureSequence: string
  characterFirst: boolean
  gender: 'M' | 'F'
  quizSectionOrder: 'A' | 'B'
}

type FormValidatingFields = {
  age: string | number | undefined
  group: string
  name: string
  pictureSequence: string
}
const LandingForm: React.FC = () => {
  const [nameError, setNameError] = useState(false)
  const [groupError, setGroupError] = useState(false)
  const [ageError, setAgeError] = useState(false)
  const [pictureSequenceError, setPictureSequenceError] = useState(false)
  const [gender, setGender] = useState<'M' | 'F'>('F')
  const [age, setAge] = useState<string | number | undefined>()
  const [name, setName] = useState('')
  const [group, setGroup] = useState('')
  const [pictureSequence, setPictureSequence] = useState('')
  const [characterFirst, setCharacterFirst] = useState(false)
  const [quizSectionOrder, setQuizSectionOrder] = useState<'A' | 'B'>('A')

  useEffect(() => {
    const detailsFormString = window.sessionStorage.getItem('detailsForm')
    const detailsForm = detailsFormString ? JSON.parse(detailsFormString) : null
    if (detailsForm?.group) {
      setGroup(detailsForm.group)
      window.sessionStorage.clear()
    }
  }, [])

  const validateAge = (age: string | number | undefined): boolean => {
    if (Number(age) >= 10 && Number(age) <= 240) {
      setAgeError(false)
      return true
    } else {
      setAgeError(true)
      return false
    }
  }
  const validateName = (name: string): boolean => {
    if (name.length > 0) {
      setNameError(false)
      return true
    } else {
      setNameError(true)
      return false
    }
  }
  const validateGroup = (group: string): boolean => {
    if (group.length > 0) {
      setGroupError(false)
      return true
    } else {
      setGroupError(true)
      return false
    }
  }
  const validatePictureSequence = (pictureSequence: string): boolean => {
    const validSequenceValue = ['1', '2', '3', '4']
    if (validSequenceValue.includes(pictureSequence)) {
      setPictureSequenceError(false)
      return true
    } else {
      setPictureSequenceError(true)
      return false
    }
  }
  const validateForm = ({ age, group, name, pictureSequence }: FormValidatingFields): boolean => {
    const groupValid = validateGroup(group)
    const nameValid = validateName(name)
    const ageValid = validateAge(age)
    const pictureValue = validatePictureSequence(pictureSequence)
    return ageValid && nameValid && groupValid && pictureValue
  }

  const handleFormSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    const formData: FormData = {
      age: age,
      group: group,
      name: name,
      pictureSequence: pictureSequence,
      characterFirst: characterFirst,
      gender: gender,
      quizSectionOrder: quizSectionOrder,
    }

    const formIsValid = validateForm({ age, group, name, pictureSequence })
    if (formIsValid) {
      window.sessionStorage.setItem('detailsForm', JSON.stringify(formData))
      if (characterFirst) {
        await navigate(`/character`)
      } else {
        if (quizSectionOrder == 'A') {
          await navigate(`/quiz`)
        } else {
          await navigate(`/smiley-faces`)
        }
      }
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className={landingFormStyles.detailsForm}>
        <Heading level='2'>Enter Child Details:</Heading>
        <FieldError
          id='group-error'
          errorMessage='Error: please enter a group name.'
          showError={groupError}
        >
          <label>
            Group:
            <input
              aria-describedby='group-error'
              autoComplete='off'
              type='text'
              name='groupInput'
              value={group}
              onBlur={(event): void => {
                validateGroup(event.target.value)
              }}
              onChange={(event): void => {
                setGroup(event.target.value)
              }}
            />
          </label>
        </FieldError>
        <FieldError
          id='name-error'
          errorMessage='Error: please enter a child name.'
          showError={nameError}
        >
          <label>
            Name:
            <input
              aria-describedby='name-error'
              autoComplete='off'
              type='text'
              name='nameInput'
              value={name}
              onBlur={(event): void => {
                validateName(event.target.value)
              }}
              onChange={(event): void => {
                setName(event.target.value)
              }}
            />
          </label>
        </FieldError>
        <FieldError
          id='age-error'
          errorMessage="Error: please enter child's age in months, from 12-240. (i.e 5yrs = 60)"
          showError={ageError}
        >
          <label>
            Age (in months):
            <input
              aria-describedby='age-error'
              autoComplete='off'
              type='text'
              name='ageInput'
              value={age}
              onBlur={(event): void => {
                validateAge(event.target.value)
              }}
              onChange={(event): void => {
                setAge(event.target.value)
              }}
            />
          </label>
        </FieldError>
        <label>
          <div>Gender:</div>
          <CheckboxGroup groupLabel='Gender'>
            <Radio
              name='gender'
              onChange={(): void => {
                setGender('F')
              }}
              isChecked={gender === 'F'}
              label='Female'
              value='F'
            />
            <Radio
              name='gender'
              onChange={(): void => {
                setGender('M')
              }}
              isChecked={gender === 'M'}
              label='Male'
              value='M'
            />
          </CheckboxGroup>
        </label>
        <label>
          <div>Character Choice Timing:</div>
          <CheckboxGroup groupLabel='character choice location'>
            <Checkbox
              id='character-first-input'
              name='characterFirstInput'
              isChecked={characterFirst}
              value={`${characterFirst}`}
              text='Ask character choice last?'
              onChange={(): void => {
                setCharacterFirst(!characterFirst)
              }}
            />
          </CheckboxGroup>
        </label>
        <FieldError
          id='picture-sequence-error'
          errorMessage='Error: please chose an option, (cycle through for each child pls)'
          showError={pictureSequenceError}
        >
          <label>
            <div>SmileyFace Picture Sequence:</div>
            <select
              aria-describedby='picture-sequence-error'
              name='pictureSequence'
              onChange={(event): void => {
                setPictureSequence(event.target.value)
              }}
              onBlur={(event): void => {
                const value = event.target.value
                validatePictureSequence(value)
              }}
              defaultValue='none'
            >
              <option value='none' disabled hidden>
                -- please choose a sequence --
              </option>
              {[
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
        </FieldError>
        <label>
          <div>Quiz Section Order:</div>
          <CheckboxGroup groupLabel='quiz section order'>
            <Radio
              name='quizSectionOrder'
              onChange={(): void => {
                setQuizSectionOrder('A')
              }}
              isChecked={quizSectionOrder === 'A'}
              label='A sequence'
              value='A'
            />
            <Radio
              name='quizSectionOrder'
              onChange={(): void => {
                setQuizSectionOrder('B')
              }}
              isChecked={quizSectionOrder === 'B'}
              label='B sequence'
              value='B'
            />
          </CheckboxGroup>
        </label>
        <Spacing />
        <div className={landingFormStyles.buttonWrapper}>
          <Button aria-describedby='form-error' size='M' type='submit' buttonText='Submit' />
        </div>
      </div>
    </form>
  )
}

export default LandingForm
