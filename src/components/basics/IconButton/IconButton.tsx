import React from 'react'
import getClassNames from '../../../utils/get-class-names'

import Icon, { IconProps } from '../Icon/Icon'
import * as iconButtonStyles from './IconButton.module.css'

export type IconButtonProps = IconProps &
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    /** label for accessibility reasons, not shown visually */
    label: string
    /** exposes className prop for the Icon component */
    iconClassName?: string
    /** exposes className prop for the button component */
    buttonClassName?: string
    /** function called when clicked */
    onClick(): void
    /** toggle for disabling the icon button*/
    disabled?: boolean
  }

/** IconButton: renders a button with a child icon and label that is not visually shown */
const IconButton: React.FC<IconButtonProps> = ({
  icon,
  iconSize = 'L',
  iconColor = 'Grey',
  iconClassName,
  buttonClassName,
  label,
  onClick,
  disabled = false,
  ...rest
}: IconButtonProps) => {
  const iconClassNames = getClassNames({
    defaultClasses: [iconButtonStyles.buttonIcon],
    className: iconClassName,
  })

  const buttonClassNames = getClassNames({
    defaultClasses: [iconButtonStyles.button],
    conditionalClasses: {
      [iconButtonStyles.buttonDisabled]: disabled,
    },
    className: buttonClassName,
  })

  const colour = disabled ? 'Grey' : iconColor
  return (
    <button
      disabled={disabled}
      type='button'
      onClick={onClick}
      className={buttonClassNames}
      {...rest}
    >
      <Icon icon={icon} iconSize={iconSize} iconColor={colour} className={iconClassNames} />
      <span className='visually-hidden'>{label}</span>
    </button>
  )
}

export default IconButton
