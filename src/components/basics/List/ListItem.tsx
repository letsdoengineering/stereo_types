import React from 'react'
import getClassNames from '../../../utils/get-class-names'
import listItemStyles from './ListItem.module.css'

type ListItemProps = React.AllHTMLAttributes<HTMLLIElement> & {
  /** unique key for each <li> rendered to help react track dynamically rendered contents */
  listKey: string
  /** optional: styles a list to appear as links if set - defaults to false */
  isLinks?: boolean
}

/** Text: renders a Text tag of a type based on the tagName prop */
const ListItem: React.FC<ListItemProps> = ({
  listKey,
  className,
  isLinks = false,
  children,
  ...rest
}: ListItemProps) => {
  const classNames = getClassNames({
    className,
    conditionalClasses: { [`${listItemStyles.isLinks}`]: isLinks },
  })

  return (
    <li key={listKey} className={classNames} {...rest}>
      {children}
    </li>
  )
}

export default ListItem
