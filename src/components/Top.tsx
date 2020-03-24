import React from 'react'
import { animateScroll as scroll, Events } from 'react-scroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'


interface TopState {
    height:number
}


export default class Top extends React.Component<{}, TopState> {
    constructor(props:{}) {
        super(props)
        
        this.state = {height: document.body.scrollHeight}
    }

    componentDidMount() {
        window.addEventListener('scroll', this.updateHight)
        Events.scrollEvent.register('end', this.resetHeight)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.updateHight)
        Events.scrollEvent.remove('end')
    }

    updateHight = () => this.setState({height: document.body.scrollHeight})
    resetHeight = () => this.setState({height: 0})
    shouldShow = () =>  this.state.height > 1070 && window.scrollY > 72
    scrollTop = () => scroll.scrollToTop()

    render() {
        return (
            <button className={`top animated ${this.shouldShow() ? 'fadeInRight' : 'fadeOutRight'}`}
                    onClick={this.scrollTop}
                    style={{opacity: this.shouldShow() ? 0 : 100}}>
                <FontAwesomeIcon icon={faArrowUp} size="3x" />
            </button>
        )
    }
}
