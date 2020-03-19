import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import configureStore from 'redux-mock-store'

import Following from './Following'


describe("Testing Following container", () => {
    const mockStore = configureStore([])
    const user = {
        html_url: 'https://testing.com',
        id: 123123,
        avatar_url: 'https://testing.com/1.png',
        login: 'testing login'
    }
    let store:any

    beforeEach(() => {
        store = mockStore({following: Array(5).fill(user),
                           loading: {following: false}})
    })

    test("Sanity check Following contents", () => {
        const component = render(
            <Provider store={store}>
                <Following animation="fadeInDown" />
            </Provider>
        )

        expect(component).toMatchSnapshot()
    })
})
