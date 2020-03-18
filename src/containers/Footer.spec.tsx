import React from 'react'
import { render } from '@testing-library/react'

import Footer from './Footer'


describe('Testing Footer container', () => {
    test('Sanity check Footer content', () => {
        const component = render(<Footer />)

        expect(component).toMatchSnapshot()
    })
})
