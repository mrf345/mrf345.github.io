type GitEndpoints = 'repos'|'starred'|'gists'|'following'


export function getChunks (iterable:any[], chunkSize: number): Array<Array<any>> {
    return iterable.reduce((prevVal: any, currVal: any, currIndx: number, array: Array<any>) => !(currIndx % chunkSize)
        ? prevVal.concat([array.slice(currIndx, currIndx + chunkSize)])
        : prevVal, [])
}


export function isEmpty(value:any):boolean {
    return typeof(value) === 'object'
        ? Array.isArray(value)
            ? !value.length
            : !Object.keys(value).length
        : !value
}


export function gitLink(account:string, endpoint:GitEndpoints|undefined = undefined, limit = 100, clean = false):string {
    return endpoint
        ? clean
            ? `https://api.github.com/${endpoint}/${account}`
            : `https://api.github.com/users/${account}/${endpoint}?per_page=${limit}&sort=updated`
        : `https://api.github.com/users/${account}`
}


export function sortReposByLikes(repos:any) {
    return repos.sort((a:Repository, b:Repository) => b.stargazers_count - a.stargazers_count)
}
