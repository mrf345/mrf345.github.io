import './index.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import store from './state/store'
import ErrorHandler from './containers/ErrorHandler'
import Navigation from './containers/Navigation'
import Footer from './containers/Footer'
import Intro from './containers/Intro'
import Projects from './containers/Projects'
import Following from './containers/Following'


class Main extends React.Component {
    animationRightOrLeft:boolean

    constructor(props:{}) {
        super(props)

        this.animationRightOrLeft = false
    }

    componentDidMount() {
        this.scroll(false)
    }

    animationToggler = (effect:string):string => {
        this.animationRightOrLeft = !this.animationRightOrLeft

        return this.animationRightOrLeft
            ? `${effect}InRight`
            : `${effect}InLeft`
    }

    isLoading = (loading:Loading):boolean => Object.values(loading).some(status => status)

    scroll(top = true) {
        top
            ? window.scrollTo(0, 0)
            : window.scrollTo(0,document.body.scrollHeight)
    }

    render() {
        return (
            <ErrorHandler>
                <Router>
                    <Provider store={store}>
                        <Navigation isLoading={this.isLoading} />
                        <Container>
                            <Row>
                                <Switch>
                                    <Route exact
                                           path="/"
                                           component={(props:any) => {
                                                this.scroll(false)
                                                return <Intro {...props} />
                                           }} />

                                    <Route path="/published"
                                           component={(props:any) => {
                                                this.scroll()
                                                return <Projects animation={this.animationToggler('fade')}
                                                                 icon={faGithub}
                                                                 {...props} />
                                           }} />

                                    <Route path="/follows"
                                           component={(props:any) => {
                                                this.scroll()
                                                return <Following animation={this.animationToggler('fade')}
                                                                  {...props} />
                                           }} />

                                    <Route path="/likes"
                                           component={(props:any) => {
                                                this.scroll()
                                                return <Projects animation={this.animationToggler('fade')}
                                                                 icon={faGithub}
                                                                 {...props} />
                                           }} />

                                    <Redirect to="/" />
                                </Switch>
                            </Row>
                        </Container>
                        <Footer />
                    </Provider>
                </Router>
            </ErrorHandler>
        )
    }
}


ReactDOM.render(<Main />, document.body)
serviceWorker.unregister()
