import * as React from 'react'
import Image from './Image'
import renderer from 'react-test-renderer'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

describe('Image', () => {
    it('has not changed the JSX layout of the page from previous snapshot', () => {
        const tree = renderer
            .create(<Image alt={'Some text'} src={'Some url'} size={'M'} />)
            .toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('renders the page DOM that is accessible', async () => {
        const { container } = render(<Image alt={'Some text'} src={'Some url'} size={'M'} />)
        const results = await axe(container)

        expect(results).toHaveNoViolations()
    })
})
