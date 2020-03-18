import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import mainReducer from './reducers'
import { fetchOnlyIfNeeded } from './middleware'
import * as sagas from './sagas'


declare global {
    interface Window {__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:any}
}


const initialSagaMiddleware = createSagaMiddleware()
const storeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = applyMiddleware(fetchOnlyIfNeeded, initialSagaMiddleware)
const store = createStore(mainReducer, storeEnhancer(middleware))


Object.values(sagas)
      .forEach(saga => initialSagaMiddleware.run(saga))


export default store
