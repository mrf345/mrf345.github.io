import './index.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import store from './state/store'
import { AnimationContext } from './globas'
import ErrorHandler from './containers/ErrorHandler'
import Navigation from './containers/Navigation'
import Container from './containers/LoadingContainer'
import Footer from './containers/Footer'
import Intro from './containers/Intro'
import { Published, Likes, Contributed } from './containers/Projects'
import Following from './containers/Following'
import { AnimationString } from 'react-animated-css'


class Main extends React.Component {
    animationRightOrLeft:boolean

    constructor(props:{}) {
        super(props)

        this.animationRightOrLeft = false
    }

    isLoading = (loading:Loading):boolean => Object.values(loading).some(status => status)
    isLargeScreen = () => window.screen.width > 576

    fadeToggler = ():AnimationString => {
        this.animationRightOrLeft = !this.animationRightOrLeft

        return this.animationRightOrLeft
            ? 'fadeInRight'
            : 'fadeInLeft'
    }

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

                                    <Route path="/published">
                                        <Published animation={this.fadeToggler()}
                                                   icon={faGithub} />
                                    </Route>

                                    <Route path="/contributed">
                                        <Contributed animation={this.fadeToggler()}
                                                     icon={faGithub} />
                                    </Route>

                                    <Route path="/follows">
                                        <Following animation={this.fadeToggler()} />
                                    </Route>

                                    <Route path="/likes">
                                        <Likes animation={this.fadeToggler()}
                                               icon={faGithub} />
                                    </Route>

                                    <Redirect to="/" />
                                </Switch>
                            </Row>
                        </Container>
                        <Footer />
                    </AnimationContext.Provider>
                    </Provider>
                </Router>
            </ErrorHandler>
        )
    }
}


ReactDOM.render(<Main />, document.body)
serviceWorker.unregister()
