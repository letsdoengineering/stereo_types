import React, { ChangeEvent, useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
// import { navigate } from 'gatsby'

import Button from '../../basics/Button/Button'
import Checkbox from '../../basics/INPUTS/Checkbox/Checkbox'
import GridRow from '../../basics/Grid/GridRow/GridRow'
import GridColumn from '../../basics/Grid/GridColumn/GridColumn'
import TextInput from '../../basics/INPUTS/TextInput/TextInput'
import LabelledInput from '../../blocks/LabelledInput/LabelledInput'
import Spacing from '../../basics/Spacing/Spacing'

import {
    getPreviousSearchDataFromLocalStorage,
    setDataToLocalStorage,
} from '../../../utils/use-local-storage'
import * as styles from './landingForm.module.css'

const INVALID = 'invalid'

const LandingForm: React.FC = () => {
    const { control, handleSubmit, register, setValue } = useFormContext()
    const [characterFirst, setCharacterFirst] = useState(false)
    const [previousGroupValue, setPreviousGroupValue] = useState('')

    useEffect(() => {
        const previousGroup = getPreviousSearchDataFromLocalStorage('keep') // fetch previously submitted group value
        if (previousGroup) setPreviousGroupValue(previousGroup.group) // if a group value exists set to form value for group
        setDataToLocalStorage({}, 'keep') // clear out group value after fetching it.
        setDataToLocalStorage({}, 'proj') // clear out any previous local storage under 'proj'
    }, [])

    useEffect(() => {
        register('group')
        register('name')
        register('age')
    }, [register])
    const detailsFormIsValid = (detailsFormData: Record<string, any>): boolean => {
        let formValid: boolean
        formValid = !isNaN(parseInt(detailsFormData.age))
        if (formValid) formValid = typeof detailsFormData.group == 'string'
        if (formValid) formValid = typeof detailsFormData.name == 'string'
        if (formValid) formValid = detailsFormData.pictureSequence.sequence !== INVALID
        return formValid
    }

    const myOnSubmit = async (formData: Record<string, any>): Promise<void> => {
        if (detailsFormIsValid(formData)) {
            // setDataToLocalStorage({ details: formData }, 'proj')
            // setDataToLocalStorage({ group: formData.group }, 'keep')
            // await navigate(`/proj2`)
            console.log('form is VERY valid', formData)
        } else {
            console.log('FORM NOT VALID', formData)
        }
    }

    const handleCharacterFirst = (): void => {
        setCharacterFirst(!characterFirst)
    }

    const sequenceOptions = [
        { label: '-- must choose one -- ', value: '' },
        { label: 'Sequence 1', value: '1' },
        { label: 'Sequence 2', value: '2' },
        { label: 'Sequence 3', value: '3' },
        { label: 'Sequence 4', value: '4' },
    ]
    const [sequenceOption, setSequenceOption] = useState({
        sequence: INVALID,
    })
    const handleSequence = (e: any): void => {
        setSequenceOption(e.target.value)
    }

    return (
        <form
            onSubmit={handleSubmit(({ age, group, name }) => {
                myOnSubmit({
                    age: age,
                    group: group,
                    name: name,
                    pictureSequence: sequenceOption,
                    characterFirst: characterFirst,
                })
            })}
        >
            <GridRow isPadded className={styles.form}>
                <GridColumn isPadded>
                    <LabelledInput htmlFor='group-input' label='Group:'>
                        <TextInput
                            required={true}
                            name='group'
                            id='group-input'
                            defaultValue={previousGroupValue}
                            autoComplete='false'
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                                setValue('group', e.target.value)
                            }}
                        />
                    </LabelledInput>
                    <Controller
                        name='name'
                        control={control}
                        render={(): React.ReactElement => (
                            <LabelledInput htmlFor='name-input' label='Name:'>
                                <TextInput
                                    required={true}
                                    name='name'
                                    id='name-input'
                                    autoComplete='false'
                                    onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                                        setValue('name', e.target.value)
                                    }}
                                />
                            </LabelledInput>
                        )}
                    />

                    <LabelledInput htmlFor='age-input' label='Age:'>
                        <TextInput
                            required={true}
                            name='age'
                            id='age-input'
                            autoComplete='false'
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                                setValue('age', e.target.value)
                            }}
                        />
                    </LabelledInput>

                    <LabelledInput htmlFor='character-first-input' label='Game Option:'>
                        <Checkbox
                            id='character-first-input'
                            isChecked={characterFirst}
                            value={`${characterFirst}`}
                            text='Display character choice last?'
                            onChange={(): void => handleCharacterFirst()}
                        />
                    </LabelledInput>

                    <LabelledInput htmlFor='picture-sequence' label='Picture sequence:'>
                        <select
                            name='pictureSequence'
                            id='picture-sequence'
                            placeholder='please select'
                            defaultValue={''}
                            onChange={(e): void => handleSequence(e)}
                        >
                            {sequenceOptions.map((item) => {
                                return (
                                    <option key={`${item.value}-${item.label}`} value={item.value}>
                                        {item.label}
                                    </option>
                                )
                            })}
                        </select>
                    </LabelledInput>
                    <Spacing />
                    <Button size='M' type='submit' buttonText='Submit' fillSpace={false} />
                </GridColumn>
            </GridRow>
        </form>
    )
}

export default LandingForm
