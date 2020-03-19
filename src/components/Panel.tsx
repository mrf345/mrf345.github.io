import React, { ComponentElement } from 'react'
import { Col, Card, Image } from 'react-bootstrap'
import { AnimatedProps } from 'react-animated-css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import { AnimationContext } from '../globas'
import Animate from './Animate'
import { isEmpty } from '../utils'


interface Footer {
    right?:ComponentElement<any, any>|string
    left?:ComponentElement<any, any>|string
    center?:ComponentElement<any, any>|string
}


interface PanelProps {
    measures?:BSMeasures
    animate?:boolean
    animation:AnimatedProps
    header:TextObj
    body:TextObj
    goto?:string
    clickAnimation?:ClickAnimation
    img?:any
    icon?:IconDefinition
    className?:string
    footer?:Footer
}


export default class Panel extends React.Component<PanelProps> {
    animator:any

    static contextType = AnimationContext

    constructor(props:PanelProps) {
        super(props)

        this.animator = React.createRef()
    }

    handleClick = (e:any) => {
        const { clickAnimation, goto } = this.props

        this.animator.current.setState({delay: 0})
        if (!isEmpty(clickAnimation) && this.animator.current && goto) {
            this.animator.current.setState(clickAnimation)
            setTimeout(() => {
                window.open(goto, '_blank')
                this.animator.current.setState({animation: ''})
            }, 800)
        }
    }

    render() {
        const { measures, animation, header, body, img, icon, clickAnimation, goto, animate,
                ...rest } = this.props
        const showAnimation = typeof animate === undefined ? this.context : !!animate

        return (
            <Col md={{span: 10, offset: 1}} lg {...rest}>
                <Animate animate={showAnimation}
                         animation={Object.assign({}, animation, {ref: this.animator})}>
                    <Card onClick={this.handleClick}>
                        <Card.Header>
                            <Col className={header.className}
                                 style={header.style}>
                                {header.text}
                            </Col>
                        </Card.Header>
                        <Card.Body>
                            <Col className="mb-2">
                                {!!img && <Image rounded fluid {...img} />}
                                {!!icon && <FontAwesomeIcon icon={icon} size="3x" />}
                            </Col>
                            <Col className={body.className}
                                 style={body.style}>
                                {body.text}
                            </Col>
                        </Card.Body>
                        {!!this.props.footer && <Card.Footer>
                            <Col>
                                {!!this.props.footer?.left && <i className='float-left'>{this.props.footer.left}</i>}
                                {!!this.props.footer?.right && <i className='float-right'>{this.props.footer.right}</i>}
                                {!!this.props.footer?.center && this.props.footer.center}
                            </Col>
                        </Card.Footer>}
                    </Card>
                </Animate>
            </Col>
        )
    }
}
