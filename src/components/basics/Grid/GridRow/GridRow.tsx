import React from 'react'
import getClassNames from '../../../../utils/get-class-names'
import * as gridRowStyles from './GridRow.module.css'

type GridRowProps = React.HTMLAttributes<HTMLDivElement> & {
    /** optional: class-names */
    className?: string
    /** indicates whether or not the row container should be padded */
    isPadded?: boolean
    /** children always of type ReactNode */
    children: React.ReactNode
}

const GridRow: React.FC<GridRowProps> = ({
    className,
    children,
    isPadded = false,
}: GridRowProps) => {
    const classNames = getClassNames({
        defaultClasses: [`${gridRowStyles.gridRow}`],
        className,
        conditionalClasses: {
            [`${gridRowStyles.gridRowPadded}`]: isPadded,
        },
    })

    return <div className={classNames}>{children}</div>
}

export default GridRow
