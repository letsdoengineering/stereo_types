import React, { AllHTMLAttributes } from 'react'
import * as cardStyles from './Card.module.css'
import getClassNames from '../../../utils/get-class-names'

type CardProps = AllHTMLAttributes<HTMLDivElement> & {
    isPadded?: boolean
    className?: string
    children?: React.ReactNode
}

const Card: React.FC<CardProps> = ({ isPadded = false, className, children }) => {
    const classNames = getClassNames({
        defaultClasses: [`${cardStyles.card}`],
        className,
        conditionalClasses: {
            [`${cardStyles.cardPadded}`]: isPadded,
        },
    })

    return <div className={classNames}>{children}</div>
}

export default Card
