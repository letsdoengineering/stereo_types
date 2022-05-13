import * as React from 'react'
import renderer from 'react-test-renderer'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'

import FieldError from './FieldError'

describe('FieldError', () => {
    it('displays error when showError is true', () => {
        render(
            <FieldError
                showError={true}
                errorMessage={
                    'You cannot travel to Norway, brown cheese is not a cheese'
                }
            >
                <p>I am a Child</p>
            </FieldError>
        )

        const errorMessage = screen.getByText(
            'You cannot travel to Norway, brown cheese is not a cheese'
        )
        expect(errorMessage).toBeInTheDocument()
    })

    it('only renders children when showError is false', () => {
        render(
            <FieldError
                showError={false}
                errorMessage={
                    'You cannot travel to Norway, brown cheese is not a cheese'
                }
            >
                <p>I am a Child</p>
            </FieldError>
        )

        const errorMessage = screen.queryByText(
            'You cannot travel to Norway, brown cheese is not a cheese'
        )
        expect(errorMessage).not.toBeInTheDocument()
    })

    it('has not changed the JSX layout of the page from previous snapshot', () => {
        const tree = renderer
            .create(
                <FieldError
                    showError={true}
                    errorMessage={'I am a error message'}
                    uniqueID='iamsuprisinglyunique'
                >
                    I am a Child Component
                </FieldError>
            )
            .toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('renders the page DOM that is accessible', async () => {
        const { container } = render(
            <FieldError showError={true} errorMessage={'I am a error message'}>
                <label>
                    label for input
                    <input type='text' />
                </label>
            </FieldError>
        )
        const results = await axe(container)

        expect(results).toHaveNoViolations()
    })
})
