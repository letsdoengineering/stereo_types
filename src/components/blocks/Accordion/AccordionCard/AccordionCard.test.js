import * as React from 'react'
import { render, screen } from '@testing-library/react'
import AccordionCard from './AccordionCard'
import renderer from 'react-test-renderer'
import { axe } from 'jest-axe'
import * as useAccordion from '../useAccordion'
import userEvent from '@testing-library/user-event'

describe('AccordionCard', () => {
  it('has not changed the JSX layout of the page from previous snapshot', () => {
    const tree = renderer
      .create(
        <AccordionCard headSection={<div>something</div>} innerContent={<div>something</div>} />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should adjust the scrollheight of the content container when user clicks the accordion button', () => {
    const getScrollHeightSpy = jest.spyOn(useAccordion, 'getScrollHeight')
    render(
      <AccordionCard
        baseId='test'
        headSection={<div>some header</div>}
        innerContent={<div>some content</div>}
      />
    )

    userEvent.click(screen.getByText('test-accordion'))
    expect(getScrollHeightSpy).toHaveBeenCalledTimes(1)
  })

  it('renders the page DOM that is accessible', async () => {
    const { container } = render(
      <AccordionCard headSection={<a>something</a>} innerContent={<div>something</div>} />
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
