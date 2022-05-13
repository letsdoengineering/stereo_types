import React, { ChangeEvent, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { navigate } from 'gatsby'

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
import FieldError from '../../blocks/FieldError/FieldError'

type DetailsForm = {
    name: string | undefined
    age: string | undefined
    group: string | undefined
    pictureSequence: Record<string, string>
    characterFirst: boolean
}
// const detailsFormIsValid = (detailsFormData: DetailsForm): boolean => {
//     let formValid: boolean
//     formValid = detailsFormData.age ? !isNaN(parseInt(detailsFormData.age)) : false
//     if (formValid) formValid = typeof detailsFormData.group == 'string'
//     if (formValid) formValid = typeof detailsFormData.name == 'string'
//     if (formValid) formValid = detailsFormData.pictureSequence !== INVALID
//     return formValid
// }

const LandingForm: React.FC = () => {
    const {
        setValue,
        getValues,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    // useEffect(() => {
    //     const previouslySetGroup = getPreviousSearchDataFromLocalStorage('keepOnce') // fetch previously submitted group value
    //     console.log('previously set group value', previouslySetGroup.group)
    //     if (previouslySetGroup.group) {
    //         console.log('setting group to:', previouslySetGroup)
    //         setValue('group', previouslySetGroup.group)
    //     } // if a group value exists set to form value for group
    //     setDataToLocalStorage({}, 'keepOnce') // clear out group value after fetching it.
    //     setDataToLocalStorage({}, 'proj') // clear out any previous local storage under 'proj'
    // }, [])

    // const myOnSubmit = async (formData: DetailsForm): Promise<void> => {
    const myOnSubmit = (formData: DetailsForm): void => {
        console.log('my submit:', formData)
        // if (detailsFormIsValid(formData)) {
        //     setDataToLocalStorage({ details: formData }, 'proj')
        //     setDataToLocalStorage({ group: formData.group }, 'keepOnce')
        //     // await navigate(`/proj2`)
        //     console.log('form is VERY valid', formData)
        // } else {
        //     console.log('FORM NOT VALID', formData)
        // }
    }

    return (
        <form
            onSubmit={handleSubmit(
                ({
                    ageInput,
                    groupInput,
                    nameInput,
                    pictureSequenceInput,
                    characterFirstInput,
                }) => {
                    myOnSubmit({
                        age: ageInput,
                        group: groupInput,
                        name: nameInput,
                        pictureSequence: pictureSequenceInput,
                        characterFirst: characterFirstInput,
                    })
                }
            )}
        >
            <GridRow isPadded className={styles.form}>
                <GridColumn isPadded>
                    <label>
                        Group:
                        <TextInput {...register('groupInput', { required: true })} />
                    </label>

                    <FieldError
                        errorMessage={'ERROR: should fill this one pls'}
                        showError={errors.nameInput}
                    >
                        <label>
                            Name:
                            <TextInput
                                {...register('nameInput', { required: true })}
                                name='nameInput'
                            />
                        </label>
                    </FieldError>

                    <TextInput {...register('ageInput', { required: true })} />
                    <label>
                        Character first or last?:
                        <Checkbox
                            id='character-first-input'
                            name='characterFirstInput'
                            isChecked={getValues('characterFirst')}
                            value={getValues('characterFirstInput')}
                            text='Display character choice last?'
                            onChange={(): void => {
                                console.log('character-first:', !getValues('characterFirst'))
                                setValue('characterFirstInput', !getValues('characterFirst'))
                            }}
                        />
                    </label>
                    <label>
                        Picture sequence:
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
                    <Spacing />
                    <Button size='M' type='submit' buttonText='Submit' />
                </GridColumn>
            </GridRow>
        </form>
    )
}

export default LandingForm
