import * as React from 'react'
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { axe } from 'jest-axe'
import Link from './Link'

describe('Link', () => {
  it('has not changed the JSX layout of the page from previous snapshot', () => {
    const tree = renderer.create(<Link href=''>some link</Link>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders the page DOM that is accessible', async () => {
    const { container } = render(<Link href=''>some link</Link>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
