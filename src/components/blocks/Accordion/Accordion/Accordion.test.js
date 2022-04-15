import * as AccordionComponent from './Accordion'
import * as useAccordion from '../useAccordion'
import renderer from 'react-test-renderer'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import * as React from 'react'
const Accordion = AccordionComponent.default

describe('Accordion', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    const AccordionProps = {
        title: 'Some Accordion',
        titleSize: 'S',
        baseId: 'accordion',
    }

    it('should adjust the scrollheight of the content container when user clicks the accordion button', () => {
        const getScrollHeightSpy = jest.spyOn(useAccordion, 'getScrollHeight')
        render(<Accordion {...AccordionProps}>Some text</Accordion>)

        userEvent.click(screen.getByText('Some Accordion'))
        expect(getScrollHeightSpy).toHaveBeenCalledTimes(1)
    })

    it('should toggle to open if startOpen is set to true', () => {
        const getScrollHeightSpy = jest.spyOn(useAccordion, 'getScrollHeight')
        render(
            <Accordion startOpen {...AccordionProps}>
                Some text
            </Accordion>
        )

        expect(getScrollHeightSpy).toHaveBeenCalledTimes(1)
    })

    it('has not changed the JSX layout of the page from previous snapshot - default', () => {
        const tree = renderer.create(<Accordion {...AccordionProps} />).toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('has not changed the JSX layout of the page from previous snapshot - iconRight = true', () => {
        const tree = renderer.create(<Accordion iconRight {...AccordionProps} />).toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('renders the page DOM that is accessible', async () => {
        const { container } = render(<Accordion {...AccordionProps}>Some text</Accordion>)
        const results = await axe(container)

        expect(results).toHaveNoViolations()
    })
})
