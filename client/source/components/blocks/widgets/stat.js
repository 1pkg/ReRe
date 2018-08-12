import React from 'react'
import Styled from 'styled-components'

import { Device } from '~/helpers'
import Badge from './badge'

const Container = Styled.div`
    flex: ${props => (props.mobile ? '0 0 50%' : '0 0 25%')};
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: ${props => props.theme['sub-normal-unit']};
    background-color: ${props => props.theme['sub-color']};
    border-radius: ${props => props.theme['half-small-unit']};
    border-top:
        ${props => props.theme['min-small-unit']}
        solid
        ${props => props.theme['active-color']};
`

export default class extends React.Component {
    render() {
        let complexity = this.props.stat.complexity
            ? `${this.props.stat.complexity}%`
            : 'new task'
        let factor = `x${this.props.stat.factor}`
        return (
            <Container mobile={Device.mobile()}>
                <Badge text={complexity} hint="complexity" />
                <Badge text={factor} hint="factor" />
                <Badge text={this.props.stat.freebie} hint="freebie" />
                <Badge text={this.props.stat.score} hint="score" />
            </Container>
        )
    }
}
