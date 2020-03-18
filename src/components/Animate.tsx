import React, { Fragment } from 'react'
import { Animated, AnimatedProps } from 'react-animated-css'


interface AnimateProps{
    animate:boolean
    animation:AnimatedProps
}


export default class Animate extends React.Component<AnimateProps> {
    render() {
        return this.props.animate
            ? <Animated children={this.props.children} {...this.props.animation} />
            : <Fragment children={this.props.children} />
    }
}
