import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import ListItem from './ListItem'
import renderer from 'react-test-renderer'
import { axe } from 'jest-axe'

describe('ListItem', () => {
    it('renders li', async () => {
        render(<ListItem>a listitem</ListItem>)
        const list = screen.getByText('a listitem')

        await waitFor(() => expect(list.nodeName).toBe('LI'))
    })

    it('has not changed the JSX layout of the page from previous snapshot', () => {
        const tree = renderer.create(<ListItem />).toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('renders the page DOM that is accessible', async () => {
        const { container } = render(
            <ul>
                <ListItem>Some text</ListItem>
            </ul>
        )
        const results = await axe(container)

        expect(results).toHaveNoViolations()
    })
})
