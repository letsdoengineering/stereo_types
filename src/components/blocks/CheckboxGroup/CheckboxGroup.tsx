import React from 'react'

import getClassNames from '../../../utils/get-class-names'
import Text from '../../basics/Text/Text'
import * as checkboxGroupStyles from './CheckboxGroup.module.css'

type CheckboxGroupProps = Readonly<{
    /** label must be provided for accessibility */
    groupLabel: string
    /** label is visually hidden by default */
    showLabel?: boolean
    /** children always of type ReactNode */
    children: React.ReactNode
}>

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
    groupLabel,
    showLabel = false,
    children,
}) => {
    const groupLabelClassName = getClassNames({
        conditionalClasses: {
            ['visually-hidden']: !showLabel,
        },
    })

    return (
        <form>
            <fieldset className={checkboxGroupStyles.container}>
                <legend className={groupLabelClassName}>
                    <Text>{groupLabel}</Text>
                </legend>
                {children}
            </fieldset>
        </form>
    )
}

export default CheckboxGroup
