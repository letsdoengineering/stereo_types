import * as React from 'react'
import renderer from 'react-test-renderer'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'

import IconButton from './IconButton'

describe('IconButton', () => {
  it('calls onClick when clicked', () => {
    const mockOnClick = jest.fn()
    render(<IconButton icon='times' label='an iconButton' onClick={mockOnClick} />)
    const icon = screen.getByText('an iconButton')
    userEvent.click(icon)
    expect(mockOnClick).toHaveBeenCalled()
  })

  it('has not changed the JSX layout of the page from previous snapshot', () => {
    const mockOnClick = jest.fn()
    const tree = renderer
      .create(<IconButton icon='CALENDAR' label='open calendar' onClick={mockOnClick} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('has not changed the JSX layout of the page from previous snapshot - disabled', () => {
    const mockOnClick = jest.fn()
    const tree = renderer
      .create(<IconButton disabled icon='CALENDAR' label='open calendar' onClick={mockOnClick} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders the page DOM that is accessible', async () => {
    const mockOnClick = jest.fn()
    const { container } = render(
      <IconButton icon='CALENDAR' label='open calendar' onClick={mockOnClick} />
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
