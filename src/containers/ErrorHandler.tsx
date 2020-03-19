import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'


interface ErrorHandlerState {
    errors:Error[]
}


export default class ErrorHandler extends React.Component<any, ErrorHandlerState> {
    constructor(props:any) {
        super(props)

        this.state = {errors: []}
    }

    componentDidCatch(err:Error) {
        this.setState({errors: [...this.state.errors, err]})
    }

    render() {
        return this.state.errors.length
            ? <Container className="text-center">
                <Row>
                    <Col className="mb-3 mt-3">
                        <h1>Oh snap! Something went wrong 😭</h1>
                    </Col>
                </Row>
                {this.state.errors.map((err, index) => <Row>
                    <Col className="mt-2">
                        <h3>{index + 1}. {err.name}: {err.message}</h3>
                        <p><i>{err.stack}</i></p>
                    </Col>
                </Row>)}
            </Container>
            : this.props.children
    }
}
