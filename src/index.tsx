import './index.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { AnimationString } from 'react-animated-css'

import store from './state/store'
import { AnimationContext } from './globas'
import ErrorHandler from './containers/ErrorHandler'
import Navigation from './containers/Navigation'
import Container from './containers/LoadingContainer'
import Intro from './containers/Intro'
import { Projects, Likes, Contributions } from './containers/Projects'
import Following from './containers/Following'
import Top from './components/Top'


interface MainState {
    animation:AnimationString
}


class Main extends React.Component<{}, MainState> {
    constructor(props:{}) {
        super(props)

        this.state = {
            animation: 'fadeInRight',
        }
    }

    componentDidMount() {
        this.toggleAnimation()
    }

    isLoading = (loading:Loading):boolean => Object.values(loading).some(status => status)
    isLargeScreen = () => window.screen.width > 576
    toggleAnimation = () => this.setState({
        animation: this.state.animation === 'fadeInRight' ? 'fadeInLeft' : 'fadeInRight'
    })

    render() {
        return (
            <ErrorHandler>
                <Router>
                    <Provider store={store}>
                    <AnimationContext.Provider value={this.isLargeScreen()}>
                        <Navigation isLoading={this.isLoading} />
                        <Container>
                            <Row>
                                <Switch>
                                    <Route exact path="/" component={Intro} />
                                    <Route path="/projects">
                                        <Projects animation={this.state.animation}
                                                  toggleAnimation={this.toggleAnimation}
                                                  icon={faGithub} />
                                    </Route>

                                    <Route path="/contributions">
                                        <Contributions animation={this.state.animation}
                                                       toggleAnimation={this.toggleAnimation}
                                                       icon={faGithub} />
                                    </Route>

                                    <Route path="/following">
                                        <Following animation={this.state.animation} 
                                                   toggleAnimation={this.toggleAnimation}/>
                                    </Route>

                                    <Route path="/likes">
                                        <Likes animation={this.state.animation}
                                               toggleAnimation={this.toggleAnimation}
                                               icon={faGithub} />
                                    </Route>

                                    <Redirect to="/" />
                                </Switch>
                            </Row>
                        </Container>
                        <Top />
                    </AnimationContext.Provider>
                    </Provider>
                </Router>
            </ErrorHandler>
        )
    }
}


ReactDOM.render(<Main />, document.getElementById('root-container'))
serviceWorker.unregister()
