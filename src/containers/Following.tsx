import React from 'react'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap'
import { AnimationString } from 'react-animated-css'

import Panel from '../components/Panel'


interface ProjectsProps {
    following:Info[]
    loading:Loading
    animation:AnimationString
}


class Following extends React.Component<ProjectsProps> {
    componentDidMount() {
        window.scroll(0, 0)
    }

    render() {
        let counter = 0

        return this.props.following
                  .chunk(3)
                  .map((chunk, index) => {
                   return (<Row className="d-flex justify-content-center" key={Math.random().toString()}>
                       {chunk.map(user => <Panel className="text-center mt-3 mb-3 m-2"
                                                 goto={user.html_url}
                                                 key={user.id.toString()}
                                                 img={{src: user.avatar_url}}
                                                 animation={{animationIn: this.props.animation,
                                                             animationOut: 'fadeOutRight',
                                                             animationInDelay: ++counter * 100,
                                                             isVisible: true}}
                                                 clickAnimation={{animation: 'bounceOut'}}
                                                 header={{text:<i>({user.login})</i>,
                                                          className: 'h4 mt-2'}}
                                                 body={{text: user.html_url,
                                                        style: {fontSize: '120%'},
                                                        className: 'mt-1 mb-1'}} />)}
                   </Row>)})
    }
}


export default connect((state:State) => ({following: state.following,
                                          loading: state.loading}))(Following)
