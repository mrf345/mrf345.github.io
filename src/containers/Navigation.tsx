import React from 'react'
import { connect } from 'react-redux'
import { Nav, Navbar, Badge, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons'
import { faSync } from '@fortawesome/free-solid-svg-icons'
import Favicon from 'react-favicon'

import { getInfo, getStarred, getRepos, getFollowing, resyncData, dataSynced } from '../state/actions'
import info from '../config.json'


interface NavigationProps extends State {
    getInfo:Function
    getStarred:Function
    getRepos:Function
    getFollowing:Function
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

    componentDidUpdate() {
      window.document.title = `${this.props.info.name}'s portfolio`
    }

    fetchData = () => {
      this.props.getInfo()
      this.props.getRepos()
      this.props.getStarred()
      this.props.getFollowing()
    }

    resyncData = () => {
      this.props.resyncData()
      this.fetchData()

      this.resyncInterval = setInterval(() => {
        if (!this.props.isLoading(this.props.loading)) {
          this.props.dataSynced()
          clearInterval(this.resyncInterval)
        }
      }, 100)
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
                    <LinkContainer to="/published">
                      <Nav.Link>
                        Published
                        <br />
                        <Badge>
                          {this.props.repos.length}
                        </Badge>
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/follows">
                      <Nav.Link>
                        Follows
                        <br />
                        <Badge>
                          {this.props.following.length}
                        </Badge>
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/likes">
                      <Nav.Link>
                        Likes
                        <br />
                        <Badge>
                          {this.props.starred.length}
                        </Badge>
                      </Nav.Link>
                    </LinkContainer>
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


export default connect(mapStateToProps, { getInfo, getStarred, getRepos, 
                                          getFollowing, resyncData, dataSynced })(Navigation)
