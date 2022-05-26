import React from 'react'
import getClassNames from '../../../utils/get-class-names'
import * as headingStyles from './Heading.module.css'

// TODO: Find appropriate interface to extend for h1-h6
type HeadingProps = {
  /** the section heading tag level between <h1>-<h6> that you wish to set */
  level?: '1' | '2' | '3' | '4' | '5' | '6'
  /** optional: class-names */
  className?: string
  /** font weight */
  weight?: 'Normal' | 'Bold' | 'Xtra'
  /** children always of type ReactNode */
  children: React.ReactNode
}

/** Heading: component that returns a section heading tag between <h1>-<h6>
 * defaults to H1 if nothing is set */
const Heading: React.FC<HeadingProps> = ({
  level = '1',
  className,
  weight = 'Normal',
  children,
  ...rest
}: HeadingProps) => {
  const classNames = getClassNames({
    defaultClasses: [
      headingStyles.title,
      headingStyles[`title${level}`],
      headingStyles[`weight${weight}`],
    ],
    className,
  })
  const Wrapper = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <Wrapper className={classNames} {...rest}>
      {children}
    </Wrapper>
  )
}

export default Heading
