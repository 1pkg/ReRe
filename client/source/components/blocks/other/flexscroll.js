import { Scrollbars } from 'react-custom-scrollbars'
import React from 'react'

export default class extends React.Component {
    render() {
        return (
            <Scrollbars
                renderThumbVertical={() => <div />}
                renderTrackVertical={() => <div />}
                renderView={props => {
                    let style = Object.assign(
                        {
                            flex: '1 1 0',
                            display: 'flex',
                            flexDirection: 'column',
                        },
                        props.style,
                    )
                    return <div {...props} style={style} />
                }}
            >
                {this.props.children}
            </Scrollbars>
        )
    }
}
