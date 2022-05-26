import React from 'react'
import renderer from 'react-test-renderer'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import * as self from './SelectInput'

const { default: SelectInput } = self
const getIconSpy = jest.spyOn(self, 'getCaretIcon')

describe('SelectInput', () => {
  const options = [
    { label: 'Any', value: 'any' },
    { label: '1-3', value: '1-3' },
    { label: '3-6', value: '3-6' },
  ]

  it('renders labeled input that shows an initial value when initialValue prop is provided', () => {
    const initialValueProp = 'my initial value'
    render(
      <>
        <label htmlFor={'an id'}>A select input</label>
        <SelectInput
          id={'an id'}
          options={options}
          initialValue={{
            label: initialValueProp,
            value: initialValueProp,
          }}
        />
      </>
    )
    const theLabel = screen.getByLabelText('A select input')
    const selectInput = screen.getByText(initialValueProp)

    expect(theLabel).toBeInTheDocument()
    expect(selectInput).toBeInTheDocument()
  })

  it('renders input that when clicked shows menu list matching the options passed in', () => {
    const onChange = jest.fn()
    render(
      <>
        <label htmlFor={'an id'}>A select input</label>
        <SelectInput id={'an id'} options={options} onChange={onChange} />
      </>
    )
    const selectInput = screen.getByLabelText('A select input')
    expect(selectInput).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false')
    expect(getIconSpy).toHaveBeenCalledWith({ menuOpen: false })

    userEvent.click(screen.getByText('Select option..'))
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true')
    expect(getIconSpy).toHaveBeenCalledWith({ menuOpen: true })
  })

  it('when an option is clicked it calls onOptionChange with the value of clicked option', () => {
    const onChange = jest.fn()
    render(
      <>
        <label htmlFor={'an id'}>A select input</label>
        <SelectInput id={'an id'} options={options} onChange={onChange} />
      </>
    )
    const selectInput = screen.getByLabelText('A select input')
    expect(selectInput).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false')
    expect(getIconSpy).toHaveBeenCalledWith({ menuOpen: false })

    userEvent.click(screen.getByText('Select option..'))
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true')
    expect(getIconSpy).toHaveBeenCalledWith({ menuOpen: true })

    const option1 = screen.getByText(options[0].label)
    userEvent.click(option1)
    userEvent.tab()
    expect(getIconSpy).toHaveBeenCalledWith({ menuOpen: false })
    expect(onChange).toBeCalledWith(options[0])
  })

  it('has not changed the JSX layout of the page from previous snapshot', () => {
    const tree = renderer.create(<SelectInput options={options} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders the page DOM that is accessible', async () => {
    const { container } = render(
      <>
        <label>
          a label for a select input
          <SelectInput options={options} />
        </label>
      </>
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
