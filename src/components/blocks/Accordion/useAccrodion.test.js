import * as useAccordionHook from './useAccordion'
import { renderHook, act } from '@testing-library/react-hooks'

describe('getScrollHeight', () => {
  it('should return "0px" when first arg is true', () => {
    const result = useAccordionHook.getScrollHeight(true, 20)
    expect(result).toBe('0px')
  })

  it('should return "20px" when first arg is false and second arg is 20', () => {
    const result = useAccordionHook.getScrollHeight(false, 20)
    expect(result).toBe('20px')
  })
})

describe('useAccordion', () => {
  it('should toggle the value of isOpen when toggleAccordion is called', () => {
    const { result } = renderHook(() => useAccordionHook.default())

    //default state
    expect(result.current.isOpen).toBe(false)

    act(() => {
      result.current.toggleAccordion()
    })

    // isOpen state after first toggle
    expect(result.current.isOpen).toBe(true)

    act(() => {
      result.current.toggleAccordion()
    })

    // isOpen state after second toggle
    expect(result.current.isOpen).toBe(false)
  })

  it('should set a new scrollHeight when toggleAccordion is called', () => {
    const getScrollHeightSpy = jest
      .spyOn(useAccordionHook, 'getScrollHeight')
      .mockReturnValue('20px')
    const { result } = renderHook(() => useAccordionHook.default())

    //check default state
    expect(result.current.scrollHeight).toBe('0px')

    act(() => {
      result.current.toggleAccordion()
    })

    // assert that getScrollHeight was called and that the value it returns has been received + applied to state
    expect(getScrollHeightSpy).toHaveBeenCalled()
    expect(result.current.scrollHeight).toBe('20px')
  })
})
