import React from 'react'
import LabelledInput from './LabelledInput'
import renderer from 'react-test-renderer'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import TextInput from '../../basics/INPUTS/TextInput/TextInput'
import Icon from '../../basics/Icon/Icon'

describe('LabelledTextInput', () => {
    it('renders labelled input when valid element passed', () => {
        render(
            <LabelledInput id='some-input' label='some label'>
                <TextInput />
            </LabelledInput>
        )

        expect(screen.getByLabelText('some label')).toBeInTheDocument()
    })

    it('passes children through without adding id for the label htmlFor when they are not valid react elements', () => {
        render(
            <LabelledInput id='some-input' label='some label'>
                something that is not a child
            </LabelledInput>
        )

        expect(screen.queryByLabelText('some label')).not.toBeInTheDocument()
    })

    it('has not changed the JSX layout of the page from previous snapshot', () => {
        const tree = renderer
            .create(
                <LabelledInput
                    id='some-input'
                    label='some label'
                    icon={<Icon icon='calendar-day' />}
                >
                    <TextInput />
                </LabelledInput>
            )
            .toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('renders the page DOM that is accessible', async () => {
        const { container } = render(
            <LabelledInput id='some-input' label='some label'>
                <TextInput />
            </LabelledInput>
        )
        const results = await axe(container)

        expect(results).toHaveNoViolations()
    })
})
