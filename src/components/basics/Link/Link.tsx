import React from 'react'
import * as linkStyles from './Link.module.css'
import getClassNames from '../../../utils/get-class-names'

type LinkProps = {
    /** 16 | 18 | 20 | 30 px*/
    size?: ElementSize
    /** font weight */
    weight?: 'Normal' | 'Bold' | 'Xtra'
    /** optional: class-names */
    className?: string
    /** children always of type ReactNode */
    children?: React.ReactNode
}

/** Link: returns a customisable anchor tag component */
const Link: React.FC<LinkProps & React.AllHTMLAttributes<HTMLHtmlElement>> = ({
    size = 'S',
    weight = 'Normal',
    className,
    children,
    ...rest
}: LinkProps) => {
    const classNames = getClassNames({
        defaultClasses: [linkStyles.link, linkStyles[`size${size}`], linkStyles[`weight${weight}`]],
        className,
    })

    return (
        <a className={classNames} {...rest}>
            {children}
        </a>
    )
}

export default Link
