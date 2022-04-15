import * as React from 'react'
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { axe } from 'jest-axe'
import Button from './Button'

describe('Button', () => {
    it('has not changed the JSX layout of the page from previous snapshot', () => {
        const tree = renderer.create(<Button buttonText='some button' />).toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('renders the page DOM that is accessible', async () => {
        const { container } = render(<Button buttonText='some button' />)
        const results = await axe(container)

        expect(results).toHaveNoViolations()
    })
})
