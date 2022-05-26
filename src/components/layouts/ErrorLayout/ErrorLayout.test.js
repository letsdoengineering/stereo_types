import * as React from 'react'
import ErrorLayout from './ErrorLayout'
import renderer from 'react-test-renderer'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

const mockContent = {
  footer: 'some footer',
}

describe('ErrorLayout', () => {
  it('has not changed the JSX layout of the page from previous snapshot', () => {
    const tree = renderer.create(<ErrorLayout content={mockContent} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders the page DOM that is accessible', async () => {
    const { container } = render(<ErrorLayout content={mockContent} />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
