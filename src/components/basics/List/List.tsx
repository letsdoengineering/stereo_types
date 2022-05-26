import React from 'react'
import getClassNames from '../../../utils/get-class-names'
import * as listStyles from './List.module.css'

export type ListProps = {
  /** optional: default to ul if not passed */
  isOrdered?: boolean
  /** optional: default to unstyled if not passed */
  isUnstyled?: boolean
  /** optional: styles a list to appear as links if set - defaults to false */
  isLinks?: boolean
  /** optional: indents the list if set to true */
  isIndented?: boolean
  /** optional: class-names */
  className?: string
  /** children always of type ReactNode */
  children: React.ReactNode
}

/** Text: renders a Text tag of a type based on the tagName prop */
const List: React.FC<
  ListProps & React.AllHTMLAttributes<HTMLUListElement> & React.AllHTMLAttributes<HTMLOListElement>
> = ({
  isOrdered = false,
  isUnstyled = true,
  isLinks = false,
  isIndented = false,
  className,
  children,
}: ListProps) => {
  const Wrapper = `${isOrdered ? 'ol' : 'ul'}` as keyof JSX.IntrinsicElements
  const classNames = getClassNames({
    className,
    conditionalClasses: {
      [`${listStyles.listUnstyled}`]: isUnstyled,
      [listStyles.itemSpacing]: isIndented,
    },
  })

  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { isLinks })
    }
    return child
  })

  return <Wrapper className={classNames}>{childrenWithProps}</Wrapper>
}

export default List
