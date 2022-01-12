import React from 'react'

interface CursorProps {
    text:string
}

export default class Cursor extends React.Component<CursorProps, {}> {
    render() {
        return (
            <>
                <h1 className='cursored'>{this.props.text}</h1>
                <div className='cursor'></div>
            </>
        )
    }
}
