import React from 'react'
import getClassNames from '../../../../utils/get-class-names'
import Text from '../../../basics/Text/Text'
import * as tabButtonStyles from './TabButton.module.css'

type TabButtonProps = {
  isHighlighted?: boolean
  className?: string
  children: React.ReactNode
}

const TabButton: React.FC<TabButtonProps & React.AllHTMLAttributes<HTMLButtonElement>> = ({
  isHighlighted = false,
  className,
  children,
  ...rest
}: TabButtonProps) => {
  const classNames = getClassNames({
    defaultClasses: [tabButtonStyles.tabButton],
    className,
    conditionalClasses: {
      [tabButtonStyles.highlighted]: isHighlighted,
    },
  })

  return (
    <button type='button' className={classNames} {...rest}>
      <Text>{children}</Text>
    </button>
  )
}

export default TabButton
