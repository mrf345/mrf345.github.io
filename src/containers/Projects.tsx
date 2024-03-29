import React from 'react'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap'
import { AnimationString } from 'react-animated-css'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faCog } from '@fortawesome/free-solid-svg-icons'

import Panel from '../components/Panel'
import { getChunks } from '../utils'


interface ProjectsCompProps {
    repos:Repository[]
    animation:AnimationString
    toggleAnimation:Function
    icon:IconDefinition
}


class ProjectsComp extends React.Component<ProjectsCompProps> {
    componentDidMount() {
        window.scroll(0, 0)
        this.props.toggleAnimation()
    }

    render() {
        let counter = 0

        return getChunks(this.props.repos
                   .filter((repo:Repository) => !repo.fork), 3)
                   .map((chunk, index) => {
                    return (<Row key={Math.random().toString()}>
                        {chunk.map(repo => <Panel className="text-center mt-3 mb-3 m-2"
                                                  goto={repo.html_url}
                                                  key={repo.id.toString()}
                                                  icon={this.props.icon}
                                                  animation={{animationIn: this.props.animation,
                                                              animationOut: 'fadeOut',
                                                              animationInDelay: ++counter * 100,
                                                              isVisible: true}}
                                                  clickAnimation={{animation: 'bounceOut'}}
                                                  header={{text: repo.name,
                                                           className: 'h4 mt-2'}}
                                                  footer={{right:<><FontAwesomeIcon icon={faThumbsUp} /> {repo.stargazers_count} </>,
                                                           left:<><FontAwesomeIcon icon={faCog} /> {repo.language || 'Unrecognized'} </>}}
                                                  body={{text: repo.description,
                                                         style: {fontSize: '120%'},
                                                         className: 'mt-1 mb-1'}} />)}
                    </Row>)})
    }
}


export const Projects = connect((state:State) => ({repos: state.repos}))(ProjectsComp)
export const Likes = connect((state:State) => ({repos: state.starred}))(ProjectsComp)
export const Contributions = connect((state:State) => ({repos: state.contributions}))(ProjectsComp)
