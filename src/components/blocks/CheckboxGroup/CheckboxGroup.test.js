import React from 'react'
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { axe } from 'jest-axe'
import Checkbox from '../../basics/INPUTS/Checkbox/Checkbox'
import CheckboxGroup from './CheckboxGroup'

describe('CheckboxGroup', () => {
    const mockOnChange = jest.fn()
    const options = ['Cake', 'Cheese', 'Potatoes']

    const checkboxes = options.map((option, i) => (
        <Checkbox
            key={`option-${option}-${i}`}
            value={option}
            isChecked={true}
            onChange={() => mockOnChange()}
        />
    ))

    it('should render as default expected', () => {
        const tree = renderer
            .create(
                <CheckboxGroup groupLabel={'A group of checkboxes'}>{checkboxes}</CheckboxGroup>
            )
            .toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('should render as expected with showLabel=true', () => {
        const tree = renderer
            .create(
                <CheckboxGroup groupLabel={'A group of checkboxes'} showLabel>
                    {checkboxes}
                </CheckboxGroup>
            )
            .toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('renders the page DOM that is accessible', async () => {
        const { container } = render(
            <CheckboxGroup groupLabel={'A group of checkboxes'}>{checkboxes}</CheckboxGroup>
        )
        const results = await axe(container)

        expect(results).toHaveNoViolations()
    })
})
