import React from 'react'
import Text from './../../Text/Text'
import * as styles from './ToggleButton.module.css'

type ToggleButtonProps = {
  /** Tell the button (checkbox) it's status; controlled by consumer via passing onChange function */
  isChecked: boolean
  /** Called when clicked */
  onChange(): void
  /** Text label */
  label: string
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isChecked,
  onChange,
  label,
  ...rest
}: ToggleButtonProps) => (
  <label className={styles.container}>
    <input type='checkbox' checked={isChecked} onChange={onChange} {...rest} />
    <div className={styles.toggle}>
      <Text className={styles.text}>{label}</Text>
    </div>
  </label>
)

export default ToggleButton
