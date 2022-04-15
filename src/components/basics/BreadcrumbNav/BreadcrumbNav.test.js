import Breadcrumb from './BreadcrumbNav'
import renderer from 'react-test-renderer'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import * as React from 'react'

describe('BreadcrumbNav', () => {
    const urlList = [
        { label: 'home', url: '/' },
        { label: 'page1', url: '/page1/' },
        { label: 'current location' },
    ]
    it('has not changed the JSX layout of the page from previous snapshot', () => {
        const tree = renderer.create(<Breadcrumb urlList={urlList} />).toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('renders the page DOM that is accessible', async () => {
        const { container } = render(<Breadcrumb urlList={urlList} />)
        const results = await axe(container)

        expect(results).toHaveNoViolations()
    })
})
