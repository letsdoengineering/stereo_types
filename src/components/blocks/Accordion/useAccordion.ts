import React, { useRef, useState } from 'react'
import * as self from './useAccordion'

type UseAccordion = {
  /** indicates whether the accordion should be open or not */
  isOpen: boolean
  /** used to set isOpen state */
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  /** value of the scrollHeight of the div containing the accordion's content
   *  e.g. '10px' used to expand the accordion */
  scrollHeight: string
  /** used to set the scrollHeight state */
  setScrollHeight: React.Dispatch<React.SetStateAction<string>>
  /** a React ref for use with the expandable/collapsable element in the accordion */
  ref: React.RefObject<HTMLDivElement>
  /** sets isOpen state and scrollHeight */
  toggleAccordion(): void
}

/** getScrollHeight: returns a string indicating scrollHeight of an element based on whether it is active or not
 * @param {boolean} isActive - indicates whether to return 0px or ${scrollHeight}px
 * @param {number} scrollHeight - the scrollHeight of an element - e.g. as taken from an element's ref */
export const getScrollHeight = (isActive: boolean, scrollHeight: number | undefined): string => {
  return isActive ? '0px' : `${scrollHeight}px`
}

/** useAccordion: custom hook returns an object containing state for use with
 * accordion components and a toggleAccordion function
 * @returns { object } UseAccordion */
export default (): UseAccordion => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrollHeight, setScrollHeight] = useState('0px')
  const ref = useRef<HTMLDivElement>(null)

  const toggleAccordion = (): void => {
    setIsOpen(!isOpen)
    setScrollHeight(self.getScrollHeight(isOpen, ref?.current?.scrollHeight))
  }

  return {
    isOpen,
    setIsOpen,
    scrollHeight,
    setScrollHeight,
    ref,
    toggleAccordion,
  }
}
