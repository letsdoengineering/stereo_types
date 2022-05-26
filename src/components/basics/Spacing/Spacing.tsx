import React from 'react'
import * as spacingStyles from './Spacing.module.css'
import getClassNames from '../../../utils/get-class-names'

type SpacingProps = {
  /** level of spacing to apply */
  size?: 'Single' | 'Double'
  /** children always of type ReactNode */
  children?: React.ReactNode
}

/** Spacing: Returns a sizeable 'spacing' element that creates empty space on a page using a div */
const Spacing: React.FC<SpacingProps> = ({ size = 'Single', children }: SpacingProps) => {
  const classNames = getClassNames({
    defaultClasses: [spacingStyles[`spacing${size}`], spacingStyles['spacing']],
  })
  return <div className={classNames}>{children}</div>
}

export default Spacing
