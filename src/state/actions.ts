import { GET_INFO, GET_REPOS, GET_FOLLOWING, GET_STARRED, RESYNC_DATA, DATA_SYNCED } from './constants'


export function getInfo() {
    return {type: GET_INFO}
}


export function getRepos() {
    return {type: GET_REPOS}
}


export function getFollowing() {
    return {type: GET_FOLLOWING}
}


export function getStarred() {
    return {type: GET_STARRED}
}


export function resyncData() {
    return {type: RESYNC_DATA}
}


export function dataSynced() {
    return {type: DATA_SYNCED}
}
