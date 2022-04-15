import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import List from './List'
import renderer from 'react-test-renderer'
import { axe } from 'jest-axe'

describe('List', () => {
    describe('ordered prop', () => {
        it('renders ul type list by default', async () => {
            render(<List>a list</List>)
            const list = screen.getByText('a list')

            await waitFor(() => expect(list.nodeName).toBe('UL'))
        })

        it('renders ol type list if isOrdered is set to true', async () => {
            render(<List isOrdered>a list</List>)
            const text = screen.getByText('a list')

            await waitFor(() => expect(text.nodeName).toBe('OL'))
        })
    })

    it('has not changed the JSX layout of the page from previous snapshot', () => {
        const tree = renderer.create(<List />).toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('renders a list that is accessible', async () => {
        const { container } = render(<List />)
        const results = await axe(container)

        expect(results).toHaveNoViolations()
    })
})
