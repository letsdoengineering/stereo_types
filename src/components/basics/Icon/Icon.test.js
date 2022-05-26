import * as React from 'react'
import renderer from 'react-test-renderer'
import Icon from './Icon'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

describe('Icon', () => {
  it('has not changed the JSX layout of the page from previous snapshot', () => {
    const tree = renderer.create(<Icon icon='CALENDAR' />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders the page DOM that is accessible', async () => {
    const { container } = render(<Icon icon='CALENDAR' />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
