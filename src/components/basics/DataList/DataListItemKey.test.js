import * as React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import DataListItemKey from './DataListItemKey'
import renderer from 'react-test-renderer'
import { axe } from 'jest-axe'

describe('DataListItemKey', () => {
  it('renders li', async () => {
    render(<DataListItemKey>a key</DataListItemKey>)
    const list = screen.getByText('a key')

    await waitFor(() => expect(list.nodeName).toBe('DT'))
  })

  it('has not changed the JSX layout of the page from previous snapshot', () => {
    const tree = renderer.create(<DataListItemKey>a key</DataListItemKey>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders the page DOM that is accessible', async () => {
    const { container } = render(<DataListItemKey>a key</DataListItemKey>)
    /** dLitem rule ignored as this component on its own does not sit inside a <dl> */
    const results = await axe(container, {
      rules: {
        dlitem: { enabled: false },
      },
    })
    expect(results).toHaveNoViolations()
  })
})
