import Card from './Card'
import renderer from 'react-test-renderer'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import * as React from 'react'

describe('Card', () => {
  it('has not changed the JSX layout of the page from previous snapshot - isPadded=true', () => {
    const tree = renderer.create(<Card isPadded />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('has not changed the JSX layout of the page from previous snapshot - isPadded=false', () => {
    const tree = renderer.create(<Card />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders the page DOM that is accessible', async () => {
    const { container } = render(<Card isPadded>Some text</Card>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
