import React, { FunctionComponent } from 'react'
import Text from '../../Text/Text'

export type RadioProps = React.ComponentProps<'input'> &
  Readonly<{
    /** id used for id of input - custom styling */
    id?: string | undefined
    /** tell the radio what it's status is, controlled by consumer and triggered via onChange */
    isChecked: boolean
    /** Called when toggled */
    onChange(event: any): void
    /** value you wish the radio to pass the onChange */
    value: string
    /** text for showing next to radio */
    label: string
  }>

const Radio: FunctionComponent<RadioProps> = ({
  isChecked,
  id,
  onChange,
  value,
  label,
  inputRef,
  ...rest
}) => {
  return (
    <label>
      <input checked={isChecked} id={id} onChange={onChange} type='radio' value={value} ref={inputRef} {...rest} />
      <Text>{label}</Text>
    </label>
  )
}

export default Radio
