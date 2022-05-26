import * as React from 'react'
import { render } from '@testing-library/react'
import AccordionItem from './AccordionItem'
import renderer from 'react-test-renderer'
import { axe } from 'jest-axe'

describe('AccordionItem', () => {
  it('has not changed the JSX layout of the page from previous snapshot', () => {
    const tree = renderer.create(<AccordionItem />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders the page DOM that is accessible', async () => {
    const { container } = render(<AccordionItem>Some text</AccordionItem>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
