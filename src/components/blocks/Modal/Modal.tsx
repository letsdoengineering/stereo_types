import React, { useRef, useEffect, useState } from 'react'
import getClassNames from '../../../utils/get-class-names'

import Card from '../../blocks/Card/Card'
import IconButton from '../../basics/IconButton/IconButton'
import * as self from './Modal'

import modalStyles from './Modal.module.css'

export type ModalProps = {
  /** boolean for setting modal open */
  isOpen: boolean
  /** callback for when its closed - triggered by escape key, close button or mouse click outside the dialog  */
  setClosed(): void
  /** element id that should take focus when closing modal, normally the button which opened it */
  returnFocusId: string
  /** classname for applying custom styles */
  className?: string
  /** header content */
  headerContent: React.ReactNode
  /** main content */
  children?: React.ReactNode
}

/** isEventOutsideBoundary: a function that takes a mouse click event and DOMRect, then returns true if the click x and y is deemed outside the dom rectangle points - all relative to view port.
 @param { MouseEvent }  event - a mouse click event
 @param { DOMRect } boundaryRect - DOMRect obtained from calling .getBoundingClientRect() on a element in the dom
 */
export const isEventOutsideBoundary = (event: React.MouseEvent, boundaryRect: DOMRect): boolean => {
  return (
    boundaryRect?.left > event.clientX ||
    boundaryRect?.right < event.clientX ||
    boundaryRect?.top > event.clientY ||
    boundaryRect?.bottom < event.clientY
  )
}

/** Modal: Renders a dialog when isOpen = true, displaying a close button and the header and children as content.
 * On opening it takes focus and hides any content outside the viewport to prevent scrolling
 * When escape key or close button are pressed, or mouse is clicked outside the box it calls setClosed and un-hides overflow content to enable scrolling
 * */
const Modal: React.FC<ModalProps> = ({
  children,
  className,
  headerContent,
  isOpen,
  setClosed,
  returnFocusId,
  ...rest
}: ModalProps) => {
  const modalClassNames = getClassNames({
    defaultClasses: [modalStyles.modal],
    className: className,
    conditionalClasses: {
      [modalStyles.isOpen]: isOpen,
    },
  })
  const [modalBoundaries, setModalBoundaries] = useState<DOMRect>()
  const ESC_KEY = 'Escape'
  const TAB_KEY = 'Tab'
  const closeButton = useRef<HTMLButtonElement>(null) // to set focus when tabbing off the page
  const modalDiv = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && modalDiv.current) {
      modalDiv.current.focus() // On opening set focus on modal
      setModalBoundaries(modalDiv.current.getBoundingClientRect()) // Fetch modal x/y boundaries
      modalDiv.current.addEventListener(
        'transitionend',
        () => modalDiv.current?.focus() // Listen for css transition caused by focus leaving dialog and send focus back to modal
      )
    }
  }, [isOpen])

  const handleClose = (): void => {
    document.body.style.overflow = 'visible' // Enable scrolling on the page again
    setClosed() // CallBack for when close triggered; parent controls "isOpen" state.
    const returnFocusTo = document.getElementById(returnFocusId) // Get element who's Id was passed to return focus
    returnFocusTo?.focus() // Set focus back to element (button) that lost focus to modal
  }

  const handleModalKeyDown = (e: React.KeyboardEvent): void => {
    // Close when escape key pressed
    if (e.key === ESC_KEY) {
      handleClose()
    }
  }

  const handleCloseButtonKeyDown = (e: React.KeyboardEvent): void => {
    // Set focus on modal if tabbing while focused on close button
    if (e.key === TAB_KEY) {
      e.preventDefault()
      modalDiv.current?.focus()
    }
  }

  const handleMouseDown = (e: React.MouseEvent): void => {
    if (modalBoundaries && self.isEventOutsideBoundary(e, modalBoundaries)) handleClose()
  }

  // Do not render anything if closed
  if (!isOpen) return null
  else {
    document.body.style.overflow = 'hidden' // Prevent scrolling the page
    return (
      <Card
        className={modalClassNames}
        role='dialog'
        aria-labelledby='modal-description'
        aria-modal='true'
        onMouseDown={(e: React.MouseEvent): void => handleMouseDown(e)}
        onKeyDown={handleModalKeyDown}
        tabIndex={0}
        ref={modalDiv}
        {...rest}
      >
        <div className={modalStyles.header}>{headerContent}</div>
        {children}
        <IconButton
          buttonClassName={modalStyles.closeButton}
          icon='times'
          label='close modal'
          onClick={handleClose}
          onKeyDown={handleCloseButtonKeyDown}
          ref={closeButton}
        />
        <div className='visually-hidden' id='modal-description'>
          This dialog window is overlaying the page content. The last element is the close button
          which will take you back where you were before.
        </div>
      </Card>
    )
  }
}

export default Modal
