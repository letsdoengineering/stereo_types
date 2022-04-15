import * as React from 'react'
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { axe } from 'jest-axe'
import TabButton from './TabButton'

describe('TabButton', () => {
    it('has not changed the JSX layout of the page from previous snapshot', () => {
        const tree = renderer.create(<TabButton buttonText='some button' />).toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('renders the page DOM that is accessible', async () => {
        const { container } = render(<TabButton>some text</TabButton>)
        const results = await axe(container)

        expect(results).toHaveNoViolations()
    })
})
