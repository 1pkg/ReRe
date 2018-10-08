import { Scrollbars } from 'react-custom-scrollbars'
import React from 'react'

export default class extends React.Component {
    render() {
        return (
            <Scrollbars
                renderThumbVertical={() => <div />}
                renderTrackVertical={() => <div />}
            >
                {this.props.children}
            </Scrollbars>
        )
    }
}
