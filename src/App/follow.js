import React, { Component } from 'react'
import { Row, Col, Panel, Glyphicon, PageHeader, Image } from 'react-bootstrap'
import { Animated } from 'react-animated-css'
import { findDOMNode } from 'react-dom'
import { Random } from './repos'

class Follow extends Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    let follow = this.props.follow.map((i, index) => {
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
                <Image src={i.avatar_url} rounded responsive /> <br />
                <h2 className='text-center title'>
                  ({i.login}) <br />
                  <small>
                    <i>{i.html_url}</i>
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
        {follow}
      </Row>
    )
  }
}

export default Follow
