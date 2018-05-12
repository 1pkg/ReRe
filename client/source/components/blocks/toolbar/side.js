import Lodash from 'lodash'
import React from 'react'
import Styled from 'styled-components'

import { Disclaimer, Land, Share, Toggle } from './../widgets'

const Container = Styled.div`
    flex: 4 1 0;
    display: flex;
`

const InnerContainer = Styled.div`
    flex: 0 1 75%;
    display: flex;
    justify-content: space-between;
`

const LandContainer = Styled.div`
    flex: 1 1 0;
    display: flex;
    justify-content: space-around;
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
                <InnerContainer>
                    <Toggle full={this.props.full} toggle={this.props.toggle} />
                    <Share options={this.props.options} />
                    <Disclaimer disclaimer={this.props.disclaimer} />
                </InnerContainer>
                <LandContainer>
                    <Land trigger={this.props.trigger} />
                </LandContainer>
            </Container>
        )
    }
}
