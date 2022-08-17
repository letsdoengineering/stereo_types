import React from 'react'
import toggleStyles from './ToggleSwitch.module.css'

type ToggleSwitchProps = {
  /** Tell the toggle (checkbox) it's status; controlled by consumer via passing onChange function */
  isChecked: boolean
  /** Called when clicked */
  onChange(): void
  /** Text label for screen reader, visually not shown */
  label: string
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isChecked,
  onChange,
  label,
  ...rest
}: ToggleSwitchProps) => {
  return (
    <label className={toggleStyles.container}>
      <span className='visually-hidden'>{label}</span>
      <input type='checkbox' checked={isChecked} onChange={onChange} {...rest} />
      <span className={toggleStyles.slider} />
    </label>
  )
}

export default ToggleSwitch
