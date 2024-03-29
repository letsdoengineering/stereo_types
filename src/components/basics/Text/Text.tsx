import React from 'react'
import getClassNames from '../../../utils/get-class-names'
import './Text.css'

// TODO: find appropriate interface to extend for span, p and text
type TextProps = {
  /** the type of Text element tag to render */
  tagName?: 'span' | 'p' | 'text'
  /** optional: class-names */
  className?: string
  /** optional: specify the role for accessibility purposes when semantic role has changed */
  role?: string
  /** children always of type ReactNode */
  children: React.ReactNode
  /** colour choice*/
  color?: 'Gray' | 'Blue'
  /** 16 | 18 | 20 | 30 px*/
  size?: ElementSize
  /** font weight */
  weight?: 'Normal' | 'Bold' | 'Xtra'
  id?: string
}

/** Text: renders a Text tag of a type based on the tagName prop */
const Text: React.FC<TextProps> = ({
  tagName: Wrapper = 'span',
  className,
  children,
  color = 'Gray',
  size = 'S',
  weight = 'Normal',
  id,
  ...rest
}: TextProps) => {
  const classNames = getClassNames({
    defaultClasses: [
      `text_styles-size-${size}`,
      `text_styles-weight-${weight}`,
      `text_styles-color-${color}`,
    ],
    className,
  })

  return (
    <Wrapper className={classNames} id={id} {...rest}>
      {children}
    </Wrapper>
  )
}

export default Text
