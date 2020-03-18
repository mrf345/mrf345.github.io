import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


interface LocalContainerProps {
    isLoading(loading:Loading):boolean
    loading:Loading
    children:any
}


class LoadingContainer extends React.Component<LocalContainerProps> {
    constructor(props:LocalContainerProps) {
        super(props)
    }

    render() {
        const loading = (
            <Row>
                <Col className="text-center d-flex align-items-center justify-content-center min-vh-100">
                    <FontAwesomeIcon spin icon={faSpinner} size="5x" />
                </Col>
            </Row>
        )

        return (
            <Container>
                {this.props.isLoading(this.props.loading)
                    ? loading
                    : this.props.children}
            </Container>
        )
    }
}


export default connect((state:State) => ({loading: state.loading}))(LoadingContainer)
