import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import renderer from 'react-test-renderer'
import { axe } from 'jest-axe'

import ToggleButton from './ToggleButton'

describe('ToggleButton', () => {
    it('should call onChange when clicked', () => {
        const onChange = jest.fn()
        render(<ToggleButton isChecked={false} onChange={onChange} label={'a label'} />)
        const toggle = screen.getByLabelText('a label')
        userEvent.click(toggle)
        expect(onChange).toHaveBeenCalled()
    })

    it('should render correctly', () => {
        const onChange = jest.fn()
        const tree = renderer
            .create(<ToggleButton isChecked={true} onChange={onChange} label={'a label'} />)
            .toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('renders the page DOM that is accessible', async () => {
        const onChange = jest.fn()
        const { container } = render(
            <ToggleButton isChecked={false} onChange={onChange} label={'a label'} />
        )
        const results = await axe(container)

        expect(results).toHaveNoViolations()
    })
})
