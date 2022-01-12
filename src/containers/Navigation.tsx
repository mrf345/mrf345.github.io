import React from 'react'
import { connect } from 'react-redux'
import { Nav, Navbar, Badge, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons'
import { faSync } from '@fortawesome/free-solid-svg-icons'
import Favicon from 'react-favicon'

import info from '../config.json'
import { LOOP_DELAY } from '../globas'
import { getInfo, getStarred, getRepos, getFollowing, resyncData,
         dataSynced, getContributions } from '../state/actions'

interface NavigationProps extends State {
    getInfo:Function
    getStarred:Function
    getRepos:Function
    getFollowing:Function
    getContributions:Function
    resyncData:Function
    dataSynced:Function
    isLoading(loading:Loading):boolean
}


const mapStateToProps = (state:State) => {
    return state
}


class Navigation extends React.Component<NavigationProps> {
    resyncInterval:any

    constructor(props:NavigationProps) {
      super(props)

      this.resyncInterval = undefined
    }

    componentDidMount() {
      this.fetchData()
    }

    componentWillUnmount() {
      if (this.resyncInterval) clearInterval(this.resyncInterval)
    }

    componentDidUpdate() {
      window.document.title = `${this.props.info.name}'s portfolio`
    }

    fetchData = () => {
      this.props.getInfo()
      this.props.getRepos()
      // this.props.getStarred()
      this.props.getFollowing()
      this.props.getContributions()
    }

    resyncData = () => {
      this.props.resyncData()
      this.fetchData()

      this.resyncInterval = setInterval(() => {
        if (!this.props.isLoading(this.props.loading)) {
          this.props.dataSynced()
          clearInterval(this.resyncInterval)
        }
      }, LOOP_DELAY)
    }

    render() {
        return (
            <Navbar collapseOnSelect
                    className="animated fadeInDown"
                    fixed="top"
                    expand="sm"
                    variant="dark">
                <Favicon url={this.props.info.avatar_url} />
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <LinkContainer exact to="/" className="brand">
                      <Nav.Link>
                        <Image src={this.props.info.avatar_url} roundedCircle fluid />
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/projects" className='nav-projects'>
                      <Nav.Link>
                        Projects
                        <br />
                        <Badge>
                          {this.props.repos.filter(r => !r.fork).length}
                        </Badge>
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/contributions">
                      <Nav.Link>
                        Contributions
                        <br />
                        <Badge>
                          {this.props.contributions.length}
                        </Badge>
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/following">
                      <Nav.Link>
                        Following
                        <br />
                        <Badge>
                          {this.props.following.length}
                        </Badge>
                      </Nav.Link>
                    </LinkContainer>
                    {/* <LinkContainer to="/likes">
                      <Nav.Link>
                        Likes
                        <br />
                        <Badge>
                          {this.props.starred.length}
                        </Badge>
                      </Nav.Link>
                    </LinkContainer> */}
                  </Nav>
                  <Nav>
                    <Nav.Link className="text-center external"
                              onClick={this.resyncData}
                              disabled={this.props.isLoading(this.props.loading) || this.props.resync}>
                        <span className="mr-1 ml-1">Sync</span>
                        <FontAwesomeIcon icon={faSync}
                                         size="1x"
                                         spin={this.props.isLoading(this.props.loading) || this.props.resync} />
                    </Nav.Link>
                    <Nav.Link className="text-center external" href={info.repo} target="_blank">
                        <span className="mr-1 ml-1">Fork</span>
                        <FontAwesomeIcon icon={faGithubSquare} size="1x" />
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}


export default connect(mapStateToProps, { getInfo, getStarred, getRepos, getContributions,
                                          getFollowing, resyncData, dataSynced })(Navigation)
