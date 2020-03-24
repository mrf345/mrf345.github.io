import { call, put, takeEvery, select, delay } from 'redux-saga/effects'
import { fetch } from 'whatwg-fetch'

import info from '../config.json'
import { gitLink } from '../utils'
import { LOOP_DELAY } from '../globas'
import { API_ERROR, GET_INFO, INFO_LOADED, GET_REPOS, REPOS_LOADED, GET_FOLLOWING, FOLLOWING_LOADED,
         GET_STARRED, STARRED_LOADED, GET_CONTRIBUTIONS, CONTRIBUTIONS_LOADED } from './constants'


function gitFetcher(endpoint:any = undefined, limit = 100) {
    const { account } = info
    let allData:any

    return new Promise((resolve, reject) => {
        function recursFetching(link = gitLink(account, endpoint, limit), page = 1) {
            fetch(link)
                .then((resp:any) => resp.json())
                .then((data:any) => {
                    if (Array.isArray(data)) {
                        allData = [...(allData || []), ...data]

                        if (data.length && limit >= data.length) {
                            return recursFetching(`${link}&page=${page + 1}`, page + 1)
                        } else return resolve(allData)
                    } else return resolve(data)
                }).catch((error:Error) => reject(error))
        }

        recursFetching()
    })
}


export function* watchInfo() {
    yield takeEvery(GET_INFO, function* () {
        try {
            const payload = yield call(() => gitFetcher())

            yield put({type: INFO_LOADED, payload})
        } catch(error) {
            yield put({type: API_ERROR, payload: error})
        }
    })
}


export function* watchRepos() {
    yield takeEvery(GET_REPOS, function* () {
        try {
            const payload = yield call(() => gitFetcher('repos'))

            yield put({type: REPOS_LOADED, payload})
        } catch(error) {
            yield put({type: API_ERROR, payload: error})
        }
    })
}


export function* watchFollowing() {
    yield takeEvery(GET_FOLLOWING, function* () {
        try {
            const payload = yield call(() => gitFetcher('following'))

            yield put({type: FOLLOWING_LOADED, payload})
        } catch(error) {
            yield put({type: API_ERROR, payload: error})
        }
    })
}


export function* watchStarred() {
    yield takeEvery(GET_STARRED, function* () {
        try {
            const payload = yield call(() => gitFetcher('starred'))

            yield put({type: STARRED_LOADED, payload})
        } catch(error) {
            yield put({type: API_ERROR, payload: error})
        }
    })
}


export function* watchContributions() {
    const { account } = info

    yield takeEvery(GET_CONTRIBUTIONS, function* () {
        try {
            while (yield select((state:State) => state.loading.contributions)) {
                const { repos, loading } = yield select((state:State) => state)

                if (!loading.repos) {
                    const payload = yield call(() => Promise.all(
                        repos.filter((repo:Repository) => repo.fork)
                             .map((repo:Repository) => {
                                return fetch(`${gitLink(account, 'repos', undefined, true)}/${repo.name}`)
                                        .then((resp:any) => resp.json())
                                        .then((fullRepo:any) =>
                                            Object.assign({}, fullRepo.parent, {html_url: `${fullRepo.parent.html_url}/pulls?q=is:pr+author:${account}`}))
                            })))
    
                    yield put({type: CONTRIBUTIONS_LOADED, payload})
                }

                yield delay(LOOP_DELAY)
            }
        } catch(error) {
            yield put({type: API_ERROR, payload:error})
        }
    })
}
