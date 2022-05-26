import React, { FunctionComponent } from 'react'

export type RadioProps = React.ComponentProps<'input'> &
  Readonly<{
    /** id used for id of input - custom styling */
    id?: string | undefined
    /** tell the radio what it's status is, controlled by consumer and triggered via onChange */
    isChecked: boolean
    /** Called when toggled */
    onChange(): void
    /** value you wish the radio to have */
    value: string
    /** for showing instead of radio */
    children: React.ReactElement
  }>

const RadioWrapper: FunctionComponent<RadioProps> = ({
  isChecked,
  id,
  onChange,
  value,
  children,
  ...rest
}) => {
  return (
    <label>
      <input checked={isChecked} id={id} onChange={onChange} type='radio' value={value} {...rest}>
        {children}
      </input>
    </label>
  )
}

export default RadioWrapper
