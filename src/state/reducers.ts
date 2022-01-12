import { sortReposByLikes } from '../utils'
import { INFO_LOADED, REPOS_LOADED, FOLLOWING_LOADED, STARRED_LOADED, API_ERROR, ALREADY_LOADED, GET_INFO,
         GET_REPOS, GET_FOLLOWING, GET_STARRED, RESYNC_DATA, DATA_SYNCED, GET_CONTRIBUTIONS, CONTRIBUTIONS_LOADED } from './constants'


const initialState = {
    info: {},
    repos: [],
    following: [],
    starred: [],
    contributions: [],
    error: undefined,
    resync: false,
    loading: {info: true,
              repos: true,
              following: true,
              starred: false,
              contributions: true}
}


export default function  main(state = initialState, action:Action) {
    const { loading } = state

    switch(action.type) {
        case GET_INFO:
            return Object.assign({}, state, {loading: {...loading, info: true}})
        case GET_REPOS:
            return Object.assign({}, state, {loading: {...loading, repos: true}})
        case GET_FOLLOWING:
            return Object.assign({}, state, {loading: {...loading, following: true}})
        case GET_STARRED:
            return Object.assign({}, state, {loading: {...loading, starred: true}})
        case GET_CONTRIBUTIONS:
            return Object.assign({}, state, {loading: {...loading, contributions: true}})
        case INFO_LOADED:
            return Object.assign({}, state, {info: action.payload,
                                             loading: {...loading, info: false}})
        case REPOS_LOADED:
            return Object.assign({}, state, {repos: sortReposByLikes(action.payload),
                                             loading: {...loading, repos: false}})
        case FOLLOWING_LOADED:
            return Object.assign({}, state, {following: action.payload, 
                                             loading: {...loading, following: false}})
        case STARRED_LOADED:
            return Object.assign({}, state, {starred: sortReposByLikes(action.payload),
                                             loading: {...loading, starred: false}})
        case CONTRIBUTIONS_LOADED:
            return Object.assign({}, state, {contributions: sortReposByLikes(action.payload),
                                             loading: {...loading, contributions: false}})
        case API_ERROR:
            return Object.assign({}, state, {error: action.payload})
        case RESYNC_DATA:
            return Object.assign({}, state, {resync: true})
        case DATA_SYNCED:
            return Object.assign({}, state, {resync: false})
        case ALREADY_LOADED:
            return state
        default:
            return state
    }
}
