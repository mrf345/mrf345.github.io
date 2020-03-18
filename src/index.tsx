import './index.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import store from './state/store'
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

    scroll(top = true) {
        top
            ? window.scrollTo(0, 0)
            : window.scrollTo(0,document.body.scrollHeight)
    }

    render() {
        return (
            <Router>
                <Provider store={store}>
                    <Navigation />
                    <Container className="App">
                        <Row>

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
                        </Row>
                    </Container>
                    <Footer />
                </Provider>
            </Router>
        )
    }
}


ReactDOM.render(<Main />, document.body)
serviceWorker.unregister()
