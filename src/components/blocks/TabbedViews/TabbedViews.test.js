import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import renderer from 'react-test-renderer'
import { axe } from 'jest-axe'
import TabbedViews from './TabbedViews'

const testViews = {
    'view 1': <div>some content for default view</div>,
    'view 2': <div>some content for secondary view</div>,
}

describe('TabbedViews', () => {
    it('should present the user with tabbable views', () => {
        render(<TabbedViews views={testViews} />)

        const tab1 = screen.getByText('view 1')
        const tab2 = screen.getByText('view 2')

        // initial render - should default to view 1, with no others available
        expect(screen.queryByText('some content for default view')).toBeInTheDocument()
        expect(screen.queryByText('some content for secondary view')).not.toBeInTheDocument()

        // click tab for view 2 - should display view two and no others
        userEvent.click(tab2)

        expect(screen.queryByText('some content for secondary view')).toBeInTheDocument()
        expect(screen.queryByText('some content for default view')).not.toBeInTheDocument()

        // click tab for view 1 to return to that view - should not display any other view
        userEvent.click(tab1)

        expect(screen.queryByText('some content for default view')).toBeInTheDocument()
        expect(screen.queryByText('some content for secondary view')).not.toBeInTheDocument()
    })

    it('has not changed the JSX layout of the page from previous snapshot', () => {
        const tree = renderer.create(<TabbedViews views={testViews} />).toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('renders the page DOM that is accessible', async () => {
        const { container } = render(<TabbedViews views={testViews} />)
        const results = await axe(container)

        expect(results).toHaveNoViolations()
    })
})
