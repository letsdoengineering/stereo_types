import renderer from 'react-test-renderer'
import Head from './Head.tsx'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import * as React from 'react'

describe('Head', () => {
    it('has not changed the JSX layout of the page from previous snapshot', () => {
        const tree = renderer.create(<Head>Some header</Head>).toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('renders the page DOM that is accessible', async () => {
        const { container } = render(<Head>Some header</Head>)
        const results = await axe(container)

        expect(results).toHaveNoViolations()
    })
})
