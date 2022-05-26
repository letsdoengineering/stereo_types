import React, { FormEvent } from 'react'
import ReactAutosuggest, {
  BlurEvent,
  ChangeEvent,
  SuggestionsFetchRequestedParams,
  RenderSuggestionsContainerParams,
  AutosuggestProps,
} from 'react-autosuggest'

import * as autoSuggestStyles from './Autosuggest.module.css'

export type AutoSuggestProps = {
  /** callback used to get suggestion value from list */
  getSuggestionValue(dataItem: any): string
  /** callback used get current value of input */
  getInputValue(key: string): string
  /** name attribute */
  name: string
  /** what react-autosuggest will render when suggestions are available */
  renderSuggestion(dataIem: any): React.ReactElement
  /** callback used to track state of the input value */
  setInputValue(name: string, value: string): void
  /** callback used to manage the suggestions in the autosuggest dropdown */
  setSuggestionsData: React.Dispatch<React.SetStateAction<never[]>>
  /** suggestions data used by renderSuggestion in the autosuggest dropdown */
  suggestionsData: any[]
  /** callback used to fetch suggestions data from an external source */
  suggestionsFetchRequest(value: string): void
  /** callback used to render a custom input */
  renderInputComponent: AutosuggestProps<any, any>['renderInputComponent']
}

const Autosuggest = ({
  getSuggestionValue,
  getInputValue,
  name,
  renderSuggestion,
  setInputValue,
  setSuggestionsData,
  suggestionsData,
  suggestionsFetchRequest,
  renderInputComponent,
}: AutoSuggestProps): JSX.Element => {
  const inputProps = {
    id: `${name}-auto-suggest-input`,
    value: getInputValue(name) || '',
    onChange: (event: FormEvent<HTMLElement>, params: ChangeEvent): void =>
      setInputValue(name, params?.newValue || ''),
    onBlur: (event: FormEvent<HTMLElement>, params: BlurEvent<any> | undefined): void => {
      const suggestion = params?.highlightedSuggestion
      if (suggestion) getSuggestionValue(suggestion)
    },
  }

  const onSuggestionsFetchRequested = (request: SuggestionsFetchRequestedParams): void => {
    const { value } = request // Also has variable 'reason'<string> to see what action caused this function call.
    suggestionsFetchRequest(value) // Calls provided function which should take a substring value to be used to fetch suggestion data.
  }

  const shouldRenderSuggestions = (value: string, reason: string): boolean => {
    if (reason === 'input-focused') return false //  CHECK: do we want to show list when when clicking back into input. Or should leave like this where value need to change first, and/or arrow press up/down.
    return !!value // Do not render list if no value present (if they have deleted the last char)
  }

  const onSuggestionsClearRequested = (): void => {
    // Function called to clear the data fetched for suggestions, occurs on blur and maybe other occasions?
    setSuggestionsData([])
  }

  const renderSuggestionsContainer = ({
    containerProps,
    children,
  }: RenderSuggestionsContainerParams): React.ReactElement => (
    // This is a fix to add aria-hidden when list is empty, else it fails axe accessibility tests.
    <div {...containerProps} role={undefined} aria-hidden={suggestionsData.length === 0}>
      {children}
    </div>
  )

  return (
    <ReactAutosuggest
      shouldRenderSuggestions={shouldRenderSuggestions}
      suggestions={suggestionsData}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      renderSuggestionsContainer={renderSuggestionsContainer}
      highlightFirstSuggestion={true}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      theme={autoSuggestStyles}
      renderInputComponent={renderInputComponent}
    />
  )
}

export default Autosuggest
