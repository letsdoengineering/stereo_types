import React from 'react'
import getClassNames from '../../../utils/get-class-names'
import * as footerStyles from './Footer.module.css'

// TODO: find appropriate interface to extend for footer props
type FooterProps = {
  /** optional: class-names */
  className?: string
  /** children always of type ReactNode */
  children: React.ReactNode
}

/** Footer: component that returns a footer element with a nested div styled as a container */
const Footer: React.FC<FooterProps> = ({ className, children, ...rest }: FooterProps) => {
  const classNames = getClassNames({
    defaultClasses: [`${footerStyles.footer}`],
    className,
  })

  return (
    <footer className={classNames} {...rest}>
      {children}
    </footer>
  )
}

export default Footer
