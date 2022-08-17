import React from 'react'
import getClassNames from '../../../utils/get-class-names'
import iconStyles from './Icon.module.css'

export type IconProps = React.AllHTMLAttributes<HTMLSpanElement> & {
  /** string that represents a specific icon */
  icon:
    | 'search'
    | 'calendar-day'
    | 'chevron-down'
    | 'chevron-up'
    | 'chevron-left'
    | 'chevron-right'
    | 'info-circle'
    | 'moon'
    | 'map-marker-alt'
    | 'ship'
    | 'times'
    | 'exclamation-triangle'
  /** string that represents the size of the icon - applied from css */
  iconSize?: ElementSize
  /** string that represents the color of the icon applied as css*/
  iconColor?: 'Blue' | 'Grey' | 'Red'
}

/** Icon: renders a span with a class-name that applies a specific icon from the fa stylesheet */
const Icon: React.FC<IconProps> = ({
  icon,
  iconSize = 'L',
  iconColor = 'Blue',
  className,
}: IconProps) => {
  const sizeClass = iconStyles[`iconSize${iconSize}`]
  const colorClass = iconStyles[`iconColor${iconColor}`]
  const classNames = getClassNames({
    defaultClasses: ['fas', `fa-${icon}`, sizeClass, colorClass],
    className,
  })

  return <span aria-hidden='true' className={classNames} />
}

export default Icon
