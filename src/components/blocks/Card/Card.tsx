import React, { forwardRef } from 'react'
import cardStyles from './Card.module.css'
import getClassNames from '../../../utils/get-class-names'

type CardProps = React.ComponentPropsWithRef<'div'> & {
  isPadded?: boolean
  className?: string
  children?: React.ReactNode
}

const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { isPadded = false, className, children, ...rest } = props
  const classNames = getClassNames({
    defaultClasses: [`${cardStyles.card}`],
    className,
    conditionalClasses: {
      [`${cardStyles.cardPadded}`]: isPadded,
    },
  })

  return (
    <div className={classNames} ref={ref} {...rest}>
      {children}
    </div>
  )
})
Card.displayName = 'Card'

export default Card
