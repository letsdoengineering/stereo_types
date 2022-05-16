import React, { ChangeEvent, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { navigate } from 'gatsby'

import Button from '../../basics/Button/Button'
import Checkbox from '../../basics/INPUTS/Checkbox/Checkbox'
import GridRow from '../../basics/Grid/GridRow/GridRow'
import GridColumn from '../../basics/Grid/GridColumn/GridColumn'
import Spacing from '../../basics/Spacing/Spacing'

import {
    getPreviousSearchDataFromLocalStorage,
    setDataToLocalStorage,
} from '../../../utils/use-local-storage'
import * as styles from './landingForm.module.css'
import FieldError from '../../blocks/FieldError/FieldError'

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
                    const formData = {
                        age: ageInput,
                        group: groupInput,
                        name: nameInput,
                        pictureSequence: pictureSequenceInput,
                        characterFirst: characterFirstInput,
                    }
                    console.log('my submit:', formData)
                }
            )}
        >
            <GridRow isPadded className={styles.detailsForm}>
                <GridColumn className={styles.detailsFormColumn} isPadded>
                    <FieldError
                        errorMessage={'ERROR: should fill this one pls'}
                        showError={errors.groupInput}
                    >
                        <label>
                            Group:
                            <input type='text' {...register('groupInput', { required: true })} />
                        </label>
                    </FieldError>
                    <FieldError
                        errorMessage={'ERROR: should fill this one pls'}
                        showError={errors.nameInput}
                    >
                        <label>
                            Name:
                            <input
                                type='text'
                                {...register('nameInput', { required: true })}
                                name='nameInput'
                            />
                        </label>
                    </FieldError>
                    <FieldError
                        errorMessage={'ERROR: should fill this one pls'}
                        showError={errors.ageInput}
                    >
                        <label>
                            Age:
                            <input type='text' {...register('ageInput', { required: true })} />
                        </label>
                    </FieldError>

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
