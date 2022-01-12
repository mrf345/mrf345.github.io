/// <reference types="react-scripts" />
declare module 'whatwg-fetch'


interface BSMeasures {
    xs?:number
    md?:number
    lg?:number
    xsOffset?:number
    mdOffset?:number
    lgOffset?:number
}


interface TextObj {
    text:any
    className?:string
    style?:{}
}


interface ClickAnimation {
    animation:AnimationString
    delay?:number
}


interface License {
    key:string
}


interface Repository {
    id:number
    name:string
    full_name:string
    fork:boolean
    description:string
    license:License
    language:string
    stargazers_count:number
    html_url:string
    goto?:string
    parent?:Repository
}


interface Info {
    id:number
    html_url:string
    avatar_url:string
    login:string
    name:string
    bio:string
    followers:number
    following:number
    public_repos:number
    intro:string
}


interface Action {
    type:string
    payload:any
}


interface Loading {
    info:boolean
    repos:boolean
    following:boolean
    starred:boolean
    contributions:boolean
}


interface State {
    info:Info
    repos:Repository[]
    following:Info[]
    starred:Repository[]
    contributions:Repository[]
    error:Error|undefined
    loading:Loading
    resync:boolean
}


interface Generic {
    [key:string]: any
}
