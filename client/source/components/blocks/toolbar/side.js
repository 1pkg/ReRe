import React from 'react'
import Styled from 'styled-components'

import Toggle from './../widgets/toggle'
import Disclaimer from './../widgets/disclaimer'

const Container = Styled.div`
    flex: 2 1 0;
    display: flex;
`

const HalfContainer = Styled.div`
    flex: 0 1 50%;
    display: flex;
    justify-content: space-between;
`

export default class extends React.Component {
    render() {
        return (
            <Container>
                <HalfContainer>
                    <Toggle full={this.props.full} toggle={this.props.toggle} />
                    <Disclaimer disclaimer={this.props.disclaimer} />
                </HalfContainer>
            </Container>
        )
    }
}
