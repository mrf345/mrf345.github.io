import React from 'react'
import { connect } from 'react-redux'
import { Container, Row } from 'react-bootstrap'
import { withRouter, RouteComponentProps } from 'react-router'

import LoadingOverlay from '../components/Loading'


interface LoadingContainerProps extends RouteComponentProps {
    loading:Loading
}


class LoadingContainer extends React.Component<LoadingContainerProps> {
    isLoading(props?:LoadingContainerProps) {
        props = props || this.props

        switch(props.location.pathname) {
            case '/likes':
                return props.loading.starred
            case '/contributed':
                return props.loading.contributions
            case '/published':
                return props.loading.repos
            case '/follows':
                return props.loading.following
            case '/':
                return props.loading.info
            default:
                return false
        }
    }

    render() {
        return (
            <Container>
                {this.isLoading()
                    ? <Row> <LoadingOverlay /> </Row>
                    : this.props.children}
            </Container>
        )
    }
}


export default withRouter(connect((state:State) => ({loading: state.loading}))(LoadingContainer))
