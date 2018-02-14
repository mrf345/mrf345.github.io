import React, { Component } from 'react'
import { Grid, Row, Col, Glyphicon, Panel, Image } from 'react-bootstrap'
import { Route, Switch, HashRouter as Router, BrowserRouter, Redirect } from 'react-router-dom'
import { Animated } from 'react-animated-css'
import Navigation from './navigation'
import { Repo, Random } from './repos'
import Example from './examples'
import Star from './stars'
import Follow from './follow'

class App extends Component {
  constructor () {
    super()
    this.state = {
      info: {},
      repos: [],
      starred: [],
      gists: [],
      follow: []
    }
  }
  fetchData () {
    let toFetch = {
      info: 'https://api.github.com/users/mrf345',
      repos: 'https://api.github.com/users/mrf345/repos',
      starred: 'https://api.github.com/users/mrf345/starred',
      gists: 'https://api.github.com/users/mrf345/gists',
      follow: 'https://api.github.com/users/mrf345/following'
    }
    for (let prop in toFetch) {
      fetch(toFetch[prop]).then(
        resp => resp.json()
      ).then(
        json => {
          let dummy = {}
          dummy[prop] = json
          this.setState(dummy)
        }
      )
    }
  }
  componentWillMount () {
    this.fetchData()
  }
  componentDidMount () {
    this.fetchData()
  }
  render () {
    return (
      <Router className='App'>
        <div>
            <Navigation info={this.state.info} starred={this.state.starred} />
          <Grid>
            <Switch>
              <Route exact path='/' render={(props) => (
                <MainInfo {...props} effect='pulse'
                 effectIn='fadeInRight' info={this.state.info} />
              )} />
              <Route exact path='/repos' render={(props) => (
                  <Repo {...props} repos={this.state.repos} 
                    effectIn='fadeInLeft'
                    effect='swing' icon='link' />
              )} />
              <Route path='/examples' render={(props) => (
                  <Example {...props} gists={this.state.gists}
                  effect='swing'
                  effectIn='fadeInRight' />
              )} />
              <Route exact path='/starred' render={(props) => (
                  <Star {...props} repos={this.state.starred}
                  effect='swing'
                  effectIn='fadeInLeft' icon='star' />
              )} />
              <Route exact path='/following' render={(props) => (
                  <Follow {...props} follow={this.state.follow}
                  effect='pulse'
                  effectIn='fadeInRight' />
              )} />
              <Route component={NotFound} />
            </Switch>
          </Grid>
            <footer className='footer animated fadeInUp'>
              <h4 className='text-center'>
                Based on <a href='https://reactjs.org' target='_blank'>Reactjs</a>
                , <a href='https://react-bootstrap.github.io/' target='_blank'>React-Bootstrap </a>
                 and <a href='https://reacttraining.com/react-router/' target='_blank'>React-Router</a>.
                <br /> Utilizes github <a href='https://api.github.com/' target='_blank'>API</a>.
              </h4>
            </footer>
        </div>
      </Router>
    )
  }
}

// Needed extra routes

const NotFound = () => {
  // if page not found
  return (
    <Row className='show-grid'>
      <Col xs={12} md={10} mdOffset={1}>
        <Animated animationIn='fadeInRight'>
          <h1 className='well text-center text-danger'>
            <Glyphicon glyph='ban-circle' /> <br />
            404 Page not found
          </h1>
        </Animated>
      </Col>
    </Row>
  )
}

class MainInfo extends Component {
  render () {
    let desc = "Open-source enthusiast and in love with Python, JS and Linux. Long undergoing user experience with variety of GNU/Linux distributions, almost 7 years now. Experience in Python, at the beginning as system administration scripting language besides Bash and later on got into Desktop and back-end development. Highly skeptic towards (Is NodeJS a hype ?) theory. I think it's here to stay and it's most certainly the future of web development, thus I'm adapting ! just got recently into the back-end of JS and I'm still in awe. Nevertheless my front-end experience's much longer and more mature."
    let ran1 = Random.randstr(10)
    let ran2 = Random.randstr(10)
    let toRender = this.props.info === {} ? (
      <Col xs={12} md={10} mdOffset={1}>
        <h1 className='text-center well'>Page is loading ...</h1>
      </Col>
    ) : (
      <Col xs={12}>
        <Animated ref={ran1} animationIn={this.props.effectIn}>
        <Panel onClick={e => {
          this.refs[ran1].setState({animation: this.props.effect, delay: 0})
          setTimeout(() => {
            window.open(this.props.info.html_url, '_blank')
           this.refs[ran1].setState({animation: ''})
          }, 800)
        }}>
          <Panel.Heading className='text-center' componentClass='h2'>
            <Image className='profile-img' src={this.props.info.avatar_url} rounded thumbnail />
            <br /> <br />
            ({this.props.info.login}) <br />
            {this.props.info.name} <br />
            <small>{this.props.info.bio}</small><br />
          </Panel.Heading>
          <Panel.Body>
            <h3>{desc}</h3>
          </Panel.Body>
        </Panel>
        </Animated>
      </Col>
    )
    return (
      <Row className='show-grid'>
        {toRender}
        <Col xs={12}>
          <Animated ref={ran2} animationIn='fadeInLeft'>
            <div className='but well' onClick={e => {
              this.refs[ran2].setState({animation: this.props.effect, delay: 0})
              setTimeout(() => {
                window.open('https://mrf345.github.io/files/MFeddad_CV.pdf', '_blank')
               this.refs[ran2].setState({animation: ''})
              }, 800)
            }}>
             <h2 className='text-center text-muted bold'>
               View & Download CV
             </h2>
            </div>
          </Animated>
        </Col>
      </Row>
    )
  }
}
export default App
