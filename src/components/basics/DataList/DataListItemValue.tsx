import React from 'react'
import getClassNames from '../../../utils/get-class-names'
import './DataList.css'

type DataListItemValueProps = React.AllHTMLAttributes<HTMLElement> & {
  /** optional: class-names */
  className?: string
  /** children always of type ReactNode */
  children: React.ReactNode
}

/** DataListItemValue: renders a DD tag */
const DataListItemValue: React.FC<DataListItemValueProps> = ({
  className,
  children,
}: DataListItemValueProps) => {
  const classNames = getClassNames({
    defaultClasses: ['data_list_item-value'],
    className,
  })

  return <dd className={classNames}>{children}</dd>
}

export default DataListItemValue
