import React from 'react'
import Checkbox from './Checkbox'
import renderer from 'react-test-renderer'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { axe } from 'jest-axe'

describe('Checkbox', () => {
  it('should call onChange when clicked', () => {
    const onChange = jest.fn()
    render(<Checkbox isChecked={true} onChange={onChange} value={'text shown as label'} />)
    const checkbox = screen.getByLabelText('text shown as label')
    userEvent.click(checkbox)
    expect(onChange).toHaveBeenCalled()
  })

  it('should not call onChange when clicked if available is false', () => {
    const onChange = jest.fn()
    render(
      <Checkbox
        isChecked={true}
        available={false}
        onChange={onChange}
        value={'text shown as label'}
      />
    )
    const checkbox = screen.getByLabelText('text shown as label')
    userEvent.click(checkbox)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('should render correctly', () => {
    const onChange = jest.fn()
    const tree = renderer
      .create(<Checkbox isChecked={false} onChange={onChange} value={'text shown as label'} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders the page DOM that is accessible', async () => {
    const onChange = jest.fn()
    const { container } = render(
      <Checkbox isChecked={true} onChange={onChange} value={'text shown as label'} />
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
