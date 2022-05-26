import React from 'react'
import Icon from '../../basics/Icon/Icon'
import Text from '../../basics/Text/Text'
import { v4 } from 'uuid'

import * as fieldErrorStyles from './FieldError.module.css'

type FieldErrorPros = {
  children: React.ReactElement
  /** The message that should be displayed */
  errorMessage: string
  /** Flag to pass in error state */
  showError: boolean
  /** uniqueID to link field error to child input for screen readers, if no value provided - unique value is automatically generated */
  uniqueID?: string
}

const FieldError: React.FC<FieldErrorPros> = ({
  children,
  errorMessage,
  showError,
  uniqueID = v4(),
}) => {
  if (!showError) return children

  /** reason for cloning children is to allow us to pass id that can be used to associate the error with the input for screen readers. */
  const childrenProps = {
    'aria-describedby': uniqueID + '-error-message',
  }

  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ...childrenProps })
    }
    return child
  })

  return (
    <div>
      <div className={fieldErrorStyles.childrenWrapper}>{childrenWithProps}</div>
      <div className={fieldErrorStyles.error}>
        <Icon
          className={fieldErrorStyles.icon}
          iconColor='Red'
          icon='exclamation-triangle'
          iconSize='S'
        />
        <Text id={uniqueID + '-error-message'} weight='Bold'>
          {errorMessage}
        </Text>
      </div>
    </div>
  )
}

export default FieldError
