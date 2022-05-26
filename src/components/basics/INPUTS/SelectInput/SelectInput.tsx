import React, { FunctionComponent, ReactNode } from 'react'
import { Select } from 'react-functional-select'
import Icon from '../../Icon/Icon'
import './SelectInput.css'
import * as self from './SelectInput'

export type SelectOption = Readonly<{
  label: string
  value: Record<string, string> | string | null
}>

export type SelectInputProps = Readonly<{
  /** id assigned to input field */
  id?: string | undefined
  /** pass value if to start with option already selected */
  initialValue?: SelectOption | null
  /** toogle X button to clear*/
  isClearable?: boolean
  /** toggle input being interactive and acting as filter on options menu */
  isSearchable?: boolean
  /** callback that is passed the value on change events */
  onChange(data: Record<string, string>): void
  /** option that create the labels/value for the menu */
  options: SelectOption[]
  /** can provide placeholder text when no option selected - default is 'Select option..' */
  placeholder?: string
}>

/** Provides the custom icon for Select input, relies on menuOpen variable to switch between up  and down */
export const getCaretIcon = ({ menuOpen }: Record<string, any>): ReactNode => {
  const type = menuOpen ? 'chevron-up' : 'chevron-down'
  return <Icon icon={type} />
}

const SelectInput: FunctionComponent<SelectInputProps> = ({
  id,
  initialValue = null,
  isClearable = false,
  isSearchable = false,
  options,
  placeholder = undefined,
  onChange,
}) => {
  return (
    <Select
      placeholder={placeholder}
      initialValue={initialValue}
      isClearable={isClearable}
      isSearchable={isSearchable}
      options={options}
      getOptionValue={(option: SelectOption): string => option.label}
      caretIcon={self.getCaretIcon}
      onOptionChange={onChange}
      inputId={id}
    />
  )
}

SelectInput.displayName = 'SelectInput'

export default SelectInput
