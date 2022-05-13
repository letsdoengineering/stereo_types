import * as React from 'react'
import renderer from 'react-test-renderer'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'

import * as allModal from './Modal'
const { default: Modal } = allModal

describe('Modal', () => {
    afterEach(() => {
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })
    it('calls setClosed when close button is clicked', () => {
        const mockSetClosed = jest.fn()
        render(
            <Modal
                isOpen={true}
                returnFocusId={'a unique id'}
                setClosed={mockSetClosed}
                headerContent={<h2>A modal box</h2>}
            >
                <p>content</p>
            </Modal>
        )
        const closeButton = screen.getByText('close modal')
        userEvent.click(closeButton)
        expect(mockSetClosed).toHaveBeenCalled()
    })

    it('calls setClosed when escape key is pressed', () => {
        const mockSetClosed = jest.fn()
        render(
            <Modal
                isOpen={true}
                returnFocusId='a-unique-id'
                setClosed={mockSetClosed}
                headerContent={<h2>A modal box</h2>}
            >
                <p>content</p>
            </Modal>
        )
        userEvent.type(screen.getByText('A modal box'), '{esc}')
        expect(mockSetClosed).toHaveBeenCalled()
    })

    it('calls isEventOutsideBoundary when mouse is clicked, and if TRUE is returned it also calls setClosed call back', () => {
        const mockEventSpy = jest
            .spyOn(allModal, 'isEventOutsideBoundary')
            .mockReturnValue(true)

        const mockSetClosed = jest.fn()
        render(
            <div>
                <Modal
                    isOpen={true}
                    returnFocusId='a-unique-id'
                    setClosed={mockSetClosed}
                    headerContent={<h2>A modal box</h2>}
                >
                    <p>content</p>
                </Modal>
            </div>
        )

        userEvent.click(screen.getByText('content'))
        expect(mockEventSpy).toHaveBeenCalled()

        // should also call setClosed since mock return value of isEventOutsideBoundary = true
        expect(mockSetClosed).toHaveBeenCalled()
    })

    it('calls isEventOutsideBoundary when mouse is clicked, and if FALSE is returned it does not call setClosed call back', () => {
        const mockEventSpy = jest
            .spyOn(allModal, 'isEventOutsideBoundary')
            .mockReturnValue(false)

        const mockSetClosed = jest.fn()
        render(
            <div>
                <Modal
                    isOpen={true}
                    returnFocusId='a-unique-id'
                    setClosed={mockSetClosed}
                    headerContent={<h2>A modal box</h2>}
                >
                    <p>content</p>
                </Modal>
            </div>
        )

        userEvent.click(screen.getByText('content'))
        expect(mockEventSpy).toHaveBeenCalled()

        // should not call setClosed since mock return value of isEventOutsideBoundary = false
        expect(mockSetClosed).not.toHaveBeenCalled()
    })

    it('focus is set to modal when opened', () => {
        const mockSetClosed = jest.fn()
        render(
            <div>
                <button>outside before</button>
                <Modal
                    isOpen={true}
                    returnFocusId='a-unique-id'
                    setClosed={mockSetClosed}
                    headerContent={<h2>A modal box</h2>}
                >
                    <p>content</p>
                </Modal>
                <button>outside after</button>
            </div>
        )
        const modal = screen.getByRole('dialog')
        expect(modal).toHaveFocus()
    })

    it('when close button has focus, pressing tab key redirects focus back to the modal', () => {
        const mockSetClosed = jest.fn()
        render(
            <div>
                <button>outside before</button>
                <Modal
                    isOpen={true}
                    returnFocusId='a-unique-id'
                    setClosed={mockSetClosed}
                    headerContent={<h2>A modal box</h2>}
                >
                    <p>content</p>
                </Modal>
                <button>outside after</button>
            </div>
        )
        const closeButton = screen.getByText('close modal').closest('button')
        closeButton.focus()
        expect(closeButton).toHaveFocus()

        userEvent.tab()
        const modal = screen.getByRole('dialog')
        expect(modal).toHaveFocus()
    })

    it('when close button has focus, pressing keys other than tab key does not redirect focus back to the modal', () => {
        const mockSetClosed = jest.fn()
        render(
            <div>
                <button>outside before</button>
                <Modal
                    isOpen={true}
                    returnFocusId='a-unique-id'
                    setClosed={mockSetClosed}
                    headerContent={<h2>A modal box</h2>}
                >
                    <p>content</p>
                </Modal>
                <button>outside after</button>
            </div>
        )
        const closeButton = screen.getByText('close modal').closest('button')
        closeButton.focus()
        expect(closeButton).toHaveFocus()

        userEvent.type(closeButton, 'p')
        const modal = screen.getByRole('dialog')
        expect(modal).not.toHaveFocus()
    })

    it('has event listener css transition (caused by not:focusWithin) which will redirect focus back to the modal if it leaves', () => {
        const mockSetClosed = jest.fn()
        render(
            <div>
                <button>outside before</button>
                <Modal
                    isOpen={true}
                    returnFocusId='a-unique-id'
                    setClosed={mockSetClosed}
                    headerContent={<h2>A modal box</h2>}
                >
                    <p>content</p>
                </Modal>
                <button>outside after</button>
            </div>
        )
        const modal = screen.getByRole('dialog')
        expect(modal).toHaveFocus()

        const outsideModalButton = screen.getByText('outside after')
        outsideModalButton.focus()
        expect(outsideModalButton).toHaveFocus()

        let event = document.createEvent('Event')
        event.initEvent('transitionend', true, true)
        modal.dispatchEvent(event)
        expect(modal).toHaveFocus()
    })

    it('renders nothing when isOpen = false', () => {
        const mockSetClosed = jest.fn()
        render(
            <Modal
                isOpen={false}
                returnFocusId='a-unique-id'
                setClosed={mockSetClosed}
                headerContent={<h2>A modal box</h2>}
            >
                <p>content</p>
            </Modal>
        )
        const closeButton = screen.queryByText('close modal')
        expect(closeButton).not.toBeInTheDocument()
    })

    it('has not changed the JSX layout of the page from previous snapshot', () => {
        const mockSetClosed = jest.fn()
        const tree = renderer
            .create(
                <Modal
                    isOpen={true}
                    returnFocusId='a-unique-id'
                    setClosed={mockSetClosed}
                    headerContent={<h2>A modal box</h2>}
                >
                    <p>content</p>
                </Modal>
            )
            .toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('has not changed the JSX layout of the page from previous snapshot - closed', () => {
        const mockSetClosed = jest.fn()
        const tree = renderer
            .create(
                <Modal
                    isOpen={false}
                    returnFocusId='a-unique-id'
                    setClosed={mockSetClosed}
                    headerContent={<h2>A modal box</h2>}
                >
                    <p>content</p>
                </Modal>
            )
            .toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('renders the page DOM that is accessible', async () => {
        const mockSetClosed = jest.fn()
        const { container } = render(
            <Modal
                returnFocusId='a-unique-id'
                isOpen={true}
                setClosed={mockSetClosed}
                headerContent={<h2>A modal box</h2>}
            >
                <p>content</p>
            </Modal>
        )
        const results = await axe(container)

        expect(results).toHaveNoViolations()
    })
})

describe('isEventOutsideBoundary', () => {
    it('returns false when event coordinates are within the rectangle boundaries', () => {
        const mockMouseEvent = { clientX: 15, clientY: 15 }
        const mockDOMRect = { left: 10, right: 20, top: 10, bottom: 20 }
        expect(
            allModal.isEventOutsideBoundary(mockMouseEvent, mockDOMRect)
        ).toEqual(false)
    })

    it('returns true when event coordinates are within the rectangle boundaries', () => {
        const mockMouseEvent = { clientX: 1, clientY: 1 }
        const mockDOMRect = { left: 10, right: 20, top: 10, bottom: 20 }
        expect(
            allModal.isEventOutsideBoundary(mockMouseEvent, mockDOMRect)
        ).toEqual(true)
    })
})
