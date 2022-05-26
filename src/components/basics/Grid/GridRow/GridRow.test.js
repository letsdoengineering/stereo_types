import renderer from 'react-test-renderer'
import GridRow from './GridRow'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import * as React from 'react'

describe('GridRow', () => {
  it('has not changed the JSX layout of the page from previous snapshot', () => {
    const tree = renderer.create(<GridRow>some row</GridRow>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders the page DOM that is accessible', async () => {
    const { container } = render(<GridRow>some row</GridRow>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
