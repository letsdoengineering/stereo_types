import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import renderer from 'react-test-renderer'

import { axe } from 'jest-axe'
import Autosuggest from './Autosuggest'

let suggestionData = [{ name: 'one' }, { name: 'two' }, { name: 'three' }]
let getInputValue = () => 'a'

const setSuggestionData = () => null
const setInputValue = jest.fn()
const getSuggestionValue = (suggestion) => suggestion.name
const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>
const fetchSuggestions = () => null

const MockCustomInput = React.forwardRef((props, ref) => {
  return (
    <>
      <label htmlFor='destination-auto-suggest-input'>the label</label>
      <input id='destination-auto-suggest-input' {...props} ref={ref} />
    </>
  )
})
MockCustomInput.displayName = 'MockCustomInput'

describe('Autosuggest', () => {
  it('renders an input+label with NO suggestion list initially, when there is no suggestionData', async () => {
    suggestionData = []
    getInputValue = () => null

    render(
      <Autosuggest
        renderInputComponent={(props) => <MockCustomInput {...props} />}
        getSuggestionValue={getSuggestionValue}
        getInputValue={getInputValue}
        name={'destination'}
        renderSuggestion={renderSuggestion}
        setInputValue={setInputValue}
        setSuggestionsData={setSuggestionData}
        suggestionsData={suggestionData}
        suggestionsFetchRequest={fetchSuggestions}
      />
    )

    const destinationField = screen.getByLabelText('the label')
    const suggestionList = screen.queryByRole('listbox')

    expect(destinationField).toBeInTheDocument()
    expect(suggestionList).toBeNull()
  })

  it('renders a suggestions when input has value and suggestions have data', async () => {
    suggestionData = [{ name: 'option one' }, { name: 'option two' }]
    getInputValue = () => 'on'

    render(
      <Autosuggest
        renderInputComponent={(props) => <MockCustomInput {...props} />}
        getSuggestionValue={getSuggestionValue}
        getInputValue={getInputValue}
        name={'destination'}
        renderSuggestion={renderSuggestion}
        setInputValue={setInputValue}
        setSuggestionsData={setSuggestionData}
        suggestionsData={suggestionData}
        suggestionsFetchRequest={fetchSuggestions}
      />
    )

    const destinationField = screen.getByLabelText('the label')
    await userEvent.type(destinationField, 'e', {
      delay: 1,
    })

    expect(setInputValue).toBeCalledWith('destination', 'one')

    const suggestion1 = screen.getByText('option one')
    const suggestion2 = screen.getByText('option two')

    expect(destinationField).toBeInTheDocument()
    expect(suggestion1).toBeInTheDocument()
    expect(suggestion2).toBeInTheDocument()
  })

  it('can click a suggestion to set input value', async () => {
    suggestionData = [{ name: 'option one' }, { name: 'option two' }]
    getInputValue = () => 'on'

    render(
      <Autosuggest
        renderInputComponent={(props) => <MockCustomInput {...props} />}
        getSuggestionValue={getSuggestionValue}
        getInputValue={getInputValue}
        name={'destination'}
        renderSuggestion={renderSuggestion}
        setInputValue={setInputValue}
        setSuggestionsData={setSuggestionData}
        suggestionsData={suggestionData}
        suggestionsFetchRequest={fetchSuggestions}
      />
    )

    const destinationField = screen.getByLabelText('the label')
    await userEvent.type(destinationField, 'e', {
      delay: 1,
    })
    expect(setInputValue).toBeCalledWith('destination', 'one')

    const suggestion1 = screen.getByText('option one')

    await waitFor(() => userEvent.click(suggestion1))
    expect(setInputValue).toBeCalledWith('destination', 'option one')
  })

  it('has not changed the JSX layout of the page from previous snapshot', () => {
    const tree = renderer
      .create(
        <Autosuggest
          renderInputComponent={(props) => <MockCustomInput {...props} />}
          getSuggestionValue={getSuggestionValue}
          getInputValue={getInputValue}
          name={'destination'}
          renderSuggestion={renderSuggestion}
          setInputValue={setInputValue}
          setSuggestionsData={setSuggestionData}
          suggestionsData={suggestionData}
          suggestionsFetchRequest={fetchSuggestions}
        />
      )
      .toJSON()
    // need to get list showing before snapshot
    expect(tree).toMatchSnapshot()
  })

  it('renders the page DOM that is accessible', async () => {
    const { container } = render(
      <Autosuggest
        renderInputComponent={(props) => <MockCustomInput {...props} />}
        getSuggestionValue={getSuggestionValue}
        getInputValue={getInputValue}
        name={'destination'}
        renderSuggestion={renderSuggestion}
        setInputValue={setInputValue}
        setSuggestionsData={setSuggestionData}
        suggestionsData={suggestionData}
        suggestionsFetchRequest={fetchSuggestions}
      />
    )
    const destinationField = screen.getByLabelText('the label')
    userEvent.type(destinationField, 'a')
    /** aria-input-field-name rule ignored as this component on its own does not have a label
     * and should be labelled by another component */
    const results = await axe(container, {
      rules: {
        'aria-input-field-name': { enabled: false },
      },
    })
    expect(results).toHaveNoViolations()
  })
})
