import React from 'react'
import { Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import Animate from './Animate'


export default class LoadingOverlay extends React.Component {
    render() {
        return (
            <Col className="text-center d-flex align-items-center justify-content-center min-vh-100">
                <Animate animate
                         animation={{animationIn: 'fadeIn',
                                     animationOut: 'fadeOut',
                                     isVisible: true}}>
                    <FontAwesomeIcon spin icon={faSpinner} size="5x" />
                </Animate>
            </Col>
        )
    }
}
