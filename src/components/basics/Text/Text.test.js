import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Text from './Text'
import renderer from 'react-test-renderer'
import { axe } from 'jest-axe'

describe('Text', () => {
  describe('dynamic tags', () => {
    it('renders text in a span tag by default', async () => {
      render(<Text>Some text</Text>)
      const text = screen.getByText('Some text')

      await waitFor(() => expect(text.nodeName).toBe('SPAN'))
    })

    it("renders text in a p tag if tagName='p'", async () => {
      render(<Text tagName='p'>Some text</Text>)
      const text = screen.getByText('Some text')

      await waitFor(() => expect(text.nodeName).toBe('P'))
    })
  })

  it('has not changed the JSX layout of the page from previous snapshot', () => {
    const tree = renderer.create(<Text />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders the page DOM that is accessible', async () => {
    const { container } = render(<Text tagName='p'>Some text</Text>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
