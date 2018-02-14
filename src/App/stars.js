import React, { Component } from 'react'
import { Row, Col, Panel, Glyphicon, PageHeader } from 'react-bootstrap'
import { Animated } from 'react-animated-css'
import { findDOMNode } from 'react-dom'
import { Random } from './repos'

class Star extends Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    let repos = this.props.repos.map((i, index) => {
      let ran = Random.randstr(10)
      return (
        <Col key={ran} xs={10} xsOffset={1} mdOffset={0} md={4} >
          <Animated ref={ran}
           animationIn={this.props.effectIn}
           animationInDelay={(index / 10)}>
            <Panel onClick={(e => {
              this.refs[ran].setState({animation: this.props.effect, delay: 0})
              setTimeout(() => {
                window.open(i.html_url, '_blank')
                this.refs[ran].setState({animation: ''})
              }, 800)
            }
            )}>
              <Panel.Body>
                <h2 className='text-center title'>
                  <Glyphicon glyph={this.props.icon} /> <br />
                  ({i.name}) <br />
                  <small>
                    {i.description} <br /> <br />
                    <i className='pull-left'>{i.license ? i.license.key : 'Not Licensed'}</i>
                    <i className='pull-right'>{i.language}</i>
                  </small>
                </h2>
              </Panel.Body>
            </Panel>
          </Animated>
        </Col>
      )
    })
    return (
      <Row className='show-grid'>
        {repos}
      </Row>
    )
  }
}

export default Star
