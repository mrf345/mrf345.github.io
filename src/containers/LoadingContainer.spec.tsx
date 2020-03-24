import React from 'react'
import { render } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'

import LoadingContainer from './LoadingContainer'


describe('Testing LoadingContainer', () => {
    const mockStore = configureStore([])
    let store:any

    beforeEach(() => {
        store = mockStore({
            loading: {
                info: false,
                repos: false,
                starred: false,
                following: false,
                contributions: false
            }            
        })
    })

    test('Sanity check LoadingContainer contents', () => {
        const component = render(
            <Router>
                <Provider store={store}>
                    <LoadingContainer>
                        <h1>Container Children</h1>
                    </LoadingContainer>
                </Provider>
            </Router>
        )

        expect(component).toMatchSnapshot()
    })
})
