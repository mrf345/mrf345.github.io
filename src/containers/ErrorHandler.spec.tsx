import React from 'react'
import { render } from '@testing-library/react'

import ErrorHandler from './ErrorHandler'


describe("Testing ErrorHandler container", () => {
    const FalsyComponent = (props:any) => {
        const err = new Error('Fails to render!')
        err.stack = ''
        throw err

        return <h1>Should Fail!</h1>
    }

    test('Sanity check ErrorHandler contents', () => {
        const component = render(
            <ErrorHandler>
                <FalsyComponent />
            </ErrorHandler>
        )

        expect(component).toMatchSnapshot()
    })
})
