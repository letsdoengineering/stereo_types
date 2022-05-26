import * as React from 'react'
import GenericLayout from './GenericLayout'
import renderer from 'react-test-renderer'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

const mockContent = {
  footer: 'some footer',
}

describe('GenericLayout', () => {
  it('has not changed the JSX layout of the page from previous snapshot', () => {
    const tree = renderer.create(<GenericLayout content={mockContent} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders the page DOM that is accessible', async () => {
    const { container } = render(<GenericLayout content={mockContent} />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
