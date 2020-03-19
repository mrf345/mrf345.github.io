import React from 'react'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap'
import { AnimationString } from 'react-animated-css'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faCog } from '@fortawesome/free-solid-svg-icons'
import { RouterProps } from 'react-router'

import Panel from '../components/Panel'
import LoadingOverlay from '../components/Loading'


interface ProjectsProps extends RouterProps {
    repos:Repository[]
    starred:Repository[]
    loading:Loading
    animation:AnimationString
    icon:IconDefinition
}


class Projects extends React.Component<ProjectsProps> {
    render() {
        const likes = this.props.history.location.pathname.includes('likes')
        const reposToLoopOver = likes ? this.props.starred : this.props.repos
        const loading = likes ? this.props.loading.starred : this.props.loading.repos
        let counter = 0

        return loading
            ? <LoadingOverlay />
            : reposToLoopOver
                   .chunk(3)
                   .map((chunk, index) => {
                    return (<Row key={Math.random().toString()}>
                        {chunk.map(repo => <Panel className="text-center mt-3 mb-3 m-2"
                                                  goto={repo.html_url}
                                                  key={repo.id.toString()}
                                                  icon={this.props.icon}
                                                  animation={{animationIn: this.props.animation,
                                                              animationOut: 'fadeOutRight',
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


export default connect((state:State) => ({repos: state.repos,
                                          starred: state.starred,
                                          loading: state.loading}))(Projects)
