import React, { FunctionComponent } from 'react'

export type RadioProps = React.ComponentProps<'input'> &
  Readonly<{
    children: React.ReactElement[]
    /** legend for radio group */
    groupName: string
  }>

const RadioGroup: FunctionComponent<RadioProps> = ({ children, groupName }) => {
  return (
    <fieldset>
      <legend>{groupName}</legend>
      {children}
    </fieldset>
  )
}

export default RadioGroup
