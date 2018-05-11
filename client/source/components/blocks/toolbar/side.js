import React from 'react'
import Styled from 'styled-components'

import { Disclaimer, Share, Toggle } from './../widgets'

const Container = Styled.div`
    flex: 4 1 0;
    display: flex;
`

const InnerContainer = Styled.div`
    flex: 0 1 75%;
    display: flex;
    justify-content: space-between;
`

export default class extends React.Component {
    render() {
        return (
            <Container>
                <InnerContainer>
                    <Toggle full={this.props.full} toggle={this.props.toggle} />
                    <Share options={this.props.options} />
                    <Disclaimer disclaimer={this.props.disclaimer} />
                </InnerContainer>
            </Container>
        )
    }
}
