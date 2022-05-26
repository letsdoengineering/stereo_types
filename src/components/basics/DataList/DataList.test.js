import * as React from 'react'
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { axe } from 'jest-axe'

import DataList from './DataList'
import DataListItemKey from './DataListItemKey'
import DataListItemValue from './DataListItemValue'

describe('DataList', () => {
  it('has not changed the JSX layout of the page from previous snapshot', () => {
    const tree = renderer
      .create(
        <DataList>
          <DataListItemKey>Name</DataListItemKey>
          <DataListItemValue>Tester123</DataListItemValue>
          <DataListItemKey>Age</DataListItemKey>
          <DataListItemValue>123</DataListItemValue>
        </DataList>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders a list that is accessible', async () => {
    const { container } = render(
      <DataList>
        <DataListItemKey>Name</DataListItemKey>
        <DataListItemValue>Tester123</DataListItemValue>
        <DataListItemKey>Age</DataListItemKey>
        <DataListItemValue>123</DataListItemValue>
      </DataList>
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
