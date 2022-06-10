import React from 'react'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

import Panel from '../components/Panel'
import Cursor from '../components/Cursor'
import info from '../config.json'


interface InfoProps {
    info:Info
    loading:Loading
    enableNavigation:Function
    disableNavigation:Function
}


function navLink (title:string, path:string) {
    return (
        <LinkContainer to={path}>
            <a href="/" className='intro-nav-link'>{title}</a>
        </LinkContainer>
    )
}

class Intro extends React.Component<InfoProps> {
    componentDidMount() {
        window.scrollTo(0, document.body.scrollHeight)
    }

    render() {
        return <Panel className='text-center d-flex align-items-center min-vh-100 vw-100'
                   goto={''}
                   clickAnimation={{animation: 'bounceOut', delay: 0}}
                   animation={{animationIn: 'bounceIn',
                               animationInDelay: 500,
                               animationOut: 'bounceOut',
                               isVisible: true}}
                   header={{text: ''}}
                   footer={{center: ''}}
                   body={{
                        text: (<>
                            <Cursor text={'Hello, world...'}/>
                            <p className='mt-5 intro-text'>{info.intro.join(' ')}</p>
                            <div className='mt-5 intro-text'>
                                You can navigate to my open-source {navLink('Projects', '/projects')},
                                my {navLink('Contributions', '/contributions')} to other projects,<br/>
                            </div>
                            <div className='mt-2 intro-text'>
                                and if you're interested, feel free to browse my <a target="_link" href={`${window.location.origin}/cv.pdf`} className='intro-nav-link'>Resume</a>
                            </div>
                        </>),
                        style: {fontSize: '120%'},
                        className: 'mt-4 mb-4'
                    }} />
    }
}


export default connect((state:State) => ({info: state.info,
                                          loading: state.loading}))(Intro)
