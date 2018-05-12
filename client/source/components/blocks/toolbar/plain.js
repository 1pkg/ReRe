import Lodash from 'lodash'
import React from 'react'
import Styled from 'styled-components'

import { Disclaimer, Share, Fetch } from './../widgets'

const Container = Styled.div`
    flex: 1 1 0;
    display: flex;
`

export default class extends React.Component {
    shouldComponentUpdate(props, state) {
        return (
            !Lodash.isEqual(props, this.props) ||
            !Lodash.isEqual(state, this.state)
        )
    }

    render() {
        return (
            <Container>
                <Disclaimer disclaimer={this.props.disclaimer} />
                <Share />
                <Fetch trigger={this.props.trigger} />
            </Container>
        )
    }
}
