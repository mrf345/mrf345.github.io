import { GET_INFO, ALREADY_LOADED, GET_REPOS, GET_FOLLOWING, GET_STARRED } from './constants'
import { isEmpty } from '../utils'


export function fetchOnlyIfNeeded({dispatch, getState}:any) {
    return function(next:any) {
        return function(action:any) {
            const state:State = getState()

            if (!state.resync) switch(action.type) {
                case GET_INFO:
                    if (!isEmpty(state.info)) return dispatch({type: ALREADY_LOADED})
                case GET_REPOS:
                    if (!isEmpty(state.repos)) return dispatch({type: ALREADY_LOADED})
                case GET_FOLLOWING:
                    if (!isEmpty(state.following)) return dispatch({type: ALREADY_LOADED})
                case GET_STARRED:
                    if (!isEmpty(state.starred)) return dispatch({type: ALREADY_LOADED})
            }

            return next(action)
        }
    }
}
