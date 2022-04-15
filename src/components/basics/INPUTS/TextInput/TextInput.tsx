import React, { forwardRef } from 'react'
import getClassNames from '../../../../utils/get-class-names'
import * as textInputStyles from './TextInput.module.css'

export type TextInputProps = React.ComponentPropsWithRef<'input'> & {
    id?: string | undefined
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
    const { id, className, ...rest } = props
    const textInputClassNames = getClassNames({
        defaultClasses: [`${textInputStyles.textInput}`],
        className: className,
    })

    return <input id={id} className={textInputClassNames} type='text' ref={ref} {...rest} />
})
TextInput.displayName = 'TextInput'

export default TextInput
