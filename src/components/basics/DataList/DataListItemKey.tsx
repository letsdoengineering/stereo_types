import React from 'react'
import getClassNames from '../../../utils/get-class-names'
import './DataList.css'

type DataListItemKeyProps = React.AllHTMLAttributes<HTMLElement> & {
  /** optional: class-names */
  className?: string
  /** children always of type ReactNode */
  children: React.ReactNode
}

/** DataListItemKey: renders a DT tag */
const DataListItemKey: React.FC<DataListItemKeyProps> = ({
  className,
  children,
}: DataListItemKeyProps) => {
  const classNames = getClassNames({
    defaultClasses: ['data_list_item-key'],
    className,
  })

  return <dt className={classNames}>{children}</dt>
}

export default DataListItemKey
