import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import GridColumn from './GridColumn'
import renderer from 'react-test-renderer'
import { axe } from 'jest-axe'

describe('GridColumn', () => {
    describe('dynamic classes', () => {
        it('renders a grid column with sizeAuto class when size not specified', async () => {
            render(<GridColumn className={'my-random-class'}>Some column</GridColumn>)
            const gridColumn = await screen.getByText('Some column')

            await waitFor(() => {
                expect(gridColumn).toHaveClass('gridColumn sizeAuto my-random-class')
                expect(gridColumn).not.toHaveClass('size1 size2 size3')
            })
        })

        it("renders a grid column with an 'is-n' class where n is only the integer specified in the size prop", async () => {
            render(
                <GridColumn className={'my-random-class'} size='1'>
                    Some column
                </GridColumn>
            )
            const gridColumn = await screen.getByText('Some column')

            await waitFor(() => {
                expect(gridColumn).toHaveClass('gridColumn size1 my-random-class')
                expect(gridColumn).not.toHaveClass('size2 size3 size4')
            })
        })
    })

    it('has not changed the JSX layout of the page from previous snapshot', () => {
        const tree = renderer.create(<GridColumn>Some column</GridColumn>).toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('renders the page DOM that is accessible', async () => {
        const { container } = render(<GridColumn>Some column</GridColumn>)
        const results = await axe(container)

        expect(results).toHaveNoViolations()
    })
})
