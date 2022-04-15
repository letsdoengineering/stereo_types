import React, { FunctionComponent } from 'react'
import Text from '../../Text/Text'
import * as checkboxStyles from './Checkbox.module.css'
import getClassNames from '../../../../utils/get-class-names'

export type CheckboxProps = React.ComponentProps<'input'> &
    Readonly<{
        /** id used for id of input - custom styling */
        id?: string | undefined
        /** tell the checkbox what it's status is, controlled by consumer and triggered via onChange */
        isChecked: boolean
        /** Called when toggled */
        onChange(): void
        /** value you wish the checkbox to have */
        value: string
        /** text for showing next to checkbox */
        text: string
        /** toggle to make unavailable */
        available?: boolean
    }>

const Checkbox: FunctionComponent<CheckboxProps> = ({
    isChecked,
    id,
    available = true,
    onChange,
    value,
    text,
    ...rest
}) => {
    const textClassName = getClassNames({
        conditionalClasses: { [`${checkboxStyles.unavailable}`]: !available },
    })
    const checkboxClassName = getClassNames({
        defaultClasses: [`${checkboxStyles.checkmark}`],
        conditionalClasses: { [`${checkboxStyles.unavailable}`]: !available },
    })

    return (
        <label className={checkboxStyles.container}>
            <input
                disabled={!available}
                checked={isChecked}
                id={id}
                onChange={onChange}
                type='checkbox'
                value={value}
                {...rest}
            />
            <span className={checkboxClassName} />
            <Text className={textClassName}>{text}</Text>
        </label>
    )
}

export default Checkbox
