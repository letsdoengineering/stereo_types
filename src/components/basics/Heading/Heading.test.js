import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Heading from './Heading'
import renderer from 'react-test-renderer'
import { axe } from 'jest-axe'

describe('Heading', () => {
  describe('dynamic header levels', () => {
    it('renders a h1 element by default', async () => {
      render(<Heading>Some header</Heading>)
      const header = screen.getByText('Some header')

      await waitFor(() => {
        expect(header).toBeInTheDocument()
        expect(header.nodeName).toBe('H1')
      })
    })

    it('renders a h3 element if level prop is specified as 3', async () => {
      render(<Heading level='3'>Some header</Heading>)
      const header = screen.getByText('Some header')

      await waitFor(() => {
        expect(header).toBeInTheDocument()
        expect(header.nodeName).toBe('H3')
      })
    })
  })

  it('has not changed the JSX layout of the page from previous snapshot', () => {
    const tree = renderer.create(<Heading>Some header</Heading>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders the page DOM that is accessible', async () => {
    const { container } = render(<Heading>Some header</Heading>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
