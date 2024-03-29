import React from 'react'
import getClassNames from '../../../utils/get-class-names'
import './Button.css'

type ButtonProps = {
  /** disabled */
  disabled?: boolean
  /** type of button can only be button or submit - reset type not allowed */
  type?: 'button' | 'submit'
  /** text to display on the button */
  buttonText: string
  /** a standardised size of the button */
  size?: 'S' | 'M'
  /** style type */
  secondary?: boolean
  /** grow to fill container */
  fillSpace?: boolean
  /** onClick callback */
  onClick?(): void
  /** class names represented as a string */
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  disabled = false,
  className,
  buttonText,
  fillSpace = false,
  type = 'submit',
  size = 'S',
  onClick,
  secondary = false,
  ...rest
}: ButtonProps) => {
  const classNames = getClassNames({
    defaultClasses: ['basic_button', `basic_button_${size}`],
    className,
    conditionalClasses: {
      basic_button_secondary: secondary,
      'basic_button_fill-space': fillSpace,
      basic_button_disabled: disabled,
    },
  })

  return (
    <button disabled={disabled} type={type} className={classNames} onClick={onClick} {...rest}>
      {buttonText}
    </button>
  )
}

export default Button
