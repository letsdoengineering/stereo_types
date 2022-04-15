import renderer from 'react-test-renderer'
import Spacing from './Spacing'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import * as React from 'react'

describe('Spacing', () => {
    it('has not changed the JSX layout of the page from previous snapshot', () => {
        const tree = renderer.create(<Spacing />).toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('renders the page DOM that is accessible', async () => {
        const { container } = render(<Spacing />)
        const results = await axe(container)

        expect(results).toHaveNoViolations()
    })
})
