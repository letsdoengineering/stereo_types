import React from 'react'
import getClassNames from '../../../../utils/get-class-names'
import * as gridColumnStyles from './GridColumn.module.css'

type GridColumnProps = React.HTMLAttributes<HTMLDivElement> & {
  /** optional: specify how much space in a row a column occupies in increments of 1/12ths */
  size?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'
  /** optional: class-names */
  className?: string
  /** indicates whether or not the row container should be padded */
  isPadded?: boolean
  /** children always of type ReactNode */
  children?: React.ReactNode
}

/** GridColumn: component that returns a div styled as a grid column with
 * automatic sizing or sizing specified by size prop*/
const GridColumn: React.FC<GridColumnProps> = ({
  size,
  isPadded = false,
  className,
  children,
  ...rest
}: GridColumnProps) => {
  const classNames = getClassNames({
    defaultClasses: [
      `${gridColumnStyles.gridColumn}`,
      size ? `${gridColumnStyles[`size${size}`]}` : `${gridColumnStyles.sizeAuto}`,
    ],
    className,
    conditionalClasses: {
      [`${gridColumnStyles.gridColumnPadded}`]: isPadded,
    },
  })

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  )
}

export default GridColumn
