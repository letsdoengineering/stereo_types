import React, { forwardRef } from 'react'
import getClassNames from '../../../utils/get-class-names'
import * as labeledInputStyles from './LabelledInput.module.css'

type LabelledInputProps = {
    htmlFor: string | undefined
    label: string
    /** show an icon, maybe even provide the name of icon to show? */
    icon?: React.ReactElement
    children: React.ReactElement
    iconOnRight?: boolean
}

/** LabelledInput: component that returns a label accessibly linked to the passed in Input */
const LabelledInput = forwardRef<HTMLInputElement, LabelledInputProps>((props, ref) => {
    const { htmlFor, label, icon, iconOnRight = false, children, ...rest } = props

    const childrenProps = {
        ...rest,
        id: htmlFor,
        ref,
    }

    const childrenWithProps = React.Children.map(children, (child) => {
        // Checking isValidElement is the safe way and avoids a typescript error too.
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { ...childrenProps })
        }
        return child
    })
    const iconClassNames = getClassNames({
        conditionalClasses: {
            [`${labeledInputStyles.icon}`]: !!icon && !iconOnRight,
            [`${labeledInputStyles.iconReverse}`]: iconOnRight,
        },
    })

    const iconAndInputClassNames = getClassNames({
        defaultClasses: [`${labeledInputStyles.iconAndInput}`],
        conditionalClasses: {
            [`${labeledInputStyles.iconAndInputReverse}`]: iconOnRight,
        },
    })

    return (
        <div className={labeledInputStyles.container}>
            <label htmlFor={htmlFor}>
                <span className={labeledInputStyles.labelText}>{label}</span>
                <div className={iconAndInputClassNames}>
                    {icon && <span className={iconClassNames}>{icon}</span>}
                    {childrenWithProps}
                </div>
            </label>
        </div>
    )
})

LabelledInput.displayName = 'LabelledTextInput'

export default LabelledInput
