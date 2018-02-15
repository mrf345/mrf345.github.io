import React, { Component } from 'react'
import { Nav, Navbar, NavItem, Badge, Image, Thumbnail, Glyphicon } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class Navigation extends Component {
  render () {
    return (
      <Navbar className='animated fadeInDown' inverse fixedTop collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand className='text-center'>
            <LinkContainer to='/'>
              <a href='/'>
                <Image src={this.props.info.avatar_url} circle />
              </a>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to='/repos'>
              <NavItem eventKey={1}> Projects 
                <br />
                <Badge>
                  {this.props.info.public_repos}
                </Badge>
              </NavItem>
            </LinkContainer>
            <LinkContainer to='/examples'>
              <NavItem eventKey={2}> Examples 
                <br />
                <Badge>
                  {this.props.info.public_gists}
                </Badge>
              </NavItem>
            </LinkContainer>
            <LinkContainer to='/starred'>
              <NavItem eventKey={4}>
                Starred
                <br />
                <Badge>
                  {this.props.starred.length}
                </Badge>
              </NavItem>
            </LinkContainer>
            <LinkContainer to='/following'>
              <NavItem eventKey={3}>
                Following 
                <br />
                <Badge>
                 {this.props.info.following}
                </Badge>
              </NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={5} className='text-center'
             href='https://github.com/mrf345/mrf345.github.io/' target='_blank'>
              <Glyphicon glyph='edit' bsSize='large' /> <br />
               Source Code
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Navigation
