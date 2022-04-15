import React from 'react'
import TextInput from './TextInput'
import renderer from 'react-test-renderer'

describe('TextInput', () => {
    it('should render correctly', () => {
        const tree = renderer.create(<TextInput />).toJSON()

        expect(tree).toMatchSnapshot()
    })
})
