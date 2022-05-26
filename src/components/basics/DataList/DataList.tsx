import React from 'react'
import getClassNames from '../../../utils/get-class-names'
import * as dataListStyles from './DataList.module.css'

export type DataListProps = React.AllHTMLAttributes<HTMLDListElement> & {
  /** optional: class-names */
  className?: string
  /** children always of type ReactNode */
  children: React.ReactNode
}

/** DataList: renders a DataList tag to wrap DataListValue and DataListKey pairs in  */
const DataList: React.FC<DataListProps> = ({ className, children }: DataListProps) => {
  const listClassNames = getClassNames({
    defaultClasses: [`${dataListStyles.dataList}`],
    className,
  })

  return <dl className={listClassNames}>{children}</dl>
}

export default DataList
