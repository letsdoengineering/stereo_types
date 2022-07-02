import React from 'react'
import Text from '../../basics/Text/Text'

import * as fieldErrorStyles from './FieldError.module.css'

type FieldErrorPros = {
  children: React.ReactElement
  /** The message that should be displayed */
  errorMessage: string
  /** Flag to pass in error state */
  showError: boolean
  /** id must be provided, should be passing to the input child on the aria-describedby prop  */
  id: string
}

const FieldError: React.FC<FieldErrorPros> = ({ children, errorMessage, showError, id }) => {
  if (!showError) return children

  return (
    <div className={fieldErrorStyles.root}>
      <span className={fieldErrorStyles.childrenWrapper}>{children}</span>
      <Text id={id} weight='Bold' className={fieldErrorStyles.errorMessage}>
        {errorMessage}
      </Text>
    </div>
  )
}

export default FieldError
