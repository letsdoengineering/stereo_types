import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import renderer from 'react-test-renderer'
import { axe } from 'jest-axe'

import ToggleSwitch from './ToggleSwitch'

describe('ToggleSwitch', () => {
    it('should call onChange when clicked', () => {
        const onChange = jest.fn()
        render(<ToggleSwitch isChecked={false} onChange={onChange} label={'screen reader label'} />)
        const toggle = screen.getByLabelText('screen reader label')
        userEvent.click(toggle)
        expect(onChange).toHaveBeenCalled()
    })

    it('should render correctly', () => {
        const onChange = jest.fn()
        const tree = renderer
            .create(
                <ToggleSwitch isChecked={true} onChange={onChange} label={'screen reader label'} />
            )
            .toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('renders the page DOM that is accessible', async () => {
        const onChange = jest.fn()
        const { container } = render(
            <ToggleSwitch isChecked={false} onChange={onChange} label={'screen reader label'} />
        )
        const results = await axe(container)

        expect(results).toHaveNoViolations()
    })
})
