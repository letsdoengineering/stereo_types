import * as React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import DataListItemValue from './DataListItemValue'
import renderer from 'react-test-renderer'
import { axe } from 'jest-axe'

describe('DataListItemValue', () => {
  it('renders li', async () => {
    render(<DataListItemValue>a value</DataListItemValue>)
    const list = screen.getByText('a value')

    await waitFor(() => expect(list.nodeName).toBe('DD'))
  })

  it('has not changed the JSX layout of the page from previous snapshot', () => {
    const tree = renderer.create(<DataListItemValue>a value</DataListItemValue>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders the page DOM that is accessible', async () => {
    const { container } = render(<DataListItemValue>a value</DataListItemValue>)
    /** dLitem rule ignored as this component on its own does not sit inside a <dl> */
    const results = await axe(container, {
      rules: {
        dlitem: { enabled: false },
      },
    })
    expect(results).toHaveNoViolations()
  })
})
