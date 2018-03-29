import Lodash from 'lodash'
import React from 'react'

export default class extends React.Component {
    shouldComponentUpdate(props) {
        return !Lodash.isEqual(props, this.props)
    }

    render() {
        return (
            <div
                style={{
                    width: '100%',
                    height: '6.0em',
                    position: 'relative',
                }}
                onClick={this.props.onClick}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        fontSize: '1.5em',
                    }}
                >
                    <div>{this.props.pictogram}</div>
                    <div>{this.props.hint}</div>
                </div>
                <hr />
            </div>
        )
    }
}
