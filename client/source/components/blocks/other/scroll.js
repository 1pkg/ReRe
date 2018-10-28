import { Scrollbars } from 'react-custom-scrollbars'
import React from 'react'

export default class extends React.Component {
    render() {
        return (
            <Scrollbars
                style={{
                    display: 'flex',
                    flex: '1 1 0',
                    width: 'auto',
                    height: 'auto',
                    overflow: 'hidden',
                }}
                renderThumbVertical={() => <div />}
                renderTrackVertical={() => <div />}
            >
                {this.props.children}
            </Scrollbars>
        )
    }
}
