import React from 'react'
import { connect } from 'react-redux'

import Panel from '../components/Panel'
import info from '../config.json'


interface InfoProps {
    info:Info
    loading:Loading
}


class Intro extends React.Component<InfoProps> {
    componentDidMount() {
        window.scrollTo(0, document.body.scrollHeight)
    }

    render() {
        return <Panel className='text-center d-flex align-items-center min-vh-100 vw-100'
                   goto={`${window.location.origin}/cv.pdf`}
                   clickAnimation={{animation: 'bounceOut', delay: 0}}
                   img={{src: this.props.info.avatar_url,
                         width: '30%'}}
                   animation={{animationIn: 'bounceIn',
                               animationInDelay: 500,
                               animationOut: 'bounceOut',
                               isVisible: true}}
                   header={{text: <>{this.props.info.name} <br /> <i>({this.props.info.login})</i></>,
                            className: 'h2 mt-2'}}
                   footer={{center: 'Click to view my resume!'}}
                   body={{text: info.description.join(' '),
                          style: {fontSize: '120%'},
                          className: 'mt-4 mb-4'}} />
    }
}


export default connect((state:State) => ({info: state.info,
                                          loading: state.loading}))(Intro)
